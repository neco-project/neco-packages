// File: Account.tsx

import React, { useState } from 'react';
import {
  Container,
  Card,
  Title,
  Button,
  Text,
  Divider,
  Avatar,
} from '@mantine/core';
import {
  IconLock,
  IconRefresh,
  IconSwitchHorizontal,
  IconLogout2,
} from '@tabler/icons-react';

// کامپوننت‌های تعریف‌شده قبلی
import Input from '../Common/InputComponent';
import SelectOption from '../Common/SelectOption';

const leftCardHeight = "600px"; // ارتفاع ثابت باکس User Information

const Account: React.FC = () => {
  // state های نمونه برای ورودی‌های سمت چپ
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  // state های نمونه برای ورودی‌های سمت راست
  const [lastName, setLastName] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');

  // state مربوط به سایر بخش‌ها
  const [activeRibbon, setActiveRibbon] = useState<string>('Home');

  // گزینه‌های SelectOption
  const ribbonOptions = [
    { value: 'Home', label: 'Home' },
    { value: 'Dashboard', label: 'Dashboard' },
    { value: 'Profile', label: 'Profile' },
  ];

  // متدهای دکمه‌ها
  const handleChangePassword = () => {
    alert('Change Password clicked!');
  };

  const handleUpdate = () => {
    alert('Update clicked!');
  };

  const handleSignOut = () => {
    alert('Sign out clicked!');
  };

  const handleSwitchAccount = () => {
    alert('Switch Account clicked!');
  };

  return (
    <Container size="xl" className="mt-6">
      <Title order={2} className="mb-8">
        Account Information
      </Title>

      {/* استفاده از Flexbox به کمک Tailwind */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* ستون سمت چپ: User Information */}
        <div className="w-full md:w-2/3">
          <Card
            withBorder
            shadow="sm"
            padding="md"
            radius="md"
            style={{ height: leftCardHeight }}
          >
            <Title order={4} className="mb-4">
              User Information
            </Title>

            {/* بخش آواتار و نام کاربر */}
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                radius="xl"
                size="lg"
                alt="User Avatar"
                src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              />
              <div>
                <Text size="lg">Sepehr Hasanzade</Text>
                <Text color="dimmed" size="sm">
                  Test Controller repo : test Actor2, test actor3...
                </Text>
              </div>
            </div>

            <Divider className="my-4" />

            {/* چیدمان فرم به دو ستون با فاصله بیشتر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* ستون سمت چپ: Username - Name - Mobile */}
              <div className="space-y-4">
                <Input
                  inputType="text"
                  label="Username"
                  value={username}
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
                <Input
                  inputType="text"
                  label="Name"
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                />
                <Input
                  inputType="text"
                  label="Mobile"
                  value={mobile}
                  onChange={(event) => setMobile(event.currentTarget.value)}
                />
              </div>

              {/* ستون سمت راست:
                  بالاتر: دکمه‌های Change Password و Update با آیکون‌ها
                  پایین‌تر: ورودی‌های Last Name - WebSite - Email */}
              <div className="space-y-4">
                {/* گروه دکمه‌ها */}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleChangePassword}>
                    <IconLock size={16} />
                    <span className="ml-2">Change Password</span>
                  </Button>
                  <Button variant="outline" onClick={handleUpdate}>
                    <IconRefresh size={16} />
                    <span className="ml-2">Update</span>
                  </Button>
                </div>
                
                {/* ورودی‌های زیر دکمه‌ها */}
                <Input
                  inputType="text"
                  label="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
                <Input
                  inputType="text"
                  label="WebSite"
                  value={website}
                  onChange={(event) => setWebsite(event.currentTarget.value)}
                />
                <Input
                  inputType="text"
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </div>
            </div>

            {/* باکس پایین فرم با بردر آبی و دکمه‌های Switch Account و Sign Out */}
            <div className="mt-20 border border-blue-500 rounded p-4">
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleSwitchAccount}>
                  <IconSwitchHorizontal size={16} />
                  <span className="ml-2">Switch Account</span>
                </Button>
                <Button variant="outline" color="red" onClick={handleSignOut}>
                  <IconLogout2 size={16} />
                  <span className="ml-2">Sign Out</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* ستون سمت راست: سه باکس که مجموعاً برابر با باکس User Information باشند */}
        <div
          className="w-full md:w-1/3 flex flex-col gap-4"
          style={{ height: leftCardHeight }}
        >
          {/* استفاده از flex-grow برای تقسیم مساوی فضا */}
          <Card
            withBorder
            shadow="sm"
            padding="md"
            radius="md"
            className="flex-1"
            style={{ backgroundColor: "#E5E7EB" }}
          >
            <Text className="mb-1">Superintendent</Text>
            <Text color="dimmed" size="sm">
              این قسمت می‌تواند اطلاعات مربوط به Superintendent را نشان دهد...
            </Text>
          </Card>

          <Card
            withBorder
            shadow="sm"
            padding="md"
            radius="md"
            className="flex-1"
            style={{ backgroundColor: "#E5E7EB" }}
          >
            <Text className="mb-1">Admins</Text>
            <Text color="dimmed" size="sm">
              این قسمت می‌تواند اطلاعات مربوط به Adminها را نشان دهد...
            </Text>
          </Card>

          <Card
            withBorder
            shadow="sm"
            padding="md"
            radius="md"
            className="flex-1"
            style={{ backgroundColor: "#E5E7EB" }}
          >
            <Text className="mb-1">Change Active Ribbon</Text>
            <SelectOption
              name="ribbonSelector"
              label=" "
              options={ribbonOptions}
              selectedValue={activeRibbon}
              onChange={(val) => setActiveRibbon(val as string)}
              multiple={false}
              showButton={false}
            />
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Account;
