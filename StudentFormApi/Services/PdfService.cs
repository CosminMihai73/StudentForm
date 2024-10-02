using DinkToPdf;
using DinkToPdf.Contracts;
using StudentFormApi.Models;

namespace StudentFormApi.Services
{
    public class PdfService
    {
        private readonly IConverter _converter;

        public PdfService(IConverter converter)
        {
            _converter = converter;
        }

        public byte[] GeneratePdf(StudentFormModel model)
        {
            var htmlContent = "<html><head><style>" +
                "table { width: 100%; border-collapse: collapse; }" +
                "table, th, td { border: 1px solid black; }" +
                "th, td { padding: 10px; text-align: left; }" +
                ".page { page-break-inside: avoid; }" + 
                "</style></head><body>";

            int currentLine = 1;
            int totalPages = (int)Math.Ceiling((double)model.NumberOfLines / 29); 

          
            for (int pageIndex = 1; pageIndex <= totalPages; pageIndex++)
            {
                
                if (pageIndex < totalPages)
                {
                    htmlContent += "<div class='page' style='page-break-after: always;'>"; 
                }
                else
                {
                    htmlContent += "<div class='page'>"; 
                }

                
                htmlContent += @"
                    <h1>Fișa Studentului</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Nr. linie</th>
                                <th>Nume</th>
                                <th>Prenume</th>
                                <th>Facultate</th>
                            </tr>
                        </thead>
                        <tbody>";

                
                for (int i = 0; i < 29 && currentLine <= model.NumberOfLines; i++, currentLine++)
                {
                    htmlContent += $@"
                            <tr>
                                <td>{currentLine}</td>
                                <td>{model.Nume}</td>
                                <td>{model.Prenume}</td>
                                <td>{model.Facultate}</td>
                            </tr>";
                }

                htmlContent += @"
                        </tbody>
                    </table>
                </div>"; 
            }

            htmlContent += "</body></html>"; 

      
            var pdfDocument = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings
                {
                    ColorMode = ColorMode.Color,
                    Orientation = Orientation.Portrait,
                    PaperSize = PaperKind.A4,
                    Margins = new MarginSettings { Top = 10, Bottom = 10, Left = 10, Right = 10 } 
                },
                Objects =
                {
                    new ObjectSettings
                    {
                        PagesCount = true,
                        HtmlContent = htmlContent,
                        WebSettings = { DefaultEncoding = "utf-8" },
                    }
                }
            };

            return _converter.Convert(pdfDocument);
        }
    }
}
