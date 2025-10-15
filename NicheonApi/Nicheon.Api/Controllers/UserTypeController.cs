using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;

namespace Nicheon.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserTypeController : ControllerBase
{
    private readonly IUserTypeRepository _repo;

    public UserTypeController(IUserTypeRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _repo.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _repo.GetByIdAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserType userType)
    {
        var id = await _repo.AddAsync(userType);
        return CreatedAtAction(nameof(GetById), new { id }, userType);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UserType userType)
    {
        userType.UserTypeId = id;
        var success = await _repo.UpdateAsync(userType);
        return success ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _repo.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}
