import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSchema } from "@/lib/qr/validation";
import type { QRFormData, QRType } from "@/lib/qr/types";
import { cn } from "@/lib/utils";

import { FIELD_CONFIG, defaultsFor, type FieldDef } from "./field-config";

interface QRFormProps {
  type: QRType;
  initialData: QRFormData;
  onChange: (data: QRFormData, isValid: boolean) => void;
}

export function QRForm({ type, initialData, onChange }: QRFormProps) {
  const fields = FIELD_CONFIG[type];
  const defaults = { ...defaultsFor(type), ...initialData };

  const {
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<QRFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(getSchema(type) as any),
    mode: "onChange",
    defaultValues: defaults,
  });

  const values = watch();

  useEffect(() => {
    onChange(values, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values), isValid]);

  return (
    <form className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
      {fields.map((field) => {
        if (field.showIf && !field.showIf(values)) return null;
        return (
          <FieldRenderer
            key={field.name}
            field={field}
            register={register}
            control={control}
            error={errors[field.name]?.message as string | undefined}
          />
        );
      })}
    </form>
  );
}

interface FieldRendererProps {
  field: FieldDef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  error?: string;
}

function FieldRenderer({ field, register, control, error }: FieldRendererProps) {
  const span = field.colSpan === 2 ? "sm:col-span-2" : "sm:col-span-1";

  return (
    <div className={cn("flex flex-col gap-2", span)}>
      <Label htmlFor={field.name}>{field.label}</Label>

      {field.kind === "textarea" && (
        <Textarea id={field.name} placeholder={field.placeholder} {...register(field.name)} />
      )}

      {field.kind === "select" && (
        <Controller
          name={field.name}
          control={control}
          render={({ field: f }) => (
            <Select value={f.value || field.defaultValue} onValueChange={f.onChange}>
              <SelectTrigger id={field.name}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}

      {field.kind === "switch" && (
        <Controller
          name={field.name}
          control={control}
          render={({ field: f }) => (
            <div className="flex h-11 items-center">
              <Switch
                id={field.name}
                checked={f.value === "true"}
                onCheckedChange={(checked) => f.onChange(checked ? "true" : "false")}
              />
            </div>
          )}
        />
      )}

      {["text", "url", "email", "tel", "number", "datetime"].includes(
        field.kind
      ) && (
        <Input
          id={field.name}
          type={
            field.kind === "datetime"
              ? "datetime-local"
              : field.kind === "url"
                ? "url"
                : field.kind === "email"
                  ? "email"
                  : field.kind === "tel"
                    ? "tel"
                    : field.kind === "number"
                      ? "number"
                      : "text"
          }
          placeholder={field.placeholder}
          {...register(field.name)}
        />
      )}

      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : field.hint ? (
        <p className="text-xs text-muted-foreground">{field.hint}</p>
      ) : null}
    </div>
  );
}
