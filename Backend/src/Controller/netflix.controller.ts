import { log } from "console";
import NetflixModel from "../Databases/NetflixModel.js"
import { Request, Response } from "express";
import data from "../json/data.json" with { type: "json" };

const copiedData = JSON.parse(JSON.stringify(data));

interface CustomRequest extends Request {
  userid?: string;
}

export async function sendToDb() {
  try {
    await NetflixModel.insertMany(data);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error(error);
  }
}


export async function getcontent(req:CustomRequest, res:Response) {
  try {
    console.log("Route hit");
  console.log(req.params);

    const { id } = req.params; 
    const content = await NetflixModel.findOne({
      id: Number(id),
    });
    if (!content) {
      return res.status(404).json({
        msg: "content not found"
      });
    }
    content.totalViews = (content.totalViews || 0) + 1;
    await content.save();
    res.status(200).json({
      msg: "content fetched",
      content
    });
  } catch (error) {
    console.error("GET CONTENT ERROR:", error);

    res.status(500).json({
      msg: "internal server error"
    });
  }
}
export async function topten(req:CustomRequest, res:Response) {
  try {
    const content = await NetflixModel.find()
      .sort({ totalViews: -1 }) 
      .limit(10);
    res.status(200).json({
      msg: "top 10 content",
      data: content
    });
  } catch (error) {
    console.error("TOP TEN ERROR:", error);
        res.status(500).json({
      msg: "internal server error"
    });
  }
}
export async function getbyplayers(req:Request,res:Response)
{
    const {player} = req.query ;
    if(!player)
    {
        return res.status(400).json({
            msg:"player not found"
        })
    }
    try{
    const content = await NetflixModel.find({
    players: { $regex: `^${player}$`, $options: "i" }
    });    
    res.status(200).json({
        content
    })
    }
    catch(error)
    {
        return res.status(400).json({
            msg:"player not found"
        })
    }
}
export async function searchcontent(req:CustomRequest, res:Response){
  const { query } = req.query;
  try {
    const results = await NetflixModel.aggregate([
      {
         $search: {
    index: "default",
    compound: {
      should: [
        {
          text: {
            query: query,
            path: "title",
            score: { boost: { value: 5 } }
          }
        },
        {
          text: {
            query: query,
            path: "description",
            score: { boost: { value: 2 } }
          }
        },
        {
          autocomplete: {
            query: query,
            path: "title",
            score: { boost: { value: 3 } }
          }
        },
        {
          autocomplete: {
            query: query,
            path: "description",
            score: { boost: { value: 1 } }
          }
        }

      ],
      minimumShouldMatch: 1
          }
        }
      }
    ]);
    res.status(200).json({ results });
  } catch (error) {
    res.status(400).json({
      msg: "response not found"
    });
  }
}

export async function findbycatogary(
  req: CustomRequest,
  res: Response
) {
  const catogery = req.query.catogery as string;

  console.log(catogery);

  if (!catogery) {
    return res.status(400).json({
      msg: "give category",
    });
  }

  try {
    const content = await NetflixModel.find({
      type: catogery,
    });

    if (content.length === 0) {
      return res.status(404).json({
        msg: "content not found",
      });
    }

    return res.status(200).json({
      content,
    });

  } catch (error) {
    return res.status(500).json({
      msg: "unable to do this",
    });
  }
}