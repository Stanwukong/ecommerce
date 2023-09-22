"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

interface SettingsFormProps {
  initialData: Store
}

const formSchema = z.object({
	name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {

	const params = useParams();
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	});

	const onSubmit = async (data: SettingsFormValues) => {
		try {
			setLoading(true)
			await axios.patch(`/api/stores/${params.storeId}`, data)
			router.refresh();
			toast.success("Settings updated!");
			console.log("[FORM_DATA]", data)
		} catch (error) {
			toast.error("Something went wrong!")
			console.log("[FORM_ERROR]", error)
		} finally {
			setLoading(false)
		}
	}
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your store settings." />
        <Button variant="destructive" size="icon" onClick={() => {}}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
	  <Separator />
	  <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
			<div className="grid grid-cols-3 gap-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Store Name</FormLabel>
							<FormControl>
								<Input disabled={loading} placeholder="Store name" {...field}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<Button disabled={loading} className="ml-auto" type="submit">Save Changes</Button>
		</form>
	  </Form>
    </>
  )
}

export { SettingsForm }
