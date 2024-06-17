import { SvelteKitSite, StackContext } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";


export function WebsiteStack({ stack }: StackContext) {
  const certFutureslabDev = Certificate.fromCertificateArn(
    stack,
    'CertFutureslabDev',
    'arn:aws:acm:us-east-1:523058863466:certificate/19bf3157-d93c-42fa-8a67-3ac0ea387724'
  );

  // Deployemnt environments
  const environments = {
    'beta': {
      customDomain: {
        isExternalDomain: true,
        domainName: 'beta.futureslab.dev',
        cdk: {
          certificate: certFutureslabDev,
        },
      }
    },
    'production': {
      customDomain: {
        isExternalDomain: true,
        domainName: 'futureslab.dev',
        domainAlias: 'www.futureslab.dev',
        cdk: {
          certificate: certFutureslabDev,
        },
      }
    }
  }

  // Create the SvelteKit site
  const site = new SvelteKitSite(stack, "Frontend", Object.assign({
    path: "frontend/",
  }, environments[stack.stage] || {}));

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: site.url,
  });
}
