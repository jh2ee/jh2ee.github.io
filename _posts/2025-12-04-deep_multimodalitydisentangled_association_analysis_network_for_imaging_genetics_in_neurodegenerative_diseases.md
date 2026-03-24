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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NVEDW3I%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFm5Cr6UqBsR0EPqjgffbZk25ZvAF6w7EdZzUKNwYfnAAiAtq%2FCr7R%2BAs%2Fu%2FAdwRTaW%2FIvPuguPar3%2F5tZaN1MTrzSqIBAiW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMP96wmtS%2F0RQV8vfMKtwDi7XFepgEMLW4XVaPixmy8pdxDRP8WHNJCQ5iL0Ms2CZ0Da6RodVuMS%2F%2F5bvpFmVID0OJUIquzQwp7Y5b%2BvtxzseGAiCir4gUBTxxsE5wBlK1UdE1TmpeWvptN4qftTVEvxYmEKf11SXJo2aZu1ARGQg%2FpHYlOAT9N2MpxKsxXtQl88vgGcPh8gtjzQrWeNSRYOIir%2Bn035duIuHL1LS9wTpGg8FcNESy62s%2FDQ5T3tdX8OkPWyH%2F%2BA5geOXxes7PpX238WIZsDd6rRlVn%2F7SqtocUK6WncTwy5krhiVGdUi6rCa5V2hxV2Yw25COJfRsPMLuGk2la58%2BlKBe77ccrdTQpdJZd6pjboiJUxDb6WjTUnSJh4i5AqFUSNXm9k5vi8lM%2F7ozOXfjYqN4wTe3v3Qb8lXQhrQe4IB2NNeWshj4IBPLUxBHeuNJ75pB1ZQFxu6t4C4ZCIDZ2MtpVEw85V%2BGKrmKa%2FiCWP%2BgJWyen6cxIIIntxrI5uONbgtvX9bG%2F8HdnpUzkcubx%2FgWKXq724Gl2AqJTTP0aZqe1gbpQAGM9xdwqBJzmH7%2B6oYL6YVXhXMkUlEImjYCEcPnaInHHMR8okJ7Lh8%2FOlpd7AnKyRT63UqLCDpxeVfb23MwwJWKzgY6pgGIDdox2W791j9Ir83s6hIBuzORuKlp%2FcRJazmuUYOPMOCDkaBJAfHCOim9WnunB0ILy2vUqv73ppr9gFZLFZBc%2BR4XKABwxoUQoyGayj9Kxfj2n1ZXNU%2Bd1xArXxify%2F4VN4sb3utHDPs2WYrSY2GwEdQbPO56ZsZy2isu48NF6rTc1xAsiRWjhlP1RQKhuaEBRT6m7IihU2buCcuNJKrHY4lM6Ar1&X-Amz-Signature=d4e289bf84b8e50c23e944df28fd703b7a51377fa40743a7648f54736b099d8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NVEDW3I%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFm5Cr6UqBsR0EPqjgffbZk25ZvAF6w7EdZzUKNwYfnAAiAtq%2FCr7R%2BAs%2Fu%2FAdwRTaW%2FIvPuguPar3%2F5tZaN1MTrzSqIBAiW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMP96wmtS%2F0RQV8vfMKtwDi7XFepgEMLW4XVaPixmy8pdxDRP8WHNJCQ5iL0Ms2CZ0Da6RodVuMS%2F%2F5bvpFmVID0OJUIquzQwp7Y5b%2BvtxzseGAiCir4gUBTxxsE5wBlK1UdE1TmpeWvptN4qftTVEvxYmEKf11SXJo2aZu1ARGQg%2FpHYlOAT9N2MpxKsxXtQl88vgGcPh8gtjzQrWeNSRYOIir%2Bn035duIuHL1LS9wTpGg8FcNESy62s%2FDQ5T3tdX8OkPWyH%2F%2BA5geOXxes7PpX238WIZsDd6rRlVn%2F7SqtocUK6WncTwy5krhiVGdUi6rCa5V2hxV2Yw25COJfRsPMLuGk2la58%2BlKBe77ccrdTQpdJZd6pjboiJUxDb6WjTUnSJh4i5AqFUSNXm9k5vi8lM%2F7ozOXfjYqN4wTe3v3Qb8lXQhrQe4IB2NNeWshj4IBPLUxBHeuNJ75pB1ZQFxu6t4C4ZCIDZ2MtpVEw85V%2BGKrmKa%2FiCWP%2BgJWyen6cxIIIntxrI5uONbgtvX9bG%2F8HdnpUzkcubx%2FgWKXq724Gl2AqJTTP0aZqe1gbpQAGM9xdwqBJzmH7%2B6oYL6YVXhXMkUlEImjYCEcPnaInHHMR8okJ7Lh8%2FOlpd7AnKyRT63UqLCDpxeVfb23MwwJWKzgY6pgGIDdox2W791j9Ir83s6hIBuzORuKlp%2FcRJazmuUYOPMOCDkaBJAfHCOim9WnunB0ILy2vUqv73ppr9gFZLFZBc%2BR4XKABwxoUQoyGayj9Kxfj2n1ZXNU%2Bd1xArXxify%2F4VN4sb3utHDPs2WYrSY2GwEdQbPO56ZsZy2isu48NF6rTc1xAsiRWjhlP1RQKhuaEBRT6m7IihU2buCcuNJKrHY4lM6Ar1&X-Amz-Signature=d4e289bf84b8e50c23e944df28fd703b7a51377fa40743a7648f54736b099d8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5VSKB3N%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2Fhco3ETPxohVZvhveQcM5%2Bhj5dwkQo1i9U8XIAvmyEgIhAMqbVM%2BlHczwYYZin9qbRCAxP8Mqvg4ZYpmWOtTctk43KogECJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgztJkbI4a1oE5VunP0q3AMRZK%2FjuVisIC%2FQUztAdhgB2Y2LyZHGaxm6FFCvFQ%2FVKzA9%2BXqOV2svVsgz%2FAOf6dTRu0ISuhV54dTnihhlZhy0f%2BEpUCcah2Q7SvE5hIccUBoCRf2uugkf6SAEooyxLvJeWqmhxUckkXOp2dOr6g42jnoO2J0m6hMucw4uO1G0yqGz5Pfzly%2B1R3nKWvl0BGNRrqlBkv1FzM1wB41DeniBPD85Itk6fuEiMpv6z6t8KkXNUIdZh3Who6fCtf5UDomHUIs7PSjSHTWdrW9HbRoG9aZc%2FAeC9TZpV%2FdRHggd7nOTzPsUK3%2BA%2BkH%2Fg2hN1vO4SlSVgY0cycrtAD03Rj9mRPx0NsC%2FopwqzP5AY3s9tGHNiSwlf%2FusZCdSz1T8zFkEd2NHPRz%2BkfaQrjDyB4xCTPnlHoufGZ%2Bdhzq63ln0D2Xoc3FkFCDQjUX1hTLiRnAJ46p6kaIIVjdWwYfTj1ZEy6e%2BFZrE9BIT0vlnTHpnl9Dn8Noas8%2F12wC6Zvlxp%2FrdJpnUe7NJatlzQvDDv2qf%2FLWeMLOXrFYPUKS2ClYeWLLsLHasW4YwxoslI1ubcXbyjipgPE4gCVSiToPyOC5sPV6cM17YNxko3E8U3UVpqXtWp%2FHNK4rUTmWPaDD%2BlorOBjqkATRoV7yMtrAIm8H1x%2BJYPyQoCrsGESbbkFbW3%2BqldmguUuWK3UVhPYJcj%2Bz0zF7Qje9DjYTkVIgMhO3W%2FQsYlfwSDI1U%2BEc%2FjUNwov0yKOh0MJPNciZY0bBXAWP2e0%2B6AqSwQMSLygzCnGXCMbEUUXSa3xhvCld2Jt6aAkoTBBPPb6LzAYHGySHpnvHZqgp3h%2BJ6jyeuK%2BlAX2nfnBFD%2F883lxz0&X-Amz-Signature=1a287c7ad4156d447037ee4df728fabfeddbd6ecbd9c975748a3cc5f4415c560&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656RMUMEE%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG1Pk2RtaxNP5j6orxO9UQmBHfPjnt2x59HNYnxAONmiAiAsLjw8TzkyIxyNvplfZ8MlTjKqottru5TLJWntP5ls6CqIBAiW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXZY4Gf7fWCe83Ir%2BKtwDu6Q8zaIxzMiH6p58%2FJDGxxG7u%2BcGBKIuR%2F8ulCCgtxO%2FqQWcI6%2FtclInoIGWM8xD%2FiKzK7%2BL2iKNj%2Fo%2FkPq0%2FtTT9zFfhVaZUtsNaQXUjx326PRD48E4nFD%2BushEot19nmSrPu2%2FLSoEyPBBduRFX3oXBh1mRKmFe7%2BgXkr48qDGQkz5%2BLDhTDEI%2By6HyD4bHcQ01cnwqU8sXym9eY2DC4NyZhaeBmN99X4tbQb%2FvAPKvbgKaNptYNJ%2F1rvti3QZxMzswBmyAQkttSHsYp%2BThh3kxBtrJIDpTk9fZZwwV4akNvsXWvPyxBU4U1gAVg%2FynaO1FJTSf%2FuH%2FsqjuWiv3AtheMCP%2B6B6JzDdZrqZmb3NL1cEWdmW1ufOaMKW1iS0rVMUHBMehyxRheY9d8%2BL8sumYzW%2FQSf08J87uPyvTN%2BTrpgUK62m8JWxNO1G%2FwemipBoqSz%2FWoRUsmUJZvy4CP6%2FEKw1lszvQR2lWIHaFFZtp7893ojjDtxMbE9d55Ps%2FKiQLi1b39bCvgCVkbgIvviJkPDulRPz1Ur1Q0zHTRHnMYQdUZXypCaaZ8XTdf1F0hQDawdHT%2FYzsg2%2BoW1GWaZkS%2FPWIDepUilOzZ1gFe1Nq%2BYv4SX236nLffAw1ZeKzgY6pgEnqq43DIl0HU7aoh8fuuDaWeGS6YT2dji%2Fkmyv9f0L4zmN36xs2HVKzKHY2jOHdaHvVc23yXP0eZ6mPU98kH8UMrQ5%2F0UUs59ZOVkqy%2Fpy4lJoOHYqxRCwamP0AV6e0npbMkOhkfwKVm3XeK%2FU%2B7hAU%2BzMJH%2FrvAhEzJp%2BaTYyaWFYPkwIjB9YZsOFo8oFuNggmURrfssBsp%2BiElCkGpYRZz1PjiG8&X-Amz-Signature=1617f4d13411b18ed4eeafb637843cec98be252b23a9a34b968a2fae98d0d73f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656RMUMEE%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG1Pk2RtaxNP5j6orxO9UQmBHfPjnt2x59HNYnxAONmiAiAsLjw8TzkyIxyNvplfZ8MlTjKqottru5TLJWntP5ls6CqIBAiW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXZY4Gf7fWCe83Ir%2BKtwDu6Q8zaIxzMiH6p58%2FJDGxxG7u%2BcGBKIuR%2F8ulCCgtxO%2FqQWcI6%2FtclInoIGWM8xD%2FiKzK7%2BL2iKNj%2Fo%2FkPq0%2FtTT9zFfhVaZUtsNaQXUjx326PRD48E4nFD%2BushEot19nmSrPu2%2FLSoEyPBBduRFX3oXBh1mRKmFe7%2BgXkr48qDGQkz5%2BLDhTDEI%2By6HyD4bHcQ01cnwqU8sXym9eY2DC4NyZhaeBmN99X4tbQb%2FvAPKvbgKaNptYNJ%2F1rvti3QZxMzswBmyAQkttSHsYp%2BThh3kxBtrJIDpTk9fZZwwV4akNvsXWvPyxBU4U1gAVg%2FynaO1FJTSf%2FuH%2FsqjuWiv3AtheMCP%2B6B6JzDdZrqZmb3NL1cEWdmW1ufOaMKW1iS0rVMUHBMehyxRheY9d8%2BL8sumYzW%2FQSf08J87uPyvTN%2BTrpgUK62m8JWxNO1G%2FwemipBoqSz%2FWoRUsmUJZvy4CP6%2FEKw1lszvQR2lWIHaFFZtp7893ojjDtxMbE9d55Ps%2FKiQLi1b39bCvgCVkbgIvviJkPDulRPz1Ur1Q0zHTRHnMYQdUZXypCaaZ8XTdf1F0hQDawdHT%2FYzsg2%2BoW1GWaZkS%2FPWIDepUilOzZ1gFe1Nq%2BYv4SX236nLffAw1ZeKzgY6pgEnqq43DIl0HU7aoh8fuuDaWeGS6YT2dji%2Fkmyv9f0L4zmN36xs2HVKzKHY2jOHdaHvVc23yXP0eZ6mPU98kH8UMrQ5%2F0UUs59ZOVkqy%2Fpy4lJoOHYqxRCwamP0AV6e0npbMkOhkfwKVm3XeK%2FU%2B7hAU%2BzMJH%2FrvAhEzJp%2BaTYyaWFYPkwIjB9YZsOFo8oFuNggmURrfssBsp%2BiElCkGpYRZz1PjiG8&X-Amz-Signature=a8d85190a0e2ee67bae7dff12787f874e5021b3e4888734580f2c99c9dcdda8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V64R4BQJ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFXOe57tWoYWCVV73Zga%2BNsHY5MoeVAPRxzEnyxr8N9xAiEAogH8fKrWw9OgoXRIBAZDzhWtxARfO4GNptqU6x0VLXQqiAQIlv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB%2BybMipSyV0CIN5MCrcAxTtIDPz2FdEEuNcxlCZLuupiCSP3O%2BCYxiM3MKaIj%2BYLef9PU7vRAWbo6yQwNtWTAcDaTARwIyEy%2BBo43baju0b5Sqc7LavM4itwHifXLcnJ2ZlE3rFFI3nAyA29gA23p73frde4pECWMMhdaTpZf6ljSBDUNgYdSQhaHXiqDiv5m0VloXVAx1nvO5ATeY0YntJs2e%2Bi%2BAu50jsAXJCf%2B8ftQcUsx%2FjVtgHLfEAbwUBX0R3aDDe%2FIH9e1gQXPy9%2BfJ5PECtLjKXJtrpViOx2qx4wjDJMq3503qB22fFGJp0y7QiI47uu76eoHNel5JmQXRfc5n4wCdncE%2FYXN3hkOQLAFi8dGU%2FMpt4O6Au%2B53g2e0piQxZ8%2FNsJACTLQwvE5u4wEailKHTGW5sTGoJyBn%2FBx7eCiP0glAI4NWGSv3PDN51PzaQSHQl5tQS6kbrxZ6YYcvcBKmpUnfJ2ef6TDS1PWb8tUJTern6APBpxA%2Fz7zC9%2FDJXidLTXjZ117VhVE9uzd03bO67RSwvbVqTmogRcfYLgBGw2f7GFAP75wHnRJBNrVZNt%2FiaHmtTtn3LU7sBsIl6NnnkG7OEs20om%2FjrgKLJVCaDw7CAcF7j3D3VUuqpivGsmg5PtC0dMJaWis4GOqUB%2FKfH8JufRD6mTrhjjG3tHiUcfLZEMCESn%2FfQaflG9D56FzN14pauMPkdGAlyzda2B2aloFak7DuKtB3GTwlbo%2BTx4XYOHZnWastAaPU3WvEHYptD4TczjzzQDEClvVEENly9DmjqwizSzwG6BiHIyyBKjMGTk9sdSPndVbz6q0fQyLPh%2BgsNqCUDJtw7iXc534gRCq905ICJ8zk4dTUuaXRo6co5&X-Amz-Signature=153ac490d58aef3cccfec963447f3f5a8698f85cdb81293e6f951c61e03c4485&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XWFAL4H%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSEzJ%2BU2u%2BqMfQfDoFo1Pn9%2FgNTcsvcjw8WKFctC0NXwIhAOjGdCd7aMiz%2BHLi%2BMwDp021akLtwTM%2Bfr%2BgKHTfpx3KKogECJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxfXqLcZANL0a2vRCsq3AO7NEJpUOxcgw5kPMZAAOKN4TQnw7wDpa83PTCo8L58uOWo62xceTq%2BPI%2Fw7x7UqJnry6%2BxepYaKWgotVWmTYmvqaE1uuxqOtOW0Betp6skcy61wema1XDjeSIDa5MtmRcehEYf3S4O9mR1eYOidu9I9bTcYJvEu%2FJXLpFK2BaHgEOnr7%2FFPhfInKHnyOmzCAroEg6Eh5uWQQCBWz08rXKSbcsxQmQXlhxhpLPi7ES4kVxYNYxWMyzOWgYJUswAq4xHm6guHLybYEeNF6BmQYbJ64SF%2FjJqKw%2BgmVMoHctw9uygAuiE6ON4%2B2GLoLlWFeZem%2FcquuUJ5WyKcs2ngeNNFhxdKE%2ByMhdg%2BhhLbub63XSnRuzA%2BkL7zg6q8Y5yQKtr1e36aPMiC9idXg7HX6DqHbStI0Kz5qL4YCvpQNwTHPpdjxI7IxHerR1McolEj63P%2BHYF1Vg2MaVtdc8mxZw3iajKtB2Qc8JmvsO1cumI%2Fd7p5F%2FueAuCO2Yi1jaAM4DSjcrsfVTEJ%2F0hXdTrxjswMlYJElg3RdlHj%2FskEfBNwpkrhWqTXEsHKNTI%2BypK8254vKnT33YA5W%2BkScGj%2F5hkQGiwie62jYeeJjFhu95rxssW8yLayrYn%2FSeOtjCslorOBjqkAaMKErem4O78GzP%2B2BV0dVdwD4kfBvno7DQceDnFXfvzb4OFs9%2Bn%2FXrFzIFYlf32ayY46shntkP3Ao2v02jU%2FL6nUkLtUITuRtySDrkfKiPz%2BRR5AGWiod8HkoAr%2BE9SbwPoJyMfcu79nxEJrCgbUpOr9Y8X8wYPOlT09fIIUaPLG6H2e2PNUCz%2FE98OK41Yv%2FrItZJ9g%2FLA%2BXieRjJl%2FosiC7qE&X-Amz-Signature=8c787594f0b3656db233da1939fbc9ab04ac51544ba6c8f80297aec3d0255768&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656RMUMEE%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG1Pk2RtaxNP5j6orxO9UQmBHfPjnt2x59HNYnxAONmiAiAsLjw8TzkyIxyNvplfZ8MlTjKqottru5TLJWntP5ls6CqIBAiW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXZY4Gf7fWCe83Ir%2BKtwDu6Q8zaIxzMiH6p58%2FJDGxxG7u%2BcGBKIuR%2F8ulCCgtxO%2FqQWcI6%2FtclInoIGWM8xD%2FiKzK7%2BL2iKNj%2Fo%2FkPq0%2FtTT9zFfhVaZUtsNaQXUjx326PRD48E4nFD%2BushEot19nmSrPu2%2FLSoEyPBBduRFX3oXBh1mRKmFe7%2BgXkr48qDGQkz5%2BLDhTDEI%2By6HyD4bHcQ01cnwqU8sXym9eY2DC4NyZhaeBmN99X4tbQb%2FvAPKvbgKaNptYNJ%2F1rvti3QZxMzswBmyAQkttSHsYp%2BThh3kxBtrJIDpTk9fZZwwV4akNvsXWvPyxBU4U1gAVg%2FynaO1FJTSf%2FuH%2FsqjuWiv3AtheMCP%2B6B6JzDdZrqZmb3NL1cEWdmW1ufOaMKW1iS0rVMUHBMehyxRheY9d8%2BL8sumYzW%2FQSf08J87uPyvTN%2BTrpgUK62m8JWxNO1G%2FwemipBoqSz%2FWoRUsmUJZvy4CP6%2FEKw1lszvQR2lWIHaFFZtp7893ojjDtxMbE9d55Ps%2FKiQLi1b39bCvgCVkbgIvviJkPDulRPz1Ur1Q0zHTRHnMYQdUZXypCaaZ8XTdf1F0hQDawdHT%2FYzsg2%2BoW1GWaZkS%2FPWIDepUilOzZ1gFe1Nq%2BYv4SX236nLffAw1ZeKzgY6pgEnqq43DIl0HU7aoh8fuuDaWeGS6YT2dji%2Fkmyv9f0L4zmN36xs2HVKzKHY2jOHdaHvVc23yXP0eZ6mPU98kH8UMrQ5%2F0UUs59ZOVkqy%2Fpy4lJoOHYqxRCwamP0AV6e0npbMkOhkfwKVm3XeK%2FU%2B7hAU%2BzMJH%2FrvAhEzJp%2BaTYyaWFYPkwIjB9YZsOFo8oFuNggmURrfssBsp%2BiElCkGpYRZz1PjiG8&X-Amz-Signature=9d8b0d5966bc82094888b944bdfff89275c7b9e205eee51933e2765dd302cc87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBHZQ45C%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXOFtAb2Y8oVjtfLMEFBwRE4U7MI11VpU%2BDqf4rqj1%2FwIhAP0gHbLMswqq%2BVNszWyCHScZOKC27natLZivaxCppPhxKogECJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz4B9mSEyV6JlILtDQq3AMQbSBlK6q5UqktPLEswthYCtsMNqDYwIXA8A%2ByvsJvbX1uceHOC4aOtiehVpJUogY9d0CsLj64rhF635Cj2iUL82bk8yKe051j4NS8lHE2YwvbfQH%2FG5XhJyqW0XOIADLDta6%2B6OrFqyumedvhHZiu4wdGi3%2FJHNiz0hT%2BXPc3L5C3yIRtAAP7XZ3L2DCyDYBSKUF0oI5e6oC42ET%2FoQG8GaABTrBlwGru4oRY1k8WkxPt%2FcoS0Nz9Id9uS8KTETYFJOTiHSMHtOaygSSWjTUV8yLMN1G0cAwNpFlZHgSm6E6cmSEZiBxjXDO9f4L3EgWYCLxS0eArByoSWO50Irkp%2B5NkiIH%2FlE3YxGVx2yCB%2FjLbJktSQ9ybYsaNt2gDfHTbmFH6e2Oz6k1C5lj6ZF85x4xzaY7vPuVcZLVxvG52D8qUYNGkwEGro21j9%2B%2B1vNbBi%2BnWbB0FM4q1QTyu%2BTGB0a7Cf4m1d6aOM8GDLzIce7hFEyX%2FJLQ7jukqcNSr7bbVD%2Bpuj%2BjuUA%2BxPHim2aGvsRTGkrJ0QIemMxdGBH31fBGRkcs95%2B1SufGeBa5XqZBjUgsdnqGVLRcZNMDFM2quy9UOpXEhyEpM%2BV6wOey62BiHkzSTwSLETiiN9DDxlYrOBjqkAR2k%2BziLSu8wQ2YXQZkcY%2FI%2B2mNOqApWnG5b7qv0nM3vhQMBeOnHZoPiAwjat7poXp59p8ejnwFxMbXGAY5E5DBGtLt0Z7sWY7cQFxGIiCFyksYjksHdh9Vl6noQBmWnC6h6JYwSHca52%2BuNCtGesitYA0HSrsutCqfu0tl2IQUJxAtszuxOQftojszlCnePFhimso8RVMHKaZtGX9HI%2BVq0oEun&X-Amz-Signature=0eba5085a1227f4d0dcc22b56ab49ea352b24b101f1ef2558d9310431c6bf18b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBHZQ45C%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXOFtAb2Y8oVjtfLMEFBwRE4U7MI11VpU%2BDqf4rqj1%2FwIhAP0gHbLMswqq%2BVNszWyCHScZOKC27natLZivaxCppPhxKogECJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz4B9mSEyV6JlILtDQq3AMQbSBlK6q5UqktPLEswthYCtsMNqDYwIXA8A%2ByvsJvbX1uceHOC4aOtiehVpJUogY9d0CsLj64rhF635Cj2iUL82bk8yKe051j4NS8lHE2YwvbfQH%2FG5XhJyqW0XOIADLDta6%2B6OrFqyumedvhHZiu4wdGi3%2FJHNiz0hT%2BXPc3L5C3yIRtAAP7XZ3L2DCyDYBSKUF0oI5e6oC42ET%2FoQG8GaABTrBlwGru4oRY1k8WkxPt%2FcoS0Nz9Id9uS8KTETYFJOTiHSMHtOaygSSWjTUV8yLMN1G0cAwNpFlZHgSm6E6cmSEZiBxjXDO9f4L3EgWYCLxS0eArByoSWO50Irkp%2B5NkiIH%2FlE3YxGVx2yCB%2FjLbJktSQ9ybYsaNt2gDfHTbmFH6e2Oz6k1C5lj6ZF85x4xzaY7vPuVcZLVxvG52D8qUYNGkwEGro21j9%2B%2B1vNbBi%2BnWbB0FM4q1QTyu%2BTGB0a7Cf4m1d6aOM8GDLzIce7hFEyX%2FJLQ7jukqcNSr7bbVD%2Bpuj%2BjuUA%2BxPHim2aGvsRTGkrJ0QIemMxdGBH31fBGRkcs95%2B1SufGeBa5XqZBjUgsdnqGVLRcZNMDFM2quy9UOpXEhyEpM%2BV6wOey62BiHkzSTwSLETiiN9DDxlYrOBjqkAR2k%2BziLSu8wQ2YXQZkcY%2FI%2B2mNOqApWnG5b7qv0nM3vhQMBeOnHZoPiAwjat7poXp59p8ejnwFxMbXGAY5E5DBGtLt0Z7sWY7cQFxGIiCFyksYjksHdh9Vl6noQBmWnC6h6JYwSHca52%2BuNCtGesitYA0HSrsutCqfu0tl2IQUJxAtszuxOQftojszlCnePFhimso8RVMHKaZtGX9HI%2BVq0oEun&X-Amz-Signature=1ebe8711e9f49f4e1ab44679eeee5b57ead4a3abb19c42ae531a4bdca141508c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSNAXQ4P%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDP2jGSoJ9Cynz%2BkdOO7MUs%2BXNKqUwRu8OEWoMKXjtxkAiEAhAbCUaD3WC7AKMUp0gaELgajPOh77KEbUzYY1MzWvfEqiAQIlv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIyEmC0CKYgqIUgUACrcA4CJ17pmAYV0J1C7qCBRMQ0RQA4OD2gtB7eS46lbdtd28KOn3a7%2Bjmpsu1ME3GhX%2FpsIfvlRLLgC9i%2BFVaDQCsVT2sApcvMX58nMIVatA%2FWvsD52aIYMh9EnbYR49h%2F4n9ck2ffFcU19NpXceZEHfjCNRhxkC5KnkA3vP43gqjjUZW%2F%2BNhtD7Gjn61g5D36zyds36UHd68oS%2FaDjkQZyETKNJBLbXVXnttpZwwKZmgk%2BtVuqBYiH%2BKDTL6ap%2B7fOSwIlD08hlg9GhRZv3bIEraH%2Ftjoy4ZtSi2yAsc%2FpjfVBnuf0T56F7uQXMKYNPH%2FnLH9j%2BALhhlhEcPak71tg5sqU2TQFYjkgt9wpTZvuZI%2BG9wp47zqFfBk6YaeO8WmNYDXWlxcBLhsUqusW6DcD9Wr6h5iGX5KAO3R%2BC4%2FPtY3I4C3KkrBcfsA5S11O%2BeKqtoWDFPF7Xbeiyyd9OGbBlSIv%2Bn%2B4fcWp5YYAqhcFJNyTZ56KG10%2BFtkvyvSjcrGXK2JKn5wPHyqYLf%2BFWI7q7CYi7Z5C7dttGbnC8T8RMFWRGhzardYqkTcT%2Bqf9Gef9ubeXosIWVY5rVf5EOo4rH00ZHMqEdAxhH5kUrMqDcfZRNcyUrJCTbXllg1ktMJ2Wis4GOqUBWff2hRVaAHZSXo%2BUmN2zGXh5jgIpUVFB%2F%2Byk7Ec9YUSbgtfozghRtbtLIYoIp7uzYlb3pVcWYxDsZT2UfU1hQcKo8nJtS%2BPbk5kCFQXU8c58OdKYxsWl3VllyDhwK%2Bkm17FLn3l7WN8Ot6Z9S8%2FGf8dadxkSXQGhYA3CTo8OFHLimIZXiSdpFm8D5pGH026ElBH5gvWrTDIaqvgwpox10QQE%2BS%2Fx&X-Amz-Signature=d4936a518b2560cfd856882b440eefada6fbdd3613bf9d6b787309593c0b4a6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UC2363L5%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCeQdXSO%2BewUIevbUaMHhRg6zFOm%2FMjm%2B3t5aLipzYUYwIhAMUADOOxre90pxZh%2Bwbblnv%2FJ%2FWPOpFA3xjcvuHWOsO6KogECJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwwp3gbuj0F%2FsXlFuUq3AOm4XhsnV9kiLZLdabZEBpz14TopFthJTf3yFe3%2FH5s4XQ9Xzpo0ykpW12KooO7tEcmykIY%2B1Xt8ic5T34J50%2F3qzYC7OjN3gJJV0oqDU6yBINiHwZCNLycZBpgDAcURU1ZlKSuW37p3D6KebIIM8s7Y2Y5rMLInNRt9dyV9%2BZ9BTaYxgMOn7I4r59JZyaDyVEUaDM0l31WdaKLO75PTaTLvi%2FVU%2B0QNkIR5ShsiNI7ZiZcaMkOs1DIol4aMu9RY7pfXIaRxCTadPI6zkicGAEr1EAqQo6WaNIJ7jkereP%2BJWaRkEoyxLRGIrWaDgtC8uyrC%2FlaeWl8uO7sE%2BCXdN%2F4RoaytYbBBuk6oTQ%2BjdBXoi6%2FeBsAX9GkSmLtdSf4orm9L6pPnsZLzQWr%2FLyfexkreWA8JM0PSW6teYOfUEwWpNuLXn0lgVVYucwXdBQBFLd99nQRMFisk92D6CjN1ekZi5r0TxpZIdCQLgZZFp3%2Fy1KGVK1ra3qQh2lm%2FN%2FRrow%2F8NOGmt07QwP0Zh2tFCHIMTwDMyrx9DuogW7PBDBgRWiHCuh5AFh7wmoP03ZavFoAVOdVQP1oeQmFYk1CybYPBY4bTehsNw11LknETTn69wg5xzVhCIKuTm69%2FTDslYrOBjqkAdMSFskvnRfzIbzew7T0g3cfwQYHJwhYXf29vLtYvDMZeGPhvCrzds7RI1%2B4W3z5WIZ9jFCszkTEIWbhoRfkZCmc1MAjAEmcDswy%2Bp0%2F7o3NHyWgLF3EYo4jmG4saN1sJbq9ogpZlA6eEnmyEQzFDjmj00b4%2FkW25Hi8DQDDUfsYqmT6ILvEdAvcCFA2v1s1y5xVLtxFCHbKdy1820l43ok2yqFG&X-Amz-Signature=f5c8c7312f3661761559007ffe9c86723190bb73615e481cb2dcca80eff37b03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UC2363L5%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCeQdXSO%2BewUIevbUaMHhRg6zFOm%2FMjm%2B3t5aLipzYUYwIhAMUADOOxre90pxZh%2Bwbblnv%2FJ%2FWPOpFA3xjcvuHWOsO6KogECJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwwp3gbuj0F%2FsXlFuUq3AOm4XhsnV9kiLZLdabZEBpz14TopFthJTf3yFe3%2FH5s4XQ9Xzpo0ykpW12KooO7tEcmykIY%2B1Xt8ic5T34J50%2F3qzYC7OjN3gJJV0oqDU6yBINiHwZCNLycZBpgDAcURU1ZlKSuW37p3D6KebIIM8s7Y2Y5rMLInNRt9dyV9%2BZ9BTaYxgMOn7I4r59JZyaDyVEUaDM0l31WdaKLO75PTaTLvi%2FVU%2B0QNkIR5ShsiNI7ZiZcaMkOs1DIol4aMu9RY7pfXIaRxCTadPI6zkicGAEr1EAqQo6WaNIJ7jkereP%2BJWaRkEoyxLRGIrWaDgtC8uyrC%2FlaeWl8uO7sE%2BCXdN%2F4RoaytYbBBuk6oTQ%2BjdBXoi6%2FeBsAX9GkSmLtdSf4orm9L6pPnsZLzQWr%2FLyfexkreWA8JM0PSW6teYOfUEwWpNuLXn0lgVVYucwXdBQBFLd99nQRMFisk92D6CjN1ekZi5r0TxpZIdCQLgZZFp3%2Fy1KGVK1ra3qQh2lm%2FN%2FRrow%2F8NOGmt07QwP0Zh2tFCHIMTwDMyrx9DuogW7PBDBgRWiHCuh5AFh7wmoP03ZavFoAVOdVQP1oeQmFYk1CybYPBY4bTehsNw11LknETTn69wg5xzVhCIKuTm69%2FTDslYrOBjqkAdMSFskvnRfzIbzew7T0g3cfwQYHJwhYXf29vLtYvDMZeGPhvCrzds7RI1%2B4W3z5WIZ9jFCszkTEIWbhoRfkZCmc1MAjAEmcDswy%2Bp0%2F7o3NHyWgLF3EYo4jmG4saN1sJbq9ogpZlA6eEnmyEQzFDjmj00b4%2FkW25Hi8DQDDUfsYqmT6ILvEdAvcCFA2v1s1y5xVLtxFCHbKdy1820l43ok2yqFG&X-Amz-Signature=f5c8c7312f3661761559007ffe9c86723190bb73615e481cb2dcca80eff37b03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI26IPJV%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T140929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBj3r3WSzPB1xBNX4hZB8oyOVhlQVnCGSKatWA3rwhZ0AiEAhGAMVJKJ1TkR1yu0DRP2ro4U7mAiUo4SzhKQw%2BH96%2BoqiAQIlv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPexkjNRZVh5r3OTxyrcAw2yGzSbujCd4SNAqCHqzFwb%2FtTiEFg%2BMM4m3zahciIWf0YF%2B2FPNYRrsbcx7B%2BSzH6zWt%2FVEuljTR4rtM037AzzeVcPQZir15cWdKlX%2BZ4U2%2Fz3eF4HxbazYX2BIhgaVPgEa0vO5ZuWNshkvj9bKFjgZGw3Lnyo0ixSLtIcIkZKouP%2B3bFKGJNdqH0AFfFIXim4dt8FQPiHj7cSuTdy%2B%2FeBGKCiSQv6tnf3BOH%2BtDIaq6L471bWlY3qMhh4rA6PgRTn9G61EvKi%2FsLJSrAt2E4LhUwLHTafWEKCtH38b0UWZFC69wP6ObFhmr4Fuhr2nfRnW%2BkHpG595MzQSMcknr3%2B57YTCiKwqvSIAYpoalIRujJL0A4M%2BTR8I9MEAzRV%2BWaVlbb9SoTJmx2N3Oe1pzMG3bHBRPhcKmVfqXmunFtDUMGysK8ypcqK5zQFJ7wHSPzSDjf%2BaCvL6FyC03h5rgQzwWqdh4fHedWonk0g2JnSJVlozzftQBf3MygV3pK1OcjXEVCs%2BbjN503dKhlYQaqeuQCuFV4HP2SUYBWM2dUoVgXBbKK6xp8mXZLbdrBv7Eh2JZ5wIwOqtuEPt1l%2B2Cb5IR8uVk3nv0E0jOTbhGYPSNkqQ3ls9aQUvbt1MLyWis4GOqUBKgw5j60yNseRcA%2Fi%2FM9V6cNFFgyAr9EIX8C24oRp36HReLA41JxUIyuk3K4Y1XE0Y8aer0J%2BxW9ptt0Of00KqCzY6QoPrng8BCWt3XzRn3zdfUsvYgYDNekkutHxwW%2F5MXYytaBdeCLZSUirg67j9IdlJdj2nVKz7OezGOQoqw5NlgtmK6X5O7pcTyT%2BF9TVmfkOJyh8dOxWBV5ZR6bC1i%2B%2BuOw2&X-Amz-Signature=eae7db09942bd6ee7e5f4b5064170a3196fc93c5901dfa8575ba6998649444ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

