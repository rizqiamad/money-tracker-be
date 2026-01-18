import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface IProps {
  link?: string;
  url?: string;
}

export default function EmailForgetPassword({ link, url }: IProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Guardana password</Preview>

      <Tailwind>
        <Body className="bg-[#f4f6f8] font-sans text-[#111827]">
          <Container className="mx-auto my-10 max-w-120 bg-white rounded-lg shadow-sm overflow-hidden">

            {/* Logo */}
            <Section className="py-6 text-center">
              <Img
                src={`${url}/public/guardana-logo.png`}
                width="120"
                alt="Guardana"
                className="mx-auto"
              />
            </Section>

            {/* Content */}
            <Section className="px-8 py-6">
              <Heading className="text-[20px] font-bold mb-4">
                Reset your password
              </Heading>

              <Text className="text-[14px] leading-5.5 text-[#4b5563] mb-4">
                We received a request to reset your <strong>Guardana</strong> account
                password. Click the button below to set a new password.
              </Text>

              {/* CTA Button */}
              <Section className="text-center my-6">
                <Button
                  href={link}
                  className="bg-[#2563eb] text-white px-6 py-3 rounded-md text-[14px] font-semibold"
                >
                  Reset Password
                </Button>
              </Section>

              {/* Fallback */}
              <Text className="text-[12px] text-[#6b7280] leading-4.5">
                If the button above doesn't work, copy and paste this link into
                your browser:
              </Text>

              <Text className="text-[12px] text-[#2563eb] break-all">
                {link}
              </Text>

              <Text className="text-[12px] text-[#6b7280] mt-4">
                This password reset link will expire in <strong>10 minutes</strong>.
                If you didn't request a password reset, you can safely ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="px-8 py-4 bg-[#f9fafb] text-center">
              <Text className="text-[12px] text-[#9ca3af] m-0">
                © {new Date().getFullYear()} Guardana. All rights reserved.
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
