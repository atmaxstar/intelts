
export type Response = {
    candidates:[
        {
            content:{
                parts:
                    {
                        text: string;
                    }[]
                ,
                role: string
            },
            finishReason: "STOP" | string,
            index: number,
            safetyRatings: {category: string, probability: string }[]
        }
    ]

}