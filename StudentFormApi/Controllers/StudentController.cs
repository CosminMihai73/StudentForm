using Microsoft.AspNetCore.Mvc;
using StudentFormApi.Models; 
using StudentFormApi.Services; 

namespace StudentFormApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly PdfService _pdfService;

        public StudentController(PdfService pdfService)
        {
            _pdfService = pdfService;
        }

      
        [HttpPost("generate-pdf")]
        public ActionResult GeneratePdf([FromBody] StudentFormModel model)
        {
            if (model == null || model.NumberOfLines < 1)
                return BadRequest("Datele trimise sunt invalide.");

           
            var pdf = _pdfService.GeneratePdf(model);

      
            return File(pdf, "application/pdf", "FisaStudentului.pdf");
        }
    }
}
