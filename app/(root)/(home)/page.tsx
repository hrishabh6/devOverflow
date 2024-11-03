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


export default async function Home() {

  const result = await getQuestions({ page: 1 })
  console.log(result )


  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
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
           {result && result.questions.length > 0 ?
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





