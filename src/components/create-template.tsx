import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as z from "zod";
import {useAuth} from "@/hooks/auth-provider";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import {TextArea} from "@/components/ui/textarea";

const LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'c++', 'ruby', 'go', 'rust'];

const formSchema = z.object({
    _id: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    version: z.string().regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/, {
        message: "Version must be a valid SemVer string",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    author: z.string(),
    language: z.string().min(1, {
        message: "Please select a language.",
    }),
    tags: z.array(z.string()).min(1, {
        message: "Please select at least one tag.",
    }),
})

export function CreateTemplate() {
    const {user} = useAuth();
    const userID = user?.auth.currentUser.reloadUserInfo.screenName;


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            templateId: "itsparser/",
            version: "1.0.0",
            name: "",
            description: "",
            author: "",
            language: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Here you would typically send the data to an API
    }

    // const handleAddTag = (tag: string) => {
    //     if (tag && !selectedTags.includes(tag)) {
    //         setSelectedTags(prev => [...prev, tag])
    //     }
    //     setOpenTagSelect(false)
    // }
    //
    // const handleRemoveTag = (tagToRemove: string) => {
    //     setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove))
    // }
    //
    // const handleCreateNewTag = () => {
    //     if (newTag && !tags.includes(newTag)) {
    //         setTags(prev => [...prev, newTag])
    //         setSelectedTags(prev => [...prev, newTag])
    //         setNewTag('')
    //         setIsDialogOpen(false)
    //     }
    // }

    if (!user) {
        return null;
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Template</Button>
            </DialogTrigger>
            <DialogContent className="xl:min-w-[80vw]">
                <DialogHeader>
                    <DialogTitle>Create New Template</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
                        <FormField
                            control={form.control}
                            name="_id"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Template ID</FormLabel>
                                    <FormControl>
                                        <div className="flex">
                                            {/* <Input
                                                value={`${userID}/`}
                                                className="rounded-r-none bg-gray-100"
                                                disabled
                                            /> */}
                                            {/*<Input*/}
                                            {/*    {...field}*/}
                                            {/*    value={field.value.replace(userID, '')}*/}
                                            {/*    onChange={(e) => field.onChange(`${userID}/${e.target.value}`)}*/}
                                            {/*    className="rounded-l-none"*/}
                                            {/*/>*/}
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="version"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Version</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Use semantic versioning (e.g., 1.0.0)
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="author"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="language"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a language"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {languages.map(lang => (
                                                <SelectItem key={lang} value={lang}>
                                                    {lang}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div>
                            <Label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</Label>
                            <div className="flex mt-1">
                                <Popover open={openTagSelect} onOpenChange={setOpenTagSelect}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openTagSelect}
                                            className="w-full justify-between"
                                        >
                                            Select or create tags
                                            <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search tag..."/>
                                            <CommandEmpty>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start"
                                                    onClick={() => setIsDialogOpen(true)}
                                                >
                                                    <Plus className="mr-2 h-4 w-4"/>
                                                    Create "{newTag}"
                                                </Button>
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {tags.map((tag) => (
                                                    <CommandItem
                                                        key={tag}
                                                        onSelect={() => handleAddTag(tag)}
                                                    >
                                                        {tag}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedTags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-sm py-1 px-2">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-1 text-gray-500 hover:text-gray-700"
                                        >
                                            <X size={14}/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create a new tag</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="new-tag" className="text-right">
                                            Tag name
                                        </Label>
                                        <Input
                                            id="new-tag"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleCreateNewTag}>Create Tag</Button>
                            </DialogContent>
                        </Dialog>

                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
