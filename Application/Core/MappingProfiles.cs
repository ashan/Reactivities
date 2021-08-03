namespace Application.Core
{
  public class MappingProfiles : AutoMapper.Profile
  {
    public MappingProfiles()
    {
        CreateMap<Domain.Activity, Domain.Activity>();
    }
  }
}