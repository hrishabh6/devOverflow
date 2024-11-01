"use client";
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from '../ui/badge';
import Image from 'next/image';

const type: any = "create"

const questionSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    explanation: z.string().min(1, "Explanation is required"),
    tags: z.array(z.string()).min(1, "Please add at least one tag"),
});

const Questions = () => {
    const editorRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);


    const form = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            title: "",
            explanation: "",
            tags: [],
        },
    });


    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
        if (e.key === 'Enter' && field.name === 'tags') {
            e.preventDefault();
            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();

            if (tagValue !== '') {
                if (tagValue.length > 15) {
                    return form.setError('tags', {
                        type: 'required',
                        message: 'Tag cannot exceed 15 characters'
                    });
                }
            }

            if (!field.value.includes(tagValue as never)) {
                form.setValue('tags', [...field.value, tagValue]);
                tagInput.value = '';
                form.clearErrors('tags');
            }

            form.trigger("tags");
        }
    };

    const handleTagRemove = (tag: string, field: any) => {
        const newTags = field.value.filter((t: string) => t !== tag);
        form.setValue('tags', newTags);
    }


    function onSubmit(values: z.infer<typeof questionSchema>) {
        setSubmitting(true);
        try {
           //async call to call api -> create a question -> contain all form data
           //navigate to home page 
        } catch (error) {
            
        } finally {
            setSubmitting(false);
        }
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
                {/* Title Field */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Question Title
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input {...field} className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border" />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Briefly describe the main focus of your question.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                {/* Explanation Field */}
                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Detailed explanation of your problem
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                                    onInit={(_evt, editor) => {
                                        //@ts-ignore
                                        editorRef.current = editor;
                                    }}
                                    initialValue=""
                                    init={{
                                        height: 350,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | codesample | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist',
                                        content_style: 'body { font-family:Inter; font-size:16px }'
                                    }}
                                    onEditorChange={(content) => {
                                        form.setValue("explanation", content);
                                    }}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Introduce the problem in detail and expand on what you put in the title.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                {/* Tags Field */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Tags
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                {/* Wrap Input and the tags in a single div inside FormControl */}
                                <div>
                                    <Input
                                        onKeyDown={(e) => handleInputKeyDown(e, field)}
                                        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                        placeholder="add tags"
                                    />

                                    {field.value.length > 0 && (
                                        <div className="flex-start mt-2.5 gap-2.5">
                                            {field.value.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    className="background-light800_dark300 text-light400_light500 flex items-center subtle-medium justify-center gap-2 rounded-md px-4 py-2"
                                                    onClick={() => handleTagRemove(tag, field)}>

                                                    {tag}
                                                    <Image
                                                        src="/assets/icons/close.svg"
                                                        alt="close"
                                                        height={12}
                                                        width={12}
                                                        className="cursor-pointer object-contain invert-0 dark:invert"
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Add relevant tags for your question.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />


                <Button type="submit" className="mt-9 primary-gradient w-fit !text-light-900" disabled={submitting}>
                    {submitting ? (
                        <>
                            {type === "edit" ? "Updating" : "Posting"}
                        </>
                    ) : (
                        <>
                            {type === "edit" ? "Update" : "Post"}
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default Questions;
