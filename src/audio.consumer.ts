import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";


@Processor('audio')
export class AudioConsumer extends WorkerHost{
    async process(job: Job<any,any,string>): Promise<any>{
        // let progress = 0;
        // for (let i = 0;i< 100;i++){
        //     await doSomething(job.data);
        //     progress += 1;
        //     await job.updateProgress(progress);
        // }
        // return{}; 
        switch(job.name){
            case 'transcode':
            {
            let progress = 0;
            for(i=0;i< 100;i++){
                await doSomething(job.data);
                progress+= 1;
                await job.progress(progress);
            }
            return{};

        }
        case 'concatenate': {
            await doSomeLogic2();
            break;
        }
        }

    }
}

