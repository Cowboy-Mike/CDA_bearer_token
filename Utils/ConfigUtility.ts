export default function GetConfig(configName)
{
    return  process.env[configName]
}