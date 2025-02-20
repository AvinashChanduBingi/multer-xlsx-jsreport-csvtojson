const xlsx = require("xlsx");
const path = require("path")
class xlsxJson{
    async convert(req,res)
    {
        try {
            let xlsxFilePath = path.join(__dirname, "../public/first.xlsx"); 
            
            const workSheet = xlsx.readFile(xlsxFilePath);

            const sheet = workSheet.SheetNames[0];
            
            const jsonData = xlsx.utils.sheet_to_json(workSheet.Sheets[sheet],{header : 1});
            
            const data = jsonData.slice(2).map(row =>
            {
                let jsonDataObject = {"title" : jsonData[0][1]};
                jsonData[1].forEach((header,index) => {
                    jsonDataObject[header] = row[index];
                });
                return jsonDataObject;
            }
            );
            let cleanedData = data.filter(val => val.Year !== undefined);
            
            res.status(200).json(cleanedData);
            
            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message : error.message
            })
        }
    }

    async convert()
    {
        let xlsxFilePath = path.join(__dirname, "../public/first.xlsx"); 
            
        const workSheet = xlsx.readFile(xlsxFilePath);

        const sheet = workSheet.SheetNames[0];
        
        const jsonData = xlsx.utils.sheet_to_json(workSheet.Sheets[sheet],{header : 1});
        
        const data = jsonData.slice(2).map(row =>
        {
            let jsonDataObject = {"title" : jsonData[0][1]};
            jsonData[1].forEach((header,index) => {
                jsonDataObject[header] = row[index];
            });
            return jsonDataObject;
        }
        );
        let cleanedData = data.filter(val => val.Year !== undefined);

        
        
        return cleanedData;
    }
}

module.exports = new xlsxJson();