import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import LocalSearchBar from "@/components/shared/Localsearchbar";
import Filter from "@/components/shared/filter";
import { HomePageFilters } from "@/constants/filters";
import Homefilters from "@/components/home/homefilters";
import Noresult from "@/components/shared/noresult";
import Questioncard from "@/components/cards/questioncard";
import { Item } from "@radix-ui/react-menubar";
import { getQuestions } from "@/lib/actions/question.action";
// const questions = [
//   {
//     id: "1",
//     title: "How to create a new project in React?",
//     tags: [
//       { id: "13", name: 'javascript' },
//       { id: "11", name: 'react' }
//     ],
//     author: {
//       id: "101",
//       name: "John Doe",
//       picture: "https://example.com/john.jpg"
//     },
//     views: 120,
//     upvotes: 15,
//     answers: [
//       { id: "1", content: "You can use create-react-app." }
//     ],
//     createdAt: new Date("2021-09-01T00:00:00.000Z")
//   },
//   {
//     id: "2",
//     title: "How to optimize performance in React?",
//     tags: [
//       { id: "23", name: 'optimization' },
//       { id: "12", name: 'react' }
//     ],
//     author: {
//       id: "102",
//       name: "Jane Smith",
//       picture: "https://example.com/jane.jpg"
//     },
//     views: 230,
//     upvotes: 30,
//     answers: [
//       { id: "2", content: "Try React.memo for pure components." }
//     ],
//     createdAt: new Date("2024-10-01T00:00:00.000Z")
//   },
//   {
//     id: "3",
//     title: "How to manage state in a large React app?",
//     tags: [
//       { id: "33", name: 'state-management' },
//       { id: "13", name: 'redux' }
//     ],
//     author: {
//       id: "103",
//       name: "Emily White",
//       picture: "https://example.com/emily.jpg"
//     },
//     views: 450,
//     upvotes: 60,
//     answers: [
//       { id: "3", content: "Consider using Redux or Context API." }
//     ],
//     createdAt: new Date("2024-10-29T00:00:00.000Z")
//   },
//   {
//     id: "4",
//     title: "What are the differences between React and Vue?",
//     tags: [
//       { id: "43", name: 'vue' },
//       { id: "14", name: 'react' }
//     ],
//     author: {
//       id: "104",
//       name: "Michael Brown",
//       picture: "https://example.com/michael.jpg"
//     },
//     views: 320,
//     upvotes: 22,
//     answers: [
//       { id: "4", content: "Vue is more template-based, while React uses JSX." }
//     ],
//     createdAt: new Date("2021-12-01T00:00:00.000Z")
//   }
// ];


export default async function  Home() {

  const result = await getQuestions({ page: 1 });

  

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
        <Link href="/ask-questions" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between max-sm:flex-col sm:items-center gap-5">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter 
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
        <Homefilters/>
        <div className="mt-10 flex w-full flex-col gap-6 ">
           {result.questions.length > 0 ?
           result.questions.map((question) => (
              <Questioncard
                key={question.id}
                id={question.id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
           ))
           : <Noresult
              title="There are no question to show"
              description="🤔 Hmm... looks like it's a bit quiet here! Be the trailblazer 🌟 and start the conversation—go ahead, ask your question and spark some insightful discussions! 🔥💬"
              link="/ask-question"
              linktitle="Ask a Question"
           />}
        </div>
    </>
  );
}





