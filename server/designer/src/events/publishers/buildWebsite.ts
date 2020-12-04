import { BuildWebsite, Publisher, Subjects } from '@aashas/common';

export class BuildWebsitePublisher extends Publisher<BuildWebsite> {
  readonly subject = Subjects.BuildWebsite;
}
