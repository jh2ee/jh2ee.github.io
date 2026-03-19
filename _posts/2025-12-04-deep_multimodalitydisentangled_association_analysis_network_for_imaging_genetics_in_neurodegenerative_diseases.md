---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMZVJANN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIGvUuPRixcNXoLWZ3b4LNB7X1kSbTPoreEciyBGJcHhKAiEAvxaOyHt3Kbp8m82FDQUt9n%2BH4NomaFJ%2B6Gl5I5oDNZ8q%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDLzEAKUaBK5vZha9ByrcA2%2F7B9BzTl%2BAJhK1ReLWZrXqsR7%2F0EV%2BwwSX3E4PVQLkjICbm8j2OSnp8Qkv5XG%2FdqG6cv5VOzP%2FcthO%2FMLHg4YRPSFwV000S2oF9pIeEyaUcz8bRn05LWV%2B30kSNwXcMkHLKdLwECaFqL%2FgUHI94k5u4GdsBtRybL8XP7o2InE9KqOIrN7kf%2FNic82Nil1ypeIsN%2BbQKEkvbHPtslELl8fMRdQVjcJMzWU6JcY8CupY9PL9q9sgNNFV%2BsdEnoZAoXMF9ijSV1ObIQeHchy19O2YwyomG0WNKtyolusLd2IhHFJqW22GHL4o7PEPKNe97vSMHLqDAPYDqcObes2E%2FBo37WaNr573TwUbkx1bVI45%2BXbBFHiRATmfV4vQMb9ob9Up4UkJKROnox0R9SZPmckZQWMpsZ38kbcduld0CkZRyHI98rkz7%2F0OdRt%2FgmIvnYye8WKsx%2BzswCqmn1DvM3tHPAQZwyzSvqtObrOvXK%2BcfZxa4Amxg90fF5Jw63gA9DPwhhkPx1wNIKCnre%2FX1chE4m5B%2BS7%2F%2BDHHs39hp3DycaITf2KvYuxNjx9dE4vlWZ8zL38VZXsBR3OMjbLmH2SKt6XtYvnCPMutYGBG%2BEskp2GbjguoSfIhKThuMN6m8c0GOqUB%2FdbA7Rx7zy%2FwT8gmMunnLAHpzMZhdXJB%2B5tBu25NZfr98AL4I2a08Y3Zfvccp9mOZ2Lf0CzyrIircDd0ZBLW0SpcMQHbNe3yT7kUkafeU%2BQu6dUjUcX3LPQI1EJ6OMqM879ZJRq2l0hYDp8%2FPPUYPfKTaymOJqw6iA4y8UavKEYG3pO0iPBSADiWmRZTlyaRFJTjxvnUrXVZm5eBRUOQhNQuF2Yc&X-Amz-Signature=c310ec9937bf5c7674095c37d4e892f995d6e1619ae4e57c9f8f569aa1d58e9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMZVJANN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIGvUuPRixcNXoLWZ3b4LNB7X1kSbTPoreEciyBGJcHhKAiEAvxaOyHt3Kbp8m82FDQUt9n%2BH4NomaFJ%2B6Gl5I5oDNZ8q%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDLzEAKUaBK5vZha9ByrcA2%2F7B9BzTl%2BAJhK1ReLWZrXqsR7%2F0EV%2BwwSX3E4PVQLkjICbm8j2OSnp8Qkv5XG%2FdqG6cv5VOzP%2FcthO%2FMLHg4YRPSFwV000S2oF9pIeEyaUcz8bRn05LWV%2B30kSNwXcMkHLKdLwECaFqL%2FgUHI94k5u4GdsBtRybL8XP7o2InE9KqOIrN7kf%2FNic82Nil1ypeIsN%2BbQKEkvbHPtslELl8fMRdQVjcJMzWU6JcY8CupY9PL9q9sgNNFV%2BsdEnoZAoXMF9ijSV1ObIQeHchy19O2YwyomG0WNKtyolusLd2IhHFJqW22GHL4o7PEPKNe97vSMHLqDAPYDqcObes2E%2FBo37WaNr573TwUbkx1bVI45%2BXbBFHiRATmfV4vQMb9ob9Up4UkJKROnox0R9SZPmckZQWMpsZ38kbcduld0CkZRyHI98rkz7%2F0OdRt%2FgmIvnYye8WKsx%2BzswCqmn1DvM3tHPAQZwyzSvqtObrOvXK%2BcfZxa4Amxg90fF5Jw63gA9DPwhhkPx1wNIKCnre%2FX1chE4m5B%2BS7%2F%2BDHHs39hp3DycaITf2KvYuxNjx9dE4vlWZ8zL38VZXsBR3OMjbLmH2SKt6XtYvnCPMutYGBG%2BEskp2GbjguoSfIhKThuMN6m8c0GOqUB%2FdbA7Rx7zy%2FwT8gmMunnLAHpzMZhdXJB%2B5tBu25NZfr98AL4I2a08Y3Zfvccp9mOZ2Lf0CzyrIircDd0ZBLW0SpcMQHbNe3yT7kUkafeU%2BQu6dUjUcX3LPQI1EJ6OMqM879ZJRq2l0hYDp8%2FPPUYPfKTaymOJqw6iA4y8UavKEYG3pO0iPBSADiWmRZTlyaRFJTjxvnUrXVZm5eBRUOQhNQuF2Yc&X-Amz-Signature=c310ec9937bf5c7674095c37d4e892f995d6e1619ae4e57c9f8f569aa1d58e9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBDXGQ2K%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCC4xwjegV0RV9rqllKBRVu%2BnbWBforr82W9NFI20mjwAIgVFjU12dfTdYY5s7PX6BKyslx13LrwolvBYwYLjVlLEYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDH%2FjhQ5yDbaRGQ12NSrcA4wmJk5fQuY5gUR8yNXJAJCMrEoTP35sVbQeVmMn7bOI8%2BcY4%2Fjye%2BLheApDCdbYhvQH2RrlwcSBqTXZ1Hvlckn35qPD5BTshmvUVF1atQSg3o9opK4ydvxqB1PzgZFRWWcNE2AxyQS1U7u5Np2ytAHNvllbGh1cVAc9MrrlIsFUrwyRBdLm2HlmaJNCY5kJxwNOShk4AsYoZ7se9hmiUoYHwnc7%2Bl1aytI88SxcDbN8W5L3hfFkljSUA%2BZa9FHwukv2iTqSVh1ik2mSZQfX8KeI9FqMsf2EUvEcyYOX4DP1AGrnNvAgYrfR2y2G9GSXTvcq%2Fa9LWKhA1MN6oJWtEKqx1Awf0KskYSAZaD9ojpjdbs%2BYPy4to0TUEvfBQ%2FLvSH2C4QGqr0FcvDNgLKadOvtqfqsqz25R2w6A9oiGKTg0KVxB5lO3CZf73Z8s%2BerR%2F90VN9EcJwQCTqHzVvumk3maZ1Hd%2BnlSeQPtl02ajoyWnQpKU4OyJ0bUke4AzOzeoZwXSbFZHY6ZuDbzl2%2BMuDJgpR5Z4CdeOwKmbUvNfOiiCIruXzphMXUwOoIwp0l9tW1RRUm4lon6%2F1jDwQxYY5xx9Uc%2Bz6YUgIElPtFhyEOl0ULcznpdvv3bQl5iMPqm8c0GOqUBQkvbu2pSujWwE28uqyfminxu6ZHSTnMV6DmcPWqU1M82HCbbrW7NIQDfYqdBFQuYjhS9R%2BTBmAdPIKocisAufrVxNMiD7Zvw0Wz9BJ4sq3%2BAy%2FeUS8lIf3oBcfyqYKA3%2B0EabXlDU2qDFo3lGMgAAh31iHIblebGpPjHs8qfrup5V8SrZqbhAIqAtOye6gNG1yTVqkxjCEKdv7VavmxA96FPV%2Fi6&X-Amz-Signature=3af00deceafdf9423ad6de44c11078d060ad83e45881ac90d122f6d7da1254f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GSH25TF%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCWYWMUszXa8KiXp11l9fwt2vnyJjhXagzKhPoFClhyTAIgO4dgRj7ZuN02UX6CuuDfxAxRM3gl0Y1V1jy%2Fqt8Y7ywq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDC2ZC31ZhV3lbA0atSrcA6x%2FlAj%2B4mxlSeIDyX5sAt9%2Fs4dVVziI9qtMEG9iH9PTm%2BT9AquRrb1tGU2Gcm6RiDoppt4hyUy0dH14Wwhi8gO9V2B7JEfVJdJcuX%2BhlplGcYSeKgD49Fy0NzPnQWG7Bp5mNXP5J1EkjzDEiKs4i4gR6ALKLCU9LCl0FZttZgXnWvwMZE9YTQobkWfiyX1G93Gg7J0dX3xq8jX94bPzEN4uJgbICjnY0Om2PRTybWDVkLBirYPS3pZmwnMeIpbKu7BVT88bJQexnemAs1oSaU1iCxgbitRHO5U0%2Bk%2BiSYTEVTv1W8U3ojwZe8kASRCEAY6Q7sUKR%2FpbCVf5imXLjhA8DQli3svbdp6ukab%2BlA3QXUf5Sos%2BoZjldfWXWzGC%2BDi2nZeVlVeP314F7KS2Pg4RN6cwktzdHMXMLc0UvdU7H9JYRWS1X0L45JmmWJhSrmDleclMcBbftis%2BaK4sGuDFFhmwOHNJ9Oot2Htlfvn89CQ2YWUAfHpA27oigWHe2A9O7%2B0llA%2F0a8EClypmyLPbD%2FUM27F%2FYxMIzr7VLoGlPe7dwMdsSkN%2FUZw2hb4nVE4ju3rcLNIiEn1%2BRq1Q%2BoiryLhkR5vAD7h8jx6t9jLGiK7PyfJgTVSG8FQhMNOn8c0GOqUBFZm9moskZ%2BgUuDyJdqfeDNHDZGlJb2%2FrQkKiw%2Bd%2FQil3T7cOng9bp3DL4h170a9H7lSbrNaRqy%2FMSo70VyeAx6YFHDDa1EFRk4cprwp8rgnqB9msBm4K52Hgsb8xBEhm4ZoQTXuNsZFeCOg%2Fn8CPGjzR%2B1aJiVXEaapxzXxzCLivRWwAu9GCcIKGVtlVMeKRjbg%2B1u14w0L1cFvIwnoR2XvBg4NH&X-Amz-Signature=b8f3b65e5c32154bcd9f9ec523a347e3d0da83f4a4bbb7d7f3799b9237bd420b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GSH25TF%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCWYWMUszXa8KiXp11l9fwt2vnyJjhXagzKhPoFClhyTAIgO4dgRj7ZuN02UX6CuuDfxAxRM3gl0Y1V1jy%2Fqt8Y7ywq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDC2ZC31ZhV3lbA0atSrcA6x%2FlAj%2B4mxlSeIDyX5sAt9%2Fs4dVVziI9qtMEG9iH9PTm%2BT9AquRrb1tGU2Gcm6RiDoppt4hyUy0dH14Wwhi8gO9V2B7JEfVJdJcuX%2BhlplGcYSeKgD49Fy0NzPnQWG7Bp5mNXP5J1EkjzDEiKs4i4gR6ALKLCU9LCl0FZttZgXnWvwMZE9YTQobkWfiyX1G93Gg7J0dX3xq8jX94bPzEN4uJgbICjnY0Om2PRTybWDVkLBirYPS3pZmwnMeIpbKu7BVT88bJQexnemAs1oSaU1iCxgbitRHO5U0%2Bk%2BiSYTEVTv1W8U3ojwZe8kASRCEAY6Q7sUKR%2FpbCVf5imXLjhA8DQli3svbdp6ukab%2BlA3QXUf5Sos%2BoZjldfWXWzGC%2BDi2nZeVlVeP314F7KS2Pg4RN6cwktzdHMXMLc0UvdU7H9JYRWS1X0L45JmmWJhSrmDleclMcBbftis%2BaK4sGuDFFhmwOHNJ9Oot2Htlfvn89CQ2YWUAfHpA27oigWHe2A9O7%2B0llA%2F0a8EClypmyLPbD%2FUM27F%2FYxMIzr7VLoGlPe7dwMdsSkN%2FUZw2hb4nVE4ju3rcLNIiEn1%2BRq1Q%2BoiryLhkR5vAD7h8jx6t9jLGiK7PyfJgTVSG8FQhMNOn8c0GOqUBFZm9moskZ%2BgUuDyJdqfeDNHDZGlJb2%2FrQkKiw%2Bd%2FQil3T7cOng9bp3DL4h170a9H7lSbrNaRqy%2FMSo70VyeAx6YFHDDa1EFRk4cprwp8rgnqB9msBm4K52Hgsb8xBEhm4ZoQTXuNsZFeCOg%2Fn8CPGjzR%2B1aJiVXEaapxzXxzCLivRWwAu9GCcIKGVtlVMeKRjbg%2B1u14w0L1cFvIwnoR2XvBg4NH&X-Amz-Signature=4ce817f077156c7a79087cd7010d424bafb840e1b82cc634e074696fe8b47deb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7SPL7H4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIDisrtS59O8N20t87zpKm2wBawPOBTmxDmvnmfVB76QUAiEA%2Fbj5uKqKjgYzolHFIXIH%2F6O3UF6c6ok%2FAg8ljtmdlHEq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDJWL34c9BN%2FuXO%2FhfCrcA%2BMVH2fnt8FDxYDOoMqmMcLC8TFYTIikdttJlx8ESIvir9gR01ey1wvYYqzJwAR6Vw5uOaPJoeHz5XKxQCZr5c1Hc7EYhm4PBFVbyXEIHzMd%2B5PETF3PuxjJNwu9ekmiR7QH7EzrJkhg4TIaOxRIyUeewFEUt7PuoXhfezU0YhMTdGMxRUxofAM2%2B20cTyeQQorY%2BeLZWBPaipsX9n6JcAHK5zaAD5a3MTz4yQhe39uKXHNYxdDku0phUHw0NqkweCSU8wlEChPNakxLbjlL7uQddaUzQCFww9obrcATRHxoZMXdYBxUq428DvQBBc0BGWaCKhGVQPHTK296WG25WSpiZkFDEJ0hPYBx8%2Bjz04i90eaymuDFklEAwWxGqnN4hvKerrpSBlMPnW%2B5eQ1vs1hwqxsemCbYvyReYQdAjQwaH9B1InOsxdxTFtVRYod%2F5vCSBBBKD8a5qa5vzvP6dl9dAtJlangINTvOnDAELLsSfH8pKU7nT4AqhSYL7EaJFsumVii8q%2FBg8KhGjQbh1WkRJR%2F2k5P0eXvI%2FnfG2t2Ob5GAnbLpPU7H7uaYTupTymYRK4mIw2OcM87EaMDBSLUop5BxJZrHPpc0cjcIg0F7QTPry%2BJ2MLoCm8MmMPWn8c0GOqUBzs4Iqw0ip%2BdL%2BB7Bgc%2FdR008frO6kKm7kc7qZNz7L1m%2Bjzwgjm1zTsu3UgZBbomuenECyWVuEDXepIOg7RDHjcVwGOLOqiuJoDcC9wwlh1piSKZ1%2Fkq3XR1aeo4rv6pp9tZagwRY7yyrPsoSSEa4huNJ%2FpJnvwor7OlKMvHLPTkh72NrI80DG3CHiYqJ0Z2GcsI3lBEwghMgQZsct612cbdKEykU&X-Amz-Signature=ec629bc66345a08797f668033fbd9fbd03fa5e5a6cd4957a298aa45402fa643d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466323MREBB%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQCeVu5koGjlN5pNwjkVkxivTUgGCcGcFCovm3J4nzp95wIgbCfqGLHumAO6GY56ZBbuA8r27TG0UcE4NF2KjIF0TXcq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDG3PG8F6oFDB%2Bw9P2ircA%2BCyX6bikDKsAA%2FfZDkEK1jeu4%2FHJ5IQ1NESYSU%2BsJv7MsDVyhlK2z2weAO0LrHUIFD2WjnsuVHJkgxPZgTRZiFcptVT1ZVvgOMYzSDjqd%2FSHTXa1TcHa87Pa7Jn1LTLtvy859%2FQCvEyHk59EgHHMo3bDR3hOizbd8fizCDTIxdvWJRaavhNMEuvUb7HWBqC4WaNWk5XkNQfLG9mjpm0wxft7BMKUNLZcDj6ieou4heC0XZA2pEVYa8llmVA%2FetiK1PI8rWOwGwVJtlwKawzZ%2F9Z5NhrOYnU%2Bu%2BLqMkST62rsmEOh94TJ5EHtSmyPW66wL5MLO8McFdwTZtf8kV7OIgYnociQN8d2rBB222e7I1bG75lZSeZFF5nW2zKf1XVdpx86dNXAo8qwAtESI3YWJLHqyD%2F13eaqqolky07v9S%2Bv4fWjBgip7Z0%2Fo5isOg9y5y1Yl72QM3YHLMwB%2B5i2WUgew9S2PeVuIICa1AGVghOB4WwafhpfVof%2Fa0qg89vwzQEFCRFlcQqfm5B1o7DZxN%2BIpAjlC1X4k%2FHb%2F8r8ulYalDUYUBcQcRhBZNZu07%2FYw0gK%2FWtkvHmX68zNboxOxUPCnEms0MFKqRNan2inTRmmv0fUMAYKhG3TPlAMN%2Bm8c0GOqUBSODCHiZ8dxXtaQKZ3JIhmv%2Bq5V4aNFuBcjhRKV8JqpVJ4J7qNTyFgEBZI%2FSg75cl8%2FulMxX7KI8ivOvfSoO3vpmLgv06rFfgSv%2BIm%2Be4VssSgXz4woc71Kb5OdTojuLZLWRqtUS%2F8KITKfnXEe303NJDkWOZhpIybeMHvBCQPE%2FlLTDvMZiOTV8TZhkcO6NlEnN6U5EgpsCZDlZ8DBozMNvOHnCU&X-Amz-Signature=1dbab779f678ac6def92936af926701d3a44dea547a5039e8f0dca1cee5e34d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7OB2TMT%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIBcb4bqHw4E6GkSQq1gslTIZ%2Bt2wa5KAKGNroJ9JJQ2rAiEA023pUIGB4sqdE%2BGKYiEW4lghVj23TQqaAVgT%2BG8K4acq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDDmSJ2yHEicDT02%2F4yrcAzlIajntXOt2vwZEEH4iJDvgqWzejf9ZDDtJw39%2B1t62dPSmM%2B3MAqLs2vfFWPzZws1YpQjdbJMN387YivrZr56HmKaegV4SBzV2Iz7gswuqSAL7JYXOTUOewYM2mG2PD4%2BFcnbXJO0wpIMKvdSPduipG6%2FKGGTaLr2A6b2Hk2h8MlkddmL2KaAvZqt8Q5nEJbTamPn4hTKz9nt5T6X502JiMck%2BOUg9tmz0fcRte8TagdQ698wqZZ7pgKlB8jZUEXYB%2B%2Fw4Ij8dxvXX4bon5td%2FQw4fiCgEEkqwl07LZJT2qqI60f1Z2cky5jpFNV2SCOO7lsAwRyltKEGRMnKPIKWPHVf2HZNTcZxiCRHn3bjh0ZVfoDiEDGa1TfFpc%2BjpYQ9weutvwKA6f9yim2QS527ilyMvVrHZj59a8axHmEmTqbyPoH3%2BaMs6zR7hKWoCYlIpw0gS4ixnu7P7D650wANWVQ5p7QsjdRfBv%2F1EPEIUY8t%2F4lmrVCcXuBnXEVD3iLVuoxWucC0RbY7KuvfkN1VNgdp02%2BuaZ%2BTR0ejQYIcbj4H29u0jm9vBx%2FAAobw%2BxR0Kqd9TM7Vp04QHIyXQJhWO7pL0zdKzIQdkDlbSoD2%2FTMvsZKDczIE3dHLuMPan8c0GOqUBm2R4FCHHBjGxuVWY7Pp780io%2B6OQBR%2B43Ah%2B38CEBpd%2F5s%2FcU6oYtXTKZv%2Fk3T81Bs3gc3p%2B9EyYGVYcfA4wiOWlEuUH6WmdElawawOweHpZlCAdEug4dRdIhoNcm4N5Sv4HmknaJO8e8BODB1LJOHWOdvjZxY%2Ba8TJD8wGCPyXDiRJ8lu%2FkoaavE14Ll9DWSUR6Ab%2FSm1YVfYNEtr3xTc%2F%2BngBK&X-Amz-Signature=8725484527ba4647121f5abe092e689cf0fcb42ce321809fe3030a9a1732c8be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SM7EEPGB%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIC3vHXxd3cOrsBoDkN6U0KOuXAEK9sbytFrOqlkMkoieAiEAnpZOCCkMRJLqPJh9cDZCoac6zDnKsMimEBtyzTzBE8wq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDO0pLQVUzHeQD4hSayrcA5vR8iGHiAt8YNnre%2BVL0EKd4zLgkGEiGedviTiDkX3I636uvzSRLDEDchzvfqWArXvu2NcMyhKkbE37eP43v6lj8K9eKgiebcO%2BgfJk1G8rnmJDUTg9u3RpTYHP2Ym3GtTRXRIrrYVfwfB%2BECJo0MeNpl5oQDtwt%2Fj968374HkUirq%2FgAVKGBZKZ0FXm9L9tSIouljxTOLuAYKyAC9YFd27anGmHZk8RP1Q9H0NfH3XkjX7gOeFKj%2BgLkO7bz7aXUbTcBGbswLcr3jtFI7sdAcMIB1jprilTX%2Fm1ojptTWXkw%2FraDjPTK5cjfoLO%2FYoAhcYfeJvYoQomGc5V7aS92vVxPV8Lboa07fZ9wrTQbIXyaKAFLQ4Jr6wyPLUkY%2F1Rzj9H0pVkxNUwJ8pF2OFf9dTZxp3jZ%2FnClVhO8kBbEjwdAxRp%2FZaRx0GGkk4mxfl%2FwQbkgYji1wnTbhClAB6IqDrwtfNu5yjDRytVAID8m%2BFKetInB0s1%2Fw0BemIHqUX7YYZmfF5XG0Y4SiBd%2B36%2Ff9JK3rSe5tGG4frD9uHXzxRtDM6XLvLNqOItg9kDyEE0Eu2fZtBqxW67oT85YsQcieEM%2B3xf2H%2FSMTffsevWfQb23T39VI%2BGN2JZb5EMNGm8c0GOqUB21ACfNYk3I3S7if3ndgeVknkm9PASHPc5cRglQXFYMm8F25A6mvn3aofOy8KIN3ndgI9fco8%2BByvSzG13DqwIPJQVRlj5WVnjhib%2FrXxj%2FsH15Mkw8CK4UPT5sPYpEHBPruYBE4crXc%2B8fCIVRyypb0Pxl1Pt9xHl0K%2BW%2FBK0R3n1LrYtI%2BXPzhNljQ%2BKoPBmXgqUhacS4UHvpCW4HnFjQN%2FQca7&X-Amz-Signature=85330cc975c3d85dc2f83a16aee6a200ee5e9a4941e4c911d6b2e2e068aca765&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SM7EEPGB%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIC3vHXxd3cOrsBoDkN6U0KOuXAEK9sbytFrOqlkMkoieAiEAnpZOCCkMRJLqPJh9cDZCoac6zDnKsMimEBtyzTzBE8wq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDO0pLQVUzHeQD4hSayrcA5vR8iGHiAt8YNnre%2BVL0EKd4zLgkGEiGedviTiDkX3I636uvzSRLDEDchzvfqWArXvu2NcMyhKkbE37eP43v6lj8K9eKgiebcO%2BgfJk1G8rnmJDUTg9u3RpTYHP2Ym3GtTRXRIrrYVfwfB%2BECJo0MeNpl5oQDtwt%2Fj968374HkUirq%2FgAVKGBZKZ0FXm9L9tSIouljxTOLuAYKyAC9YFd27anGmHZk8RP1Q9H0NfH3XkjX7gOeFKj%2BgLkO7bz7aXUbTcBGbswLcr3jtFI7sdAcMIB1jprilTX%2Fm1ojptTWXkw%2FraDjPTK5cjfoLO%2FYoAhcYfeJvYoQomGc5V7aS92vVxPV8Lboa07fZ9wrTQbIXyaKAFLQ4Jr6wyPLUkY%2F1Rzj9H0pVkxNUwJ8pF2OFf9dTZxp3jZ%2FnClVhO8kBbEjwdAxRp%2FZaRx0GGkk4mxfl%2FwQbkgYji1wnTbhClAB6IqDrwtfNu5yjDRytVAID8m%2BFKetInB0s1%2Fw0BemIHqUX7YYZmfF5XG0Y4SiBd%2B36%2Ff9JK3rSe5tGG4frD9uHXzxRtDM6XLvLNqOItg9kDyEE0Eu2fZtBqxW67oT85YsQcieEM%2B3xf2H%2FSMTffsevWfQb23T39VI%2BGN2JZb5EMNGm8c0GOqUB21ACfNYk3I3S7if3ndgeVknkm9PASHPc5cRglQXFYMm8F25A6mvn3aofOy8KIN3ndgI9fco8%2BByvSzG13DqwIPJQVRlj5WVnjhib%2FrXxj%2FsH15Mkw8CK4UPT5sPYpEHBPruYBE4crXc%2B8fCIVRyypb0Pxl1Pt9xHl0K%2BW%2FBK0R3n1LrYtI%2BXPzhNljQ%2BKoPBmXgqUhacS4UHvpCW4HnFjQN%2FQca7&X-Amz-Signature=17ce480e96245e2390fa50119a3c7bb1f9cf8f243f4cc155ae3d25fc430b1999&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNNWGR63%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQDTQwuePeIApHtXCydodNO2jzaMJSfOPUUDpGjC3Y%2BOjgIge0csp7CfjqEtRAfkAh8ep04T0KupgZvM6eaj8AIuCNYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDDsGn%2FrgAiRUysyeDircAzCh%2F56mMmJC7CrJP4vuOijHPeqgSz8ztN6RiGwcwx00AGZgKAWEQTpKemZkBwFHs0VFdSRa1PFG6J3WyYWHSDMorCKbVldxLJIvQKGRw3k6EthLTwlNCaRGT7zZbx0q1f76T6KFyL0t9CrmF4%2BzOEL9DuId8X1r1XqducorOvmnMbJJpRrDSjMDWswPA9X2v0RqQH8asU6ntf7AB8oVSUh6pfdv8vSw8eAK8Va6FQEZh%2FZ2YLdLRR2z7LgE17VVq98%2BFwTxN5lRkEwYVBYf1qfLuuD14da3zSiKvbpait7FF%2BZpNZiCYtPQKTO1FJ6YYyYSMKWzZQ%2FRFO7muOpnWJ5bQI4XjeoQX8EfBoo68CljW6DaHOm5YMpMJxwpSndnF4R8N8SzZ54YWvz1RayRKwFz7oia%2F%2B5cOlgx8Vede5kVIhGj2iBg9LeB%2BSwhjwZFh78WwHmn%2F8Ay6yHfZVdmon%2FfUFGWgXhAlEUtwfw56brYQ8he2UMLl8XMtm%2FVw%2BydMsO9YtMMjhp3YG9Yv8RODUPNSDJh0TJ3Pyu3V%2BHRnuoTQDroYkrTtmFxk9dnjNPSFJngW366bpsLEMBE9l2bC1GQft75vQ2j1vPqB%2FArXORd5URI8LGI4R8YGoIFMLum8c0GOqUBcbXcjX%2FUJrUmN4hI9J7GAbVSdbJeC84GQOVD99nWNKMaiNgIFpI4aCemLwLlZLatuS4CGaGPFPgkIanvvfV2ojo4ebVyelkQ0UkMeLhxdfnRZtDNKYVCXEh7EbsaJDilAzxSZAqk3ExdtwADSxPSBRckmEJB8y8dg7KLlDORcY9rZB4DrcsxFQJ1oM%2FWZV6dVlCjkI9J7kypfmPZ%2F6xQdUUbgVfY&X-Amz-Signature=0a275fd9c217c7eeb12d4452ce4ca1b8b71c5a2013d8312f8c294f2cdcb982c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRTUS5SU%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIDA90y3rf4SK7Ud5IWfilwAbULohlN3OcXYBPyZTN307AiAcQqZyPs4Y4urhWKmTx2y4AjVg0hbdwBBOJ0%2Bl1kIkiCr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMdI1ZkDNRwN6FW97eKtwDpW6foQ2GPK9m%2FnZwoSJmnDhqJzGdNTp8ifXq1FN2UW2uKq7YmNjKfCeQ6cePXcdf%2FXXfo6DA6olpaMOcy8ZaycolLt3LOzkVP5FJ4834f84J%2Bdpkr%2BAJDWzOuUBzz1ZMNRLe466OEwB2%2BWt%2Brv4AavdS4YwBlr9Dl4SHTlxXiNmHX616v%2Fyt4VBdR406rbQvR5qbQu4FiZeDKEcUbhPcJzpHmA0frOM5kNrqhpBMHaDfHZs5XOzfbUxFZof1FBJxAmfcqmLDT52Nk7XalTdl2IACBm73p7472IyFgQK3xNxLWPRog70sFBmEUUbgpICU7GZjFrZv%2BOAijz7zYpe0kgT%2FKQMkoAqhUmKR1qWFWA9Hxxj6I3fl1gnqlkaHpK7luv9dfQWyHZM3f9cYAnB9kaMHKYDP7OMtc4gWZ4zf9M6udUfWurhrToWdG%2FnZhdMxyNzThbesAW9VjCJsGmiEdXHhDmym3whzYfZ0CBidf80T6iZlNbuCqg%2FbQxGREZKikSB4zuEgD%2FlmUEDLjdRGJI%2FeAOixkEfUSH9hTysxUyLQ56N2dWIjqeGvZcEVKdlwyPvKcVhTUX2nCDKT9SSqhBt59DewhuVUlXbacVSBFf4%2BT1eNqRM4NpvultMw4KfxzQY6pgGdbBvxXBzkQ6a7oUiuaYbNchui7ha1qG6YuTcdZ%2FIdhHgsDc%2F0DrLEbDIX95t%2FEn7SFYqd2tso%2FNxDWq5gLEtECL6u291HGR2KEm%2BxbYz%2FXKfw%2FS0z0Vu9UZxK1F7GJIjn5o%2FJNqdUsW%2B2PwPnboicDPJIe19zYsp1tMyw7NVvtI0HEyi57HtMWmG0PZjyokl4JH47iInFXm3Hlcl84K%2BhjL7rQMyM&X-Amz-Signature=7dd624f1a48d6120d1b9dccf5c67c352b1797c2344c787a278b4f6e7020bcf42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRTUS5SU%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIDA90y3rf4SK7Ud5IWfilwAbULohlN3OcXYBPyZTN307AiAcQqZyPs4Y4urhWKmTx2y4AjVg0hbdwBBOJ0%2Bl1kIkiCr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMdI1ZkDNRwN6FW97eKtwDpW6foQ2GPK9m%2FnZwoSJmnDhqJzGdNTp8ifXq1FN2UW2uKq7YmNjKfCeQ6cePXcdf%2FXXfo6DA6olpaMOcy8ZaycolLt3LOzkVP5FJ4834f84J%2Bdpkr%2BAJDWzOuUBzz1ZMNRLe466OEwB2%2BWt%2Brv4AavdS4YwBlr9Dl4SHTlxXiNmHX616v%2Fyt4VBdR406rbQvR5qbQu4FiZeDKEcUbhPcJzpHmA0frOM5kNrqhpBMHaDfHZs5XOzfbUxFZof1FBJxAmfcqmLDT52Nk7XalTdl2IACBm73p7472IyFgQK3xNxLWPRog70sFBmEUUbgpICU7GZjFrZv%2BOAijz7zYpe0kgT%2FKQMkoAqhUmKR1qWFWA9Hxxj6I3fl1gnqlkaHpK7luv9dfQWyHZM3f9cYAnB9kaMHKYDP7OMtc4gWZ4zf9M6udUfWurhrToWdG%2FnZhdMxyNzThbesAW9VjCJsGmiEdXHhDmym3whzYfZ0CBidf80T6iZlNbuCqg%2FbQxGREZKikSB4zuEgD%2FlmUEDLjdRGJI%2FeAOixkEfUSH9hTysxUyLQ56N2dWIjqeGvZcEVKdlwyPvKcVhTUX2nCDKT9SSqhBt59DewhuVUlXbacVSBFf4%2BT1eNqRM4NpvultMw4KfxzQY6pgGdbBvxXBzkQ6a7oUiuaYbNchui7ha1qG6YuTcdZ%2FIdhHgsDc%2F0DrLEbDIX95t%2FEn7SFYqd2tso%2FNxDWq5gLEtECL6u291HGR2KEm%2BxbYz%2FXKfw%2FS0z0Vu9UZxK1F7GJIjn5o%2FJNqdUsW%2B2PwPnboicDPJIe19zYsp1tMyw7NVvtI0HEyi57HtMWmG0PZjyokl4JH47iInFXm3Hlcl84K%2BhjL7rQMyM&X-Amz-Signature=7dd624f1a48d6120d1b9dccf5c67c352b1797c2344c787a278b4f6e7020bcf42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646HAJLNN%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T202259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIDsRFLhdiHFyeLVCe3iMmqmWy3croiB%2FtCe65KT%2FV8QyAiEA3EVvlAK4Ii9cn8K4e37uHY59wzc91KPg2MUVukG3lUcq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDIM3DouXK51w%2Fj0HYCrcA2yZ7ThGtxKhkAItvnOeJJUSXvyG4vwKGoFQi6J3aHY%2FyUolKZpYzKPkbD3bXkH2pROKuxl5pTQht%2FhUY7yIXTidgwIxnKNV%2F1%2FkAXFPdh%2BndaedzfIZrmeGhLSgiFLtf0ZEG2j8ZXQd6UU5O4fzhLl8NqcYMaIHgDUbkZjaMyWXCtBwk%2Bs1P%2BrhazDAfdfscNKth1l4e%2BjAEpH44bo4LXKpoY93ADrMq6qn5jjtJIzy6REBQQWVIXsyEkb76Upo99RZWLj7N0ZKoF9nDy97AkV4%2F33aYcuwTJEMgjr84QkixUopwRnEzxPaCr8FR53XE5VkDAZPIhy3c18niE1tV%2BK42WEmBmfFXx0AF7RsP%2FB1iGKgo%2FM%2FQviElTX8FxamdwiLMXzu2GrLv5f%2FnCKlXf5P9InjFOYnnkjRxp0syWpCnDEykRdYf1uqllAgr6VTPCL4SSPndPs2F1FF4UJljRnoU6Hr0S9zTgueOv66mmgj%2BrLgP%2FPF8YyFKaQkSJNFcyWpHMjdeqeo%2BJjm6gp%2Fa4ZJrCyPuLztdi5q8uRwVDorK2%2BcK8fCxlL5qfFTuhFPedxN2gDrn5b%2BDWkNh%2BC9P8iE603Mlx0jUnFoIRp3kJ00n1Z9FHMFiEjmHl%2FTMPCl8c0GOqUBo2AIqlZrSgmpmYDIrhSc%2FRQJxYNvcYYFr1yattFseQ5POwbkR%2BIlIZKGOrdXXX4CkjzaZMdvUpSFEHVmv4uKlQ5jDz5YxbO84gHb8uQ8d%2FIG4dRWroGrr%2Bkcc%2BHtUkVPJLdXk0upTSOsBdySObfGpzWFR7mWdu%2FSa3Q%2BgXl%2FlflwnzoAnr7CXGgy1GitR84UwY7lf6j11bjIXztn473g4FJpt8Ig&X-Amz-Signature=368ddce0fcc899fda24a98d2473cc9012356df38f5c0f6643cbedce69495c05c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

