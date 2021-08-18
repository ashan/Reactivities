using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private MediatR.IMediator _mediator;
        protected MediatR.IMediator Mediator => _mediator 
            ??= HttpContext.RequestServices.GetService<MediatR.IMediator>();
        
        protected ActionResult HandleResult<T>(Application.Core.Result<T> result)
        {
            if(result == null) return NotFound();
            if(result.IsSuccess && result.Value != null) return Ok(result.Value);
            if(result.IsSuccess && result.Value == null) return NotFound();
            return BadRequest(result.Error);
        }
        
    }
}