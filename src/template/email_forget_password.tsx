import {
  Body,
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
          <Container className="mx-auto my-[40px] max-w-[480px] bg-white rounded-lg shadow-sm overflow-hidden">

            {/* Logo */}
            <Section className="py-6 text-center">
              <Img
                src={`${url}/guardana-logo.png`}
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

              <Text className="text-[14px] leading-[22px] text-[#4b5563] mb-4">
                We received a request to reset your <strong>Guardana</strong> password.
                Use the verification code below to continue.
              </Text>

              <Text className="text-[14px] leading-[22px] text-[#4b5563] mb-6">
                If you didn't request a password reset, please ignore this email
                or contact our support team.
              </Text>

              {/* OTP Box */}
              <Section className="text-center bg-[#f9fafb] border border-[#e5e7eb] rounded-md py-5 mb-4">
                <Text className="text-[12px] text-[#6b7280] mb-2 m-0">
                  Reset Password Code
                </Text>

                <Text className="text-[32px] font-bold tracking-[6px] m-0">
                  {link}
                </Text>
              </Section>

              <Text className="text-[12px] text-[#6b7280] text-center">
                This code is valid for 10 minutes
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
