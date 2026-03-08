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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VF5FFBS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIDNRDw%2FCND8phLBKXQxg6gRWIiCFkTF%2FLjRZUolgmfsEAiEAk3KYtJ0M1jc3Al7FfZ2Dd6xsDGknljyjMfjJIbRnfZcq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDOj57aAX%2BG9xd%2BQV8ircA29rjDo9smwTV0CmnbGRjN59hIN3eOFWR3Fgf1ybw1vT3DVzm8oRoVH3f%2FgT%2F5iuZ%2FY6DCpktq2weogO8LBoxGpx9dh3S2UPJObQQr1QrgHK2bPEE1yAoFNJM4z8tuur5lYXXdXL691YWwBxInCn30G6XFZM7IGCb26tlTEGMOu4kSr6Lx7oKfiXKuSOivsThrufTJbQE5Wd0DboDy4Zbv9%2Fk8HauolWaI4OQLpTJYxAqJ858wjlYZtjQPtNvTCi%2FT%2Bs6fv%2Bv3gDdSVrN%2BDZLaEts2RdS5jEXaKGTuQ4tMo98BtiXGTLhKw67OjFcMBsoMH1QpHydiaYUVcI4GvcJq7bNlusdvR0bGmxrPTE%2Fo8qLsOVzUWxKiCPublw8YL9uIBgCMRjXQYNbjck9%2BkABFdnPVejj32WEwutOGsp1aLr15aB2CHvz%2FGilUas6NhJz%2FsEe0gtVuH%2FpOwq7lMBNVviwO7CSTmpR%2B1mBpoH%2BImVz0%2BSeAXK0LMmv4WLqMXSGfovixYc%2Beo6ePsD4k8gl1o7NlEB1pBveydofiMnZOXvM5csrtj%2FQEcxNXst39aa9cArAk05QKoNbayx3jM4yjk3ySpbdgukEwE%2Bl2qi92EswKI7nSNq6tQFff1tMNX8tM0GOqUB6lkPPkSX%2Bs%2FDnuv5Aq%2BUJoqwZ6e%2Ffe2nGQ%2FuW1xxca40Ltxaj4I7oRqWWuNulRZuuZhOZdE6j9nBbQrqC33nYgWXFIS4zOFUlXwDDhHADV3XU%2BF8CwAN3ORd6YZobSZFxWQOGlkNz1nLO7b1h2cjj1WImOFTulhehrzp8txVqD8doK9iJ3vpFQzv8LQN7ZxBXzmuApBqV976nUn4GGWvTM9jLjXZ&X-Amz-Signature=2995b09a7f847395639fac6d152dfb1900dd8b03c0ecc46730550fa44a249b89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VF5FFBS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIDNRDw%2FCND8phLBKXQxg6gRWIiCFkTF%2FLjRZUolgmfsEAiEAk3KYtJ0M1jc3Al7FfZ2Dd6xsDGknljyjMfjJIbRnfZcq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDOj57aAX%2BG9xd%2BQV8ircA29rjDo9smwTV0CmnbGRjN59hIN3eOFWR3Fgf1ybw1vT3DVzm8oRoVH3f%2FgT%2F5iuZ%2FY6DCpktq2weogO8LBoxGpx9dh3S2UPJObQQr1QrgHK2bPEE1yAoFNJM4z8tuur5lYXXdXL691YWwBxInCn30G6XFZM7IGCb26tlTEGMOu4kSr6Lx7oKfiXKuSOivsThrufTJbQE5Wd0DboDy4Zbv9%2Fk8HauolWaI4OQLpTJYxAqJ858wjlYZtjQPtNvTCi%2FT%2Bs6fv%2Bv3gDdSVrN%2BDZLaEts2RdS5jEXaKGTuQ4tMo98BtiXGTLhKw67OjFcMBsoMH1QpHydiaYUVcI4GvcJq7bNlusdvR0bGmxrPTE%2Fo8qLsOVzUWxKiCPublw8YL9uIBgCMRjXQYNbjck9%2BkABFdnPVejj32WEwutOGsp1aLr15aB2CHvz%2FGilUas6NhJz%2FsEe0gtVuH%2FpOwq7lMBNVviwO7CSTmpR%2B1mBpoH%2BImVz0%2BSeAXK0LMmv4WLqMXSGfovixYc%2Beo6ePsD4k8gl1o7NlEB1pBveydofiMnZOXvM5csrtj%2FQEcxNXst39aa9cArAk05QKoNbayx3jM4yjk3ySpbdgukEwE%2Bl2qi92EswKI7nSNq6tQFff1tMNX8tM0GOqUB6lkPPkSX%2Bs%2FDnuv5Aq%2BUJoqwZ6e%2Ffe2nGQ%2FuW1xxca40Ltxaj4I7oRqWWuNulRZuuZhOZdE6j9nBbQrqC33nYgWXFIS4zOFUlXwDDhHADV3XU%2BF8CwAN3ORd6YZobSZFxWQOGlkNz1nLO7b1h2cjj1WImOFTulhehrzp8txVqD8doK9iJ3vpFQzv8LQN7ZxBXzmuApBqV976nUn4GGWvTM9jLjXZ&X-Amz-Signature=2995b09a7f847395639fac6d152dfb1900dd8b03c0ecc46730550fa44a249b89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAHA46HG%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIQCJ7L7B1cwvqKBY%2FA%2FtKpg8uM%2FvqpPAoY0mo4tmCedT4wIgG7JZXEfSgK9N9WY7mWHjQRnpi8jsMGJnp1R%2FguAMkg8q%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDKp5EYp7yXBkvEDI0yrcAxNtNi8%2BTi03GENsOOg77c1OkFzWyg2OUVkLOGaziK0lygLOK0fM93paUGyGt1RjhdJCKo4bInwe1V3kCAorDGkHqLL%2BcYg0QpkytCl%2FCbI7B4fUy6AN9DpILxzuVg7gD3b9MP92qeVnzYkyakC%2FBcq%2FOxHqEqzXmv7LYEke28zN4KFicIlQ7bZ6lS5JJzckThoO5IRNASlw2ddpY%2FZ1Y1TZHhSJM1fdRZKzu%2BK5kt9CzEVGe%2BfPfyS0HTuc6gp8ULEt3W3cs3o%2F6%2B3luHQc%2BNrkfnWi5cLicys8KHAL2l4DHF53RoFOIhDJoZn6gTyIQTSyZTASvEuYAbnitNY17q4YaRIttzr8aDVr7F7DkYGkDBhYIsMqnJQ3mW%2FXE6uGNpSsm0T2qjM7vOwWBAH86nqaben3tHDOGIaugcg5m5JV2Wp%2BxX%2FO2YK0X0zQ9VSsUjGi8QuojlhNehg8NbMj3vHHZUOFgynZu5MfRakXJQICyLNGvgdcluBVyIZ4dLiD85xI40%2BIkzoXo5avvx%2F20uLgqW1nSX4DRqMRqNsKGYO%2FlhEGIrw9otdFA%2F93z46jaA91LWNa2DAJ9C6xgqUOWJou%2FyBJhxWIlDgArqSNsuu52gpo7uEQ%2Be3VzSa%2FMIn9tM0GOqUBCAVDPRQ5ldnY2znJfGO5cN3vXfDCWrf8n9eCYF%2FcyuAn6RhKOa38dA%2BcFs794%2FV%2FiMoCl5DVCrvYf84R%2FLfn6eJr8iXHpLifF4qiRl%2B9NVyZmYm7vo79MQV72hXWlQDMMdtLReNuaDie5yBVn45oODpBylbkC8RQzsDmP6WKiSQLU0%2FmFDdZI%2FjEsXHb%2BA41ycmjDPC92gwbD8bN8yF1eqxNCZkZ&X-Amz-Signature=c4eabcc204bc7115ea955e274a37365cc68fb03fa85c1c01d8fc6c10f35ad7b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466225UPMFM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIDgYQ%2BYj%2FwLdOEv9e16f33K0%2FmIj3uuwG8iJrwv1jVhYAiEAuuBEgiCZCKSajuNi27wS8oLcVOdSOQeMMXyCPihL12wq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDOicK3Qvh10fg9kr5yrcA75cbKuDam%2F%2BoCUGQVF6IBd%2B%2FERVj0nPoqFJnqof8Brk0yfqdfE2eosE4MamDdzlsBlqupKVIIF0MDVbm9mYnFV7bXHtajEi5744hE91KdJjRDeNLk95yQaJC69ppCYzqAwJXMDLbTMwLzhoF9y8bpX01uLVkbkfmyyY%2Fu3UiBtU9IJUSoXIlo9hA7K%2FV9REHkjq3gBUqQEh9YUV4Ei5%2F%2Bd66UX23VdJ12OQFx6%2Ffv18gOlmFYQxfyx2NFW6w4nxSR2QvIN3Jpjw2l9oSZimh5sSp%2BjFUZ0%2BEbjQRCOiS%2B8zJMlE2Iev%2FwMEOSVEZD1h2bcUYlSPlFhF1u5RFD%2FBK%2FDsRPBYCYdD%2FZ4U8H8siMbeboDvQva3sZysKOQb9m19eMEJ8nKiDPWZ4NwrTTcqCp5Tv1EocNDuZQgj2hVvWFYVrKcSOMwoCHwKKc2rbEq%2B2cbMzwg5GpZvTxnf63Xl%2BvGN1NWZ8iRfDei8f22dLoHzPzdzVX9Jj2IjqZrBGVyRmiQ%2By4JrXHq2C3Ee8kAjABfW3XIBMIh8VAdHSLbplhZoqqjMvC68nyo5iM5iaVk9tXBLMHEEQ2v%2FiUMxD6Krcth8IuWgSc2n4RtDs2o0LcyH4V0ceKohJY97ITKgMLj%2BtM0GOqUBuiwOHWSAJXuuW90pipseKfw09NJLT%2BN65bJXZVg4YrKtdc23RTQqAtpeSIXsdfhLPaqeapFecY%2BLWJsCeC6OPQ7n0K33hTKqDb1bTinvWq%2FCk0gBf6xxhSRdHq6M5n0At6Xmu3xzgB%2FFTnHa4BhNTUooJUu%2FU1mEIm8U%2FGeJfnufQuYDt4niCy8%2Fl%2FzhV0pOQnxOICJXbn2bRqGPvflVCxr96Xkq&X-Amz-Signature=37ab50589d4de5463c07dd00ef7f5c860f4a20dcafe0efdd16f20bf621410b0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466225UPMFM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIDgYQ%2BYj%2FwLdOEv9e16f33K0%2FmIj3uuwG8iJrwv1jVhYAiEAuuBEgiCZCKSajuNi27wS8oLcVOdSOQeMMXyCPihL12wq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDOicK3Qvh10fg9kr5yrcA75cbKuDam%2F%2BoCUGQVF6IBd%2B%2FERVj0nPoqFJnqof8Brk0yfqdfE2eosE4MamDdzlsBlqupKVIIF0MDVbm9mYnFV7bXHtajEi5744hE91KdJjRDeNLk95yQaJC69ppCYzqAwJXMDLbTMwLzhoF9y8bpX01uLVkbkfmyyY%2Fu3UiBtU9IJUSoXIlo9hA7K%2FV9REHkjq3gBUqQEh9YUV4Ei5%2F%2Bd66UX23VdJ12OQFx6%2Ffv18gOlmFYQxfyx2NFW6w4nxSR2QvIN3Jpjw2l9oSZimh5sSp%2BjFUZ0%2BEbjQRCOiS%2B8zJMlE2Iev%2FwMEOSVEZD1h2bcUYlSPlFhF1u5RFD%2FBK%2FDsRPBYCYdD%2FZ4U8H8siMbeboDvQva3sZysKOQb9m19eMEJ8nKiDPWZ4NwrTTcqCp5Tv1EocNDuZQgj2hVvWFYVrKcSOMwoCHwKKc2rbEq%2B2cbMzwg5GpZvTxnf63Xl%2BvGN1NWZ8iRfDei8f22dLoHzPzdzVX9Jj2IjqZrBGVyRmiQ%2By4JrXHq2C3Ee8kAjABfW3XIBMIh8VAdHSLbplhZoqqjMvC68nyo5iM5iaVk9tXBLMHEEQ2v%2FiUMxD6Krcth8IuWgSc2n4RtDs2o0LcyH4V0ceKohJY97ITKgMLj%2BtM0GOqUBuiwOHWSAJXuuW90pipseKfw09NJLT%2BN65bJXZVg4YrKtdc23RTQqAtpeSIXsdfhLPaqeapFecY%2BLWJsCeC6OPQ7n0K33hTKqDb1bTinvWq%2FCk0gBf6xxhSRdHq6M5n0At6Xmu3xzgB%2FFTnHa4BhNTUooJUu%2FU1mEIm8U%2FGeJfnufQuYDt4niCy8%2Fl%2FzhV0pOQnxOICJXbn2bRqGPvflVCxr96Xkq&X-Amz-Signature=420a074aea17fdbf1888c16a6d2012bdec8aa5f47a2f230b20b7d4f9d5b00ff7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XD775Y6%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDS9VqJaIJJwFm1j4Y7IPE%2BKoUBloPeRoXOMNJTQINFUQIgFVYqf8xdUi8vTtD9oIsG%2Bb5rL2Q5IbZEFxui5q3jsYwq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDFG9HOYk08Rbi0tICircA4SCWNQki5lx8P1aZbyl5Gy4e8UyxXmcUeGfjLih4NndO2KOYH7IJjVKuUHwRMiblpa2ZI%2BRg%2B1EK%2FjfJ39xkrOlDCIi1SAwp%2BPRjrcQFv2UcuEgkGzFPZ%2Bb97XEHs%2FSwRoq2QNcJ4nZHouhyV38ONuoet3ZB4z1WgYMdxWGsS7CsOZX6bV66cFaXUCDD0tFVmdJt%2BL1o0M73iSJefjux0qpr%2BsQDKgUkPdIgPsa%2Fmp%2FA4KXAeV%2BzE6zxZ%2FbJFHhJATRRaef7G52Uolzid%2FZ7GVBHPiLmXnGYVOhFcqzFLry3UkoEbiDmh4HOlurxVPPWuuAy2qrrTxha2w82z4tHpWS%2BB1kB9LxbNFAjj0X8QUsyz3QitvNYbkZY%2BSzbnSuBhDRB%2BEGFNxUcyMVDZ0DrJve5jVnAWECAospEqxAR6Y4Qwuya%2FYf%2FM9uq3X%2FIz3hnF1glZXhuf3gcnx2CapeDpLfyhp2eO5fAOahgEASMLJ1vsTwSH1%2Bn6moHpQWQuGozL89Djv6w6cnfWWBWyVmp4aRN5Jn%2BwbCYCORc6K0ojUajQDeCRxcDKPJb9vsHJ6dNbN1DnVuL4K5eRBtiEHln72oOOoHprI6MpAeFtzEaXYUu4iyKJn1jNgaLGpbMPr9tM0GOqUBM8EW0PWYzAD4n%2BNO2eQH6UEfWKwE966edvv0oGqaZbUaPjFOPGlKw1cewP%2BYzIUfOP8I8ZhXv7AIR2m12vyqSYjK6kMC%2F%2FCw1e%2B7DpWKpm32WLB9gQNCUghUBCpIXIv3O96P5E%2BW033H7K3wiVpb3rZD6FeOG%2BMe7mTdHc8dDgykIuD5py2T%2FuiBuk5eFg3Jp8Bas4MO0xKHMWAkr187vHQrU5ba&X-Amz-Signature=ea49e3785fe4c18a8756db103fb0d6223b25da0b30db759fc43a53b34d5b0848&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRUMLTRL%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIAWB3SG7Sypbx9%2FF8s5fTAeS39YljlgrUyem8XwZLyiwAiEA%2F5qinM8qW5vbM5cBuvMEDhkL%2FhnjkuRgMvzg4fpK%2BcQq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDN4TAhsfiZcmMzKqbyrcAz%2FnHpIRMZNwnvfHGwe6aWIafjzHCPTRmbYjCcfY48o5Q4bhicFWlaJkZ1k9ApmadNkXVmP9MW4xh2FjBdHwaLS%2BIoN2FB8DBA4kSydzFdrwtCSWFONqdjVUaMqGBIdEqL57cXQUfQGjADO0yWahyjN2pJYcaKjA7m3KlhPVqJ24YUzJUs9IsEeSltPO6%2F1gj4I%2BKNl4kUUcI3u%2FgwVTJRWxn3LNMFGhDMVhiM05SGMYbGLK%2FQcqAxeXXGUXNNAbc5eSmzlU3QeL%2BuGn%2BuLbaHCQ%2Bd5SfMI%2FOJmw8JWDs6SbQ2wWwMtBVSTY%2FEgoC9pkMSsbatJICf68K8QT33%2BOjXug2s%2B0zNMr7wcoYT2p4%2FynldK8%2FnqrxfjkWFLbNJabU8SXu0Z%2B%2Fm5Rz6lUp28d3fc43SQqxeYJiUSaYq7IDUSB%2B6a4XL6AwPUdx4yqzNQaFbUuTA2v7HHTj54uwQ5ijlheZNHCCzmnU6riQIEXYZcoE43RZvpjdBk8obUqtOGm4oe3Rh9DTGqn%2B%2BKNqtWsP0tb6mTrsKQd%2B35p8XiMIpmXrVe4oHZTKtlwAXkY0TAbyTnXEtb98MMMZSp9ULnMNhKCfoh6RnQZjw%2FND7hHzXiqh3zwSzqZCygRafhdMPj9tM0GOqUBfxcp8pWRNjMlusmyRqporpj4I6VyPIATNZf2kxrPRuyISEzgMR3PWs0Te399D6vAdj%2BzbPws9eRw8SC5%2FeIY3R%2Bs3LRvA29UuANPOratKSYHviPwUuqwdmoei%2BE%2F%2FYk1M0Nfbw9OPItzLihAiML6Ys1VEQouNnSFrcBGSapAeXxdITBJE3TZRvMArD%2BmRadrOXnaNAalAnRMxYCkbCYX5ulc8NSW&X-Amz-Signature=ae5f8490ad96d393564acb0379572f832abe7d3a2f6e52a1026f9e31c2eaded7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCFJGLJ3%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIGwyX9FW7eHhMlwr2iMOiOWLV%2BUT6TYnUGdWYpwOz2orAiEAwvtWLI1uoedKZSopTgIKs6ZQ1qLShZBRpBcY2ZqLprEq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDNH%2BmYyyisZdFuvCaircAx9a%2BQvtxfImyNCLb8TDfyAI4Pex3UH4FZBlZc13JRmC5t%2FAUiv9ZG2R%2F%2FtV5C7n9UA%2Bw9cGUydQIjN3IE7daS8LfVds8Uwvnon4dg6iVW5GpKsctgtIqF1zDOmv4seaf1ka1%2BW8Rv0GG5kGqWtArcpms1nosmNtBkDDpp0xE5ymf3Yoxvb3IZmdKEfA6gtuYV08OehR9ALRSqebWghifaU%2BJ%2BGiAv4YAb2OTTmd%2FE4u7kW0V6bzndN2aIdL4Hsdi8UZgzAPgE6oZlfMiOjqhwFx%2BEUtyi8K%2BGkGrciAGU%2BzuW5Lui1ONaLlcYu5mH62nLaLox0JoSFrV6fbgXiQFiFVcFrjmk8QScZgRtP938zjr%2BmThaIyCdwi4GfW9JapIKzSufXgNQqjrKWWisA97iX2bvgJSet4L5LjvgjhTncNAd2AkxB%2FQCHdIR%2FleNT1B7UaSzVHSSwC%2FE%2BH5VHo8Hop3n8VvWBHKpO32IB2%2B%2F2Ap8Uf7vkhI%2FSqQzDXZbtkb5QWoP55GKKbdIToLdnk0a2ergY6hpt5xRtKQb%2FNMriUvXSCczBWZqjHtLFji6WFJCHxsx3Jf0Dt%2Bn2eqcUx9Y5r6uaNnSoLb6SmvBiIFwtSm28cneKl1Yc6gGKuMM39tM0GOqUB%2BCCXvnR2Lcp1jMcm%2Fv5sZq8G8dfOGqH6ncbQiW5LJbxLSAmZ5KhHvPKfaDEqklMKkgY2wsYR5EhunzAj8oKWmt%2FDHNNnluyo5t0kNibwtYAL2ozFcyaprBie6RNyngITWdoqPvbv%2BamBHrvpw8Z7OmuE3LYoWH%2B0wdl2kWlAFP%2BK59N7rF%2Fj5Jao7oo3DUiLyHYLulhv2A4%2Ff4TnSEKu4MsJxVHo&X-Amz-Signature=1f7357d84d758002a8ef4d45b6b2e5a3b0c0bd3a7daa0287d13c337426c2be73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCHW3YE5%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIFtBZApW3gyLyjVZYEcaCfsW6c31znd0koOmhbVej3O7AiEA9YMbspwY4Cq0Fqep7kLydOubYteXYN%2FB%2BOvEygL8OvYq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDHpgSYcYWaKqvr40ZyrcAxz69WIDyjKE648bZup7KfFv8tRbXrJGI6A9dOchyZsCkdZZVsledTPfLxJFdoqNiPRDMGAcTdxbzxYDZCUjUHKvPmuaojd%2Bo2BGlJsrBQU5dIqBtmInzJEZMInEhcMQxCy4Kf%2FhaOy7D3bfr8IzV0bzOk2h2dC9BWtqDtfKek444NdEC3v54pY3%2F3lj812%2FH3uDLHEcxGSmPabqyUEWAThMy3l%2B%2BmV6wKf%2Bc1X1NyN4avPdpB2F4FPG5W8HsKdTFhVmy19MRQ1XrGuTdOqdS77MPM%2BW1TprriQZ4pfrISvdfYbyLcSBy4tJYKIeH3OpDOhtFE7STeQBxo3wi3pCQFuI%2FFSI0L0uF%2Fvfsga0QcxzBYz9UFySAelPIQwwhIAqjj7WY%2BRhHib9RjI9I3BePSPYaEC3o2lZeL1xvOAAl3Cnyt9bHG%2BH%2Fh4yTT9e8RVJNA5Tbuhp8SgbNJQGz%2BVZ1T%2BWvpZ8BOTkqcCCK6oMHLbHh%2BtnifSQpTePdwWFn6dz6lpVesvk41qq1ZpoT8Vts7ANwl4zAAf7UJkR9jlSnOs6pPBw9EY6Ti5lD9LESyN2Xo5xOhTeySRDuWeqmopnOgnsKprREIGwV9i%2FZzgd7b3E23jpw1hRbcRzSrRHMKn9tM0GOqUBtaIYbatfI0aT%2Bp%2FwQS8jRobxqK2O5y4ow8Nu9yKNIrPtbekgey1ut0wmG4vDN18zxw0wEjd8beo3pdq1LKp90vdV7iQxnEPkQfgJQH6dm5mrlIjPVlfxGxyPLk1FPZxDunODsaYIhiKwdYrqIlDdtrSAPpqeS2BorcmSdLUrk8pxBNfuOl9Vx5dYtmp3hybjJlDo%2Fnt5FID9CDM3dDICcc5SeGSN&X-Amz-Signature=33cdb66098d8629153af0fd2cf9e5e21ba3c50f872260b86ebd13ed9b080cc89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCHW3YE5%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJHMEUCIFtBZApW3gyLyjVZYEcaCfsW6c31znd0koOmhbVej3O7AiEA9YMbspwY4Cq0Fqep7kLydOubYteXYN%2FB%2BOvEygL8OvYq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDHpgSYcYWaKqvr40ZyrcAxz69WIDyjKE648bZup7KfFv8tRbXrJGI6A9dOchyZsCkdZZVsledTPfLxJFdoqNiPRDMGAcTdxbzxYDZCUjUHKvPmuaojd%2Bo2BGlJsrBQU5dIqBtmInzJEZMInEhcMQxCy4Kf%2FhaOy7D3bfr8IzV0bzOk2h2dC9BWtqDtfKek444NdEC3v54pY3%2F3lj812%2FH3uDLHEcxGSmPabqyUEWAThMy3l%2B%2BmV6wKf%2Bc1X1NyN4avPdpB2F4FPG5W8HsKdTFhVmy19MRQ1XrGuTdOqdS77MPM%2BW1TprriQZ4pfrISvdfYbyLcSBy4tJYKIeH3OpDOhtFE7STeQBxo3wi3pCQFuI%2FFSI0L0uF%2Fvfsga0QcxzBYz9UFySAelPIQwwhIAqjj7WY%2BRhHib9RjI9I3BePSPYaEC3o2lZeL1xvOAAl3Cnyt9bHG%2BH%2Fh4yTT9e8RVJNA5Tbuhp8SgbNJQGz%2BVZ1T%2BWvpZ8BOTkqcCCK6oMHLbHh%2BtnifSQpTePdwWFn6dz6lpVesvk41qq1ZpoT8Vts7ANwl4zAAf7UJkR9jlSnOs6pPBw9EY6Ti5lD9LESyN2Xo5xOhTeySRDuWeqmopnOgnsKprREIGwV9i%2FZzgd7b3E23jpw1hRbcRzSrRHMKn9tM0GOqUBtaIYbatfI0aT%2Bp%2FwQS8jRobxqK2O5y4ow8Nu9yKNIrPtbekgey1ut0wmG4vDN18zxw0wEjd8beo3pdq1LKp90vdV7iQxnEPkQfgJQH6dm5mrlIjPVlfxGxyPLk1FPZxDunODsaYIhiKwdYrqIlDdtrSAPpqeS2BorcmSdLUrk8pxBNfuOl9Vx5dYtmp3hybjJlDo%2Fnt5FID9CDM3dDICcc5SeGSN&X-Amz-Signature=9d8c1e7a51edac3728ea6b9bb6e46a1b5cc9e5bc87e307e8712eb6b3940371f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVNELFH4%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJIMEYCIQDSMA3YBQSTO0ZGCJSVn6%2FqjdkD9zPGFluUgWc7CchJ%2FQIhAOSKbEpUHrCK%2B0ocHClUtwRP7tpo7Iuvb18BasEUGhzlKv8DCBIQABoMNjM3NDIzMTgzODA1IgwdKhAc%2Fs1XXmRLvpAq3APGt3dqoy5ypZTA7KY%2BM2TO8FY3Kn8Rm8BqaK8kEIq5A6BaOzCr1BkI%2B1id5lMCuKI%2B9mn9Jt2%2FSnFj1Emw1t2C91bvg%2BrTROW9Yaoa7sJX%2Bi12VbBmvq6hlNl9CP7Hky8rE2PsL%2Bx%2FbKD9yBa0YyeXKTt%2F27RKGxFi6RD3boLUTGc8aMRGvuWqmDZj9IlP%2BlCa3dmLmUYK0Xzfhzxss5nu6U5pPzeEc%2BUrTD7OMlUdrixJRtAObnklwWchjKqPkQXk9Mlbwj0F6pCvPlUvBDqOrzmfR8vkvXY3HwxHjD6jWMjht0cPNR9Rd%2Fi3cg7NSj%2BLUiKR9FJ5rU6BfNoLQzIAIwCIMzykbS%2BMCADTvBohl2SR6EPxNu4sFe4tiF7jOF9VhGm4ikDlUaJvX%2BgAFk15Cj0zGa1w0FfuaBtz4RMlmmw4CLClhBXknSWNb1gvca8BGlEUs28YahchFWbVx9bRq7AhuhvNePd5cTVkKUILE6DRvusKeVQfw8b2ZLMTysf02O1nP6Os0E6pL5JYiSxpbkLEI0EQ9MWPpc5IvbEm1eSfE8GBcdIzVTCyk3rFzn6i3y69mhxS6P0C8RL0G6tx3P1PZtSmT%2BCQl0CKtd0GS0GFprGt5ufpLBpzLzDU%2FLTNBjqkAUrbcaHheDTJHfo4m1wJuTBPXZTVV6l8H0e2uWGgwzHuSLThHTkJaWXYmG4J0344F1Kc0b%2Fzz42EZFltu1xhgCSTzcZ0Bu0tm8u6FyYa3i0x%2BBK55RqqSjj4smvxd%2Bym0Ljq%2Fcm6Ye%2FUaah%2BdeCWoDzW7h%2FkwLoC3eszxudfgFSurOs%2BtDj6O4rWyImUA1jn17a7l7Jp7%2FkDgWhwye1Dy0g0osbo&X-Amz-Signature=e1f0538c381f6f26fcd20ad8ab320275f39e4aa88438fed362921affdade627b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USJ2GRPH%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIHFXTveNHWVnpuBn7uK7VcW4Z9AZAqDF2WRyGg0o36BPAiAkf6ZtBvzTwV6dG0ltwcdmr%2BGUSX%2BqlX8YZcXY%2FwXdMir%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMPJGN4Jy5IW1RG2owKtwD9BnZYEm0iNPIDQK%2BV1K19w48KTC9TJ1h3Tbh5MK4njIw3Mll8%2BLLu4eZrd5Vu32LzllvmupjAhsHiNPyWoWiWlsn1DuJfJFtNguL8%2BmdkiNyy77YpvRWv85DizHPD6OjV%2F45cTGx1PUOuX7HorgGgjFMCJc64pAX4FpHgt0rdVmoc%2Fjey3%2BhVnNiVmUr5VGWnhXibteeB30dW2d%2F2A2kHj1S4JQ2X5a2CJ70PXqqfIwFqCPfghW%2BDob6rQl%2BXpvXsBJQAsJlRhYddHmpaeNs5OD%2BgXpBpXA2nbqWvYT9oA4Pb1VHUCTQa27kdunpVT0lNG9q2MLb4ub8t3BauXtP0MwdsuJNyJHCzDqBwFzzWjFtgovE6%2FAKMb%2BxYMEvpaQfLW7CeufHWeQn6wUNxr5OnQoRUqZEjBAgZF1krJJmHvdmf7mwkqzQjycTYsrVFmvYT8%2FZfdaGeL8Jpupbgx821B37bJ8%2Frw87OhTbDe%2BtTbtu0Et6hNN17n5FMbwv8MiEbIUB11Z7j7L1h18zmoUYbkL0CC15Yt1%2FfE%2FPcvfcBFsQwbfeAx8j7ikYRP2GBPeqVuNS9D5pJuUzuo1mEep1D%2F0t1Y9uWXyhoB7ahSkm7GZvryqQCnNLjxu7MBgwmf20zQY6pgFaj6IhGkXIlscyIss%2FLWRzeVJmGDkh58kLw73s0CAx6Fs3mg4DvK%2Fu2D4LLvo0sSTXJinThpMt8ZmX0lu9fie5cVXlJdZZtNBEywddtSNEUh2tjWkMQRHujdLlh9iKQeDRGCHIMIyqeOz99YJwMWsLVxApxLDC59qhoeN4IC4%2B%2BwJ8dh7D43PXczQwyJsteHWPDY%2BfUdB9bza%2FM7uW3NPqYh1cVkt5&X-Amz-Signature=71e4b8dd138a6fedb97a44b9ea429361914ab186a90f28dfad6bd2b7694fc9c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USJ2GRPH%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMiJGMEQCIHFXTveNHWVnpuBn7uK7VcW4Z9AZAqDF2WRyGg0o36BPAiAkf6ZtBvzTwV6dG0ltwcdmr%2BGUSX%2BqlX8YZcXY%2FwXdMir%2FAwgSEAAaDDYzNzQyMzE4MzgwNSIMPJGN4Jy5IW1RG2owKtwD9BnZYEm0iNPIDQK%2BV1K19w48KTC9TJ1h3Tbh5MK4njIw3Mll8%2BLLu4eZrd5Vu32LzllvmupjAhsHiNPyWoWiWlsn1DuJfJFtNguL8%2BmdkiNyy77YpvRWv85DizHPD6OjV%2F45cTGx1PUOuX7HorgGgjFMCJc64pAX4FpHgt0rdVmoc%2Fjey3%2BhVnNiVmUr5VGWnhXibteeB30dW2d%2F2A2kHj1S4JQ2X5a2CJ70PXqqfIwFqCPfghW%2BDob6rQl%2BXpvXsBJQAsJlRhYddHmpaeNs5OD%2BgXpBpXA2nbqWvYT9oA4Pb1VHUCTQa27kdunpVT0lNG9q2MLb4ub8t3BauXtP0MwdsuJNyJHCzDqBwFzzWjFtgovE6%2FAKMb%2BxYMEvpaQfLW7CeufHWeQn6wUNxr5OnQoRUqZEjBAgZF1krJJmHvdmf7mwkqzQjycTYsrVFmvYT8%2FZfdaGeL8Jpupbgx821B37bJ8%2Frw87OhTbDe%2BtTbtu0Et6hNN17n5FMbwv8MiEbIUB11Z7j7L1h18zmoUYbkL0CC15Yt1%2FfE%2FPcvfcBFsQwbfeAx8j7ikYRP2GBPeqVuNS9D5pJuUzuo1mEep1D%2F0t1Y9uWXyhoB7ahSkm7GZvryqQCnNLjxu7MBgwmf20zQY6pgFaj6IhGkXIlscyIss%2FLWRzeVJmGDkh58kLw73s0CAx6Fs3mg4DvK%2Fu2D4LLvo0sSTXJinThpMt8ZmX0lu9fie5cVXlJdZZtNBEywddtSNEUh2tjWkMQRHujdLlh9iKQeDRGCHIMIyqeOz99YJwMWsLVxApxLDC59qhoeN4IC4%2B%2BwJ8dh7D43PXczQwyJsteHWPDY%2BfUdB9bza%2FM7uW3NPqYh1cVkt5&X-Amz-Signature=71e4b8dd138a6fedb97a44b9ea429361914ab186a90f28dfad6bd2b7694fc9c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UJRVMDI%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T101156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQCU%2FMzpOOvUjDV0voIwuuP%2BkeJfFVZyemvq9QpZzuLK0QIgJv4UpaRHO8gWiYDTJeTR1xdud%2BSX%2BiYYkN5evA55a4Mq%2FwMIEhAAGgw2Mzc0MjMxODM4MDUiDPgxbFtKg5MFBCLKdCrcA5QcMHSArspiCQE195q0dNxtCaStqAXQYpT27qCDkrav%2BRGne4ow95ueO6oE4Hp%2FseLMm1fNb%2BhWNxBgDDApH7tSFhiSjrqOloGs1glGOraBva43ZPiLQyCT1rUMGi6AsTGK%2BFtRZ9IXyUV0k%2BbiWfZaUECQ5WuaXHnDUGm2N51FALbjLtB25wEL%2BmP63rS2NJsELQr0DuxwaaJQL8YnRnq74JzYa7GxUfKS1RH2I0%2FMae1USRS9h6zDgafMC%2FRd%2FuLaxu0A2HvtSxZqShOvK%2Fwl6QIiQjyGYE0xYJMaMlRD7xy8UoyrkUHo6X2ExfeXwBlhsIJOhfeDZx%2F%2BuZMO%2FHQhWM1n3Gsw9KiQD5q7DJq6uPT%2F32mCWHNFm34OJN5GYM72tfB9dkhJS7R7JICXiMdVP2zZPRI6d5LH9sTUQtrsYcjQXbUt%2FOW4dBN9STQdLp6fYzxB7nkQhE%2F%2BfOdP4cpUOhfR28i0SMPzFQTdkCB8be2GlVT87EH6MyClcKdr2AQABHlPgMFq%2BGlYjbeYjPRJftaV3pDKGUAmoKVVO3YuFXDupKdwHIrKQlAZHQAmJy35%2BNgWwJdXT5%2BSkEeVjlnO2B7J3NhRrZdDHRd3WYNBYPBvpdr3ROFZS0rqMPf9tM0GOqUBpWRdmP9Oypx%2FSUy%2Fpf%2FyEd1q%2BykM60rtGRkxWQHiXQEy6vY449xsutFF%2BkNQScPwsqCCjYrr89EIJW2jrf4RDpK2qtzX5P6CtUKRJszEjevmAnw3ygH84347hqxWWorLxWqeJ0qfcI1Zt2HLFWoc%2FI9m1pczeD2qDA3QV53r3ufSDUtpzYXYGfKQ16FbGBTcjPByWb2enzc9OT0ucyj5ZHSoOrvg&X-Amz-Signature=96e55c0b831061d60d6003c0704580d8aeb70b3691f0536b540610cd540b1d31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

