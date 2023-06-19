import { createContext } from 'react'
import ServiceContainerInterface from "../DependencyInjection/ServiceContainerInterface";
import ServiceContainer from "../DependencyInjection/ServiceContainer";

const ServiceContainerContextService = createContext<ServiceContainerInterface>(new ServiceContainer())

export default ServiceContainerContextService
