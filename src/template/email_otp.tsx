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
  otp?: string;
  url?: string;
}

export default function EmailOtp({ otp, url }: IProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>

      <Tailwind>
        <Body className="bg-[#f4f6f8] font-sans text-[#212121]">
          <Container className="mx-auto my-[40px] max-w-[480px] bg-white rounded-lg shadow-sm overflow-hidden">

            {/* Header / Logo */}
            <Section className="py-6 text-center bg-white">
              <Img
                src={`${url}/guardana-logo.png`}
                width="120"
                alt="Guardana"
                className="mx-auto"
              />
            </Section>

            {/* Content */}
            <Section className="px-8 py-6">
              <Heading className="text-[20px] font-bold text-[#1f2937] mb-4">
                Verify your email
              </Heading>

              <Text className="text-[14px] leading-[22px] text-[#4b5563] mb-4">
                Thanks for signing up for <strong>Guardana</strong>.
                To continue, please use the verification code below.
              </Text>

              <Text className="text-[14px] leading-[22px] text-[#4b5563] mb-6">
                If you didn't request this, you can safely ignore this email.
              </Text>

              {/* OTP Box */}
              <Section className="text-center bg-[#f9fafb] border border-[#e5e7eb] rounded-md py-5 mb-4">
                <Text className="text-[13px] text-[#6b7280] m-0 mb-2">
                  Verification Code
                </Text>

                <Text className="text-[32px] font-bold tracking-[6px] text-[#111827] m-0">
                  {otp}
                </Text>
              </Section>

              <Text className="text-[12px] text-[#6b7280] text-center">
                This code will expire in 5 minutes
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
