import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"


const Form = FormProvider


const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {

  return (
    <Controller
      {...props}
    />
  )
}


const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (

  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />

))

FormItem.displayName = "FormItem"


const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (

  <label
    ref={ref}
    className={cn(
      "text-sm font-medium",
      className
    )}
    {...props}
  />

))

FormLabel.displayName = "FormLabel"


const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (

  <div
    ref={ref}
    {...props}
  />

))

FormControl.displayName = "FormControl"


const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {

  const {
    formState: { errors },
  } = useFormContext()


  return (

    <p
      ref={ref}
      className={cn(
        "text-sm text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </p>

  )

})

FormMessage.displayName = "FormMessage"


export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
}