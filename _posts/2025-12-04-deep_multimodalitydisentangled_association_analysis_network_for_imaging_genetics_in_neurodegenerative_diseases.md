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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZI7T4YX%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIHa%2FYCpSkxd2wh%2FMsoqv4f19jWI2o6WyIdKXYXsEnAxcAiEAnDwUYx4xgS0zWBCduAGqscHlZ9TfPnO1SPm2xvRwFgAq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDHv1gDHSPKGLkl459ircAw%2BxHpb4CjFWjW8YkxD%2BYsKO87OJ3CSo%2FZdMG%2BhhunH3gZSFnetWUBehevWpgcD0ILpcQanFXIZ8aLf4EA3q0ZGFCpBpCLgQbhquSX420wJ62OvvFcc7gg8ng5%2F5Al17QU7%2BrOJeHrJ2lg2JGbJ%2Fp5TCmlYM6YrPBR44Vy%2FlZqffbKDETVnVPyFXClRE%2BbQxpeBCKB1ZfGBzYSgfph4Rh6V4%2Fp3NlNk2zlNYB2K8AOvtveBpHSwl5fYP8N43ArYNvzWNHbaTRCL7LWaBop1BA3aQ2RnrBNBU6W1QRtyCv%2BY2Ri3AvlAByM%2BgPpsrZDmu60RJu%2F%2BYzOL1E%2FAhay5Y6TBIaQt%2B91pI9fujECMsVc94MzJ9bDHR5%2BbKZ2Tfs7dF3MsAb3rEZcCKTdphfKDjutPDi9bfR2tNK1dOp1%2Bx5QWmnodirtVeckvmPIvyhudQggRPKLVZyNI9G59RxLbM2EN6wwJB96bGnTytO92BiLLncYULkCq%2BdFd0eELlrbbZyjeIrNcUg9LqYkCuTOkih0Yzg%2BPZpXkBeQZ3pFv7u%2FIB4PfwHaI4JJxwaHhUrjhbultyZ81T%2FA%2FvxDucNSmqnxwyh%2BE8h2H9UOFVmxo%2BsztWk19uCmIgizhEmKJmMIrs2MsGOqUBM3rdGuvnsnRo124cgYNK%2Fy66JbHWKPJKH5KjwYC988BEbgfTujLfXUO5Sle8UodfiDs5kACJiCCPVnRGabDlqF3YmCllTYW43jNTcCYrF%2BQbuVq8Roh9SkDwcwo7DWANToYGkf%2FMdbubcqdCVFPWPa%2BXLlkBs3Z0gRR1oQfs487MEDsYVbt%2BoRkhuFTnmADZiNaM6CC36tQWhTUotPjcgKpI54n5&X-Amz-Signature=a61663fdf2d406f7b2d2f19440934be3bf8db54c1c17eaf8f6d94407693c48c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZI7T4YX%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIHa%2FYCpSkxd2wh%2FMsoqv4f19jWI2o6WyIdKXYXsEnAxcAiEAnDwUYx4xgS0zWBCduAGqscHlZ9TfPnO1SPm2xvRwFgAq%2FwMIKRAAGgw2Mzc0MjMxODM4MDUiDHv1gDHSPKGLkl459ircAw%2BxHpb4CjFWjW8YkxD%2BYsKO87OJ3CSo%2FZdMG%2BhhunH3gZSFnetWUBehevWpgcD0ILpcQanFXIZ8aLf4EA3q0ZGFCpBpCLgQbhquSX420wJ62OvvFcc7gg8ng5%2F5Al17QU7%2BrOJeHrJ2lg2JGbJ%2Fp5TCmlYM6YrPBR44Vy%2FlZqffbKDETVnVPyFXClRE%2BbQxpeBCKB1ZfGBzYSgfph4Rh6V4%2Fp3NlNk2zlNYB2K8AOvtveBpHSwl5fYP8N43ArYNvzWNHbaTRCL7LWaBop1BA3aQ2RnrBNBU6W1QRtyCv%2BY2Ri3AvlAByM%2BgPpsrZDmu60RJu%2F%2BYzOL1E%2FAhay5Y6TBIaQt%2B91pI9fujECMsVc94MzJ9bDHR5%2BbKZ2Tfs7dF3MsAb3rEZcCKTdphfKDjutPDi9bfR2tNK1dOp1%2Bx5QWmnodirtVeckvmPIvyhudQggRPKLVZyNI9G59RxLbM2EN6wwJB96bGnTytO92BiLLncYULkCq%2BdFd0eELlrbbZyjeIrNcUg9LqYkCuTOkih0Yzg%2BPZpXkBeQZ3pFv7u%2FIB4PfwHaI4JJxwaHhUrjhbultyZ81T%2FA%2FvxDucNSmqnxwyh%2BE8h2H9UOFVmxo%2BsztWk19uCmIgizhEmKJmMIrs2MsGOqUBM3rdGuvnsnRo124cgYNK%2Fy66JbHWKPJKH5KjwYC988BEbgfTujLfXUO5Sle8UodfiDs5kACJiCCPVnRGabDlqF3YmCllTYW43jNTcCYrF%2BQbuVq8Roh9SkDwcwo7DWANToYGkf%2FMdbubcqdCVFPWPa%2BXLlkBs3Z0gRR1oQfs487MEDsYVbt%2BoRkhuFTnmADZiNaM6CC36tQWhTUotPjcgKpI54n5&X-Amz-Signature=a61663fdf2d406f7b2d2f19440934be3bf8db54c1c17eaf8f6d94407693c48c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKR76SQJ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIBN4a3SClrlkw0W6KEYnHdLMtEqUs%2BdHWTB9tiv2TvQnAiBsXiIt3qXk0IpT3YZygtmmTe7DNtTtMuRLBgaPi%2FQ%2F0Cr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM8ADn9p7cXx5y37qUKtwDl83X0TdyjKq3IH50kIXreIDYTj%2BvipvT8t7FBEh84QoGTSUTTBKlfZjYkzz55Ghk2%2BfjA9mftpS8Ca3CtU6JmsvhzKlqBvvWczq%2FgXadDCUJzW3Hii0%2Bc6jYZuO8qLE9Z0Sg%2FrimRizeOB43f6ZERCE5BnlFzRfGrut6JJk%2BZ64NAddKCbo%2BTq%2BK1k5RnW59%2FRKeENExtK2SEaeVOgCYTLwvcCNF6u%2FFXn9x2%2BwTCsQuVRHXING0pfq3d6Uj49mmbJ%2F3J28w3x%2B9I5iV2m5aMJQRHCQxUldhTdUJ3JH4wn1vnoPKPladC0XauEWX2XVxLndjHNiboOYFu7SAmFTegeVvdE8XHfzb9vBRSEX3LehoLVIlWo1y3UaL87keW5xE1k3svDIwFgpWszQg3wuNqL%2FyE4I5uGsH%2B8LDkZ8fS08ScBmRqGKJ1dlYkgHBSf%2Foy3UAFfJiSCItT%2FWh627z93VaYZ0n5%2F6kZS5fEiYMEjvl26wRC5Z%2BYiZch8CJJrYXYgBmzheRNBCQA9UWjWXtTeKDOBZqclGLuUB8rCbpu9iFW%2FxD0UUJJLBxJouM5FsRpPwYrmb1BMxn9lO6rfZo%2Fb6Qz%2FvoXwharvPkhR73rCgkBhHjxf5JaJ9KCO0w1eXYywY6pgGl8%2FVy2hJZ4QfFU0q%2BAxvOQPVGebRRhY4uvnpzG%2BCYejDv4am9s4HZZT9fb%2FbcnHwW2Pq%2B1PHNoOElK1yJ916wvhBkCeEJPiER9A3X4KRdtoTb%2BWC%2BNnf0NXoWkH3pGZybKb9rPXklRoY1InXWa%2FgtphFIEKz7gzS5klajeHJnQ181T0T85v4Cp0SAC7sJyGg1jesPCsxyON%2Fprn2vH8%2Bo52o61csM&X-Amz-Signature=e74f7c4169a0a5a2ef9f9455d79a0ce22ef22b8ca8dea6a3409474f08f2222ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OX4LWRG%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJFMEMCH0Zx6eyQMiidmn3%2Fj5JWGpRLBL5Com%2BfKTA1VFfNLoUCIB0lIWlBgsvJmKRZg%2FnRGWeCddhbtP3dVVFhkM%2BXO1vGKv8DCCkQABoMNjM3NDIzMTgzODA1Igy5g2L4VrUgjCpSZJoq3AMXEtesWgewiUaTGbpAMkHtBVbYsHv0uZ6yUrmnHOMeQ2OAF%2BPlwM0J0RzYwQZkLXhR%2FJikc41hOClZiOrVCXzI%2F5WQ13SOn34GfSPsRpKL%2Fj26tKYkscxxW6R5L5nwZw9AlqrBYSbB2jvptfL7GkvQfJD5x2uZlMAah7aDp0CTJrdQLTHUmuo324pCLwIv20f7qF%2FtSL5BB9l0iK49Ook6j%2F7zjVqBfBmmz5n50yBgqfz1meo%2FH%2FSHodKslZXoK30UohOFm8HmbL7anLm1TCxMMy46K1n2EQJAvF%2FwYkGMy5eqsk%2F4qoBgIiCTNqYmRcEitunB7BkL5xbNNaT%2BTIu6XpB%2BN9cnJb8c3gB2euYrO9omgxjGRqAsicwvIwpgOh1IO2TMtp1vGOiHWNXoWZNkLs6x7qFAPRgQG%2BR%2F7cnh8JcR%2Fmf1vjdvIR1Y2fwSaGcMJ%2FHLC4FDqW4zWeRoE3H6TNPcVNj%2FIbS1Q6iqmSNG3ZOKK5%2F9SXaI2SsmclneJ8MTR2NpWKNBQAWZ2Bj4%2BHwk6%2B6QCb9xCDVQWTelpTuSidt3Ijx2B80DgyNLQZHFMlnsUKJ3yZO0BwOav2e3pnG8gTS5Bq11IvxhzP3wj%2FQQp%2FT60pCpIzyAbV%2BBdzC27djLBjqnAUBM2dujRal8voGJusiTCRQ3hJaiDYumAN4dVHlHq1aWFH7rSOn%2BVFtny6iV0ZcksXGWJr34LmW%2BMSZaVMsXqcsDKqvfpMVnkoxT%2FHv24LTiC4efIUcpApInfw8Wxdq0S%2F5v4CzObm885vI82pgbujAh2IKh4gFk15t4ARVbyC1AT1m9csZXfgqH3lnZ7w%2Bw2TzO2TAcQ99jsHKxN%2Bj7ZCjeF8uHTjaO&X-Amz-Signature=eb157c1f29036566dae185068a0f55dd9acdfd7ea557c646ce544204f1c162bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663OX4LWRG%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJFMEMCH0Zx6eyQMiidmn3%2Fj5JWGpRLBL5Com%2BfKTA1VFfNLoUCIB0lIWlBgsvJmKRZg%2FnRGWeCddhbtP3dVVFhkM%2BXO1vGKv8DCCkQABoMNjM3NDIzMTgzODA1Igy5g2L4VrUgjCpSZJoq3AMXEtesWgewiUaTGbpAMkHtBVbYsHv0uZ6yUrmnHOMeQ2OAF%2BPlwM0J0RzYwQZkLXhR%2FJikc41hOClZiOrVCXzI%2F5WQ13SOn34GfSPsRpKL%2Fj26tKYkscxxW6R5L5nwZw9AlqrBYSbB2jvptfL7GkvQfJD5x2uZlMAah7aDp0CTJrdQLTHUmuo324pCLwIv20f7qF%2FtSL5BB9l0iK49Ook6j%2F7zjVqBfBmmz5n50yBgqfz1meo%2FH%2FSHodKslZXoK30UohOFm8HmbL7anLm1TCxMMy46K1n2EQJAvF%2FwYkGMy5eqsk%2F4qoBgIiCTNqYmRcEitunB7BkL5xbNNaT%2BTIu6XpB%2BN9cnJb8c3gB2euYrO9omgxjGRqAsicwvIwpgOh1IO2TMtp1vGOiHWNXoWZNkLs6x7qFAPRgQG%2BR%2F7cnh8JcR%2Fmf1vjdvIR1Y2fwSaGcMJ%2FHLC4FDqW4zWeRoE3H6TNPcVNj%2FIbS1Q6iqmSNG3ZOKK5%2F9SXaI2SsmclneJ8MTR2NpWKNBQAWZ2Bj4%2BHwk6%2B6QCb9xCDVQWTelpTuSidt3Ijx2B80DgyNLQZHFMlnsUKJ3yZO0BwOav2e3pnG8gTS5Bq11IvxhzP3wj%2FQQp%2FT60pCpIzyAbV%2BBdzC27djLBjqnAUBM2dujRal8voGJusiTCRQ3hJaiDYumAN4dVHlHq1aWFH7rSOn%2BVFtny6iV0ZcksXGWJr34LmW%2BMSZaVMsXqcsDKqvfpMVnkoxT%2FHv24LTiC4efIUcpApInfw8Wxdq0S%2F5v4CzObm885vI82pgbujAh2IKh4gFk15t4ARVbyC1AT1m9csZXfgqH3lnZ7w%2Bw2TzO2TAcQ99jsHKxN%2Bj7ZCjeF8uHTjaO&X-Amz-Signature=d8a7347c2b3775b66c8769f53a2e479c9beca3ee634dcc69ab3a9b471aecfeff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6F5O6NH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIGh0pV6SW4smkGRCo%2BJRmJvsZY5SnDTo752JNWUTqnV9AiBHFwna4Wp45shevYWO%2BS3e19oU10%2FSSSgadgww%2FxMzfir%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMz9HFjBs2JqBDBbAgKtwDhDU3NbIORxc6I7IUtDFzNUhvF3BsucHzttnVjhzeUm6v5owhl%2Big%2Fs1bTDMSauMT45ryIoYJ6Q9B6MiNAhvm6rDrTVVKADCSQD6TD0B%2BwHCK28UEWKInppoNr6oH6IYZj6fJJG9nFDcMXHgD6aZ10yACVIVDBSrvBVvZXCJU%2FI2cyS6q4anlnpTMF6%2BRaQ2OUi8p19kofwmKjETNLSyBsvaKfnoEKXdsmy2kNagNDZr51IlbYCx%2FGokisD4SLeR8mBO5ecis82w09Lp0WzjYhR%2BBk1RP5YuRGj1TRu9Gewkc89Pmsh%2BcYSekxFXcQYLDbfoMDcJ9Qs3N9ToWOYfU7Wv2cgWzWeCK57nUnmyCkRhtGG3S4eYuNOD%2BliJVCVAkg5riWGlE7%2Fn65z05%2F4Gc3y0O2x3tgPO2xulwrYeKFVDraq1jqMAV1jqtGFZhvhXmVue8KY7LzVmMKi5V4bY0hcfaDoV3q4byLG5hE%2F6AdO2CUaQ7Zbza4Vui1AkWuAHvz9T018Hu4sRix8IG2ClVKzLNm6gBSElldg2DSrLQtHdLgC8AX1CKfY%2BN5LF54Uatib%2FY5ypa%2BxX6L0dH9HlWIrQZuZQZ%2Fn%2F9O9XPEtPX4QuqA07vYexT46LcKjIw8OTYywY6pgHPrY7x7xq61NCxUmS%2F4tPPrn2mi56aoQFxYHkOa11tKeO4hWZ2SzIdBJAMCMB0uPDQtUrd6qs86nXd4iARfFtli%2Ba6b3N63T3hKU3UNGMqDOjnQnp46Z9Vwrx6P0iywo6YbRku%2FLaczZQgdasYngRMnpOCpEN%2BanQijowwGfmfuaVd7s03Ss8HKA5Jg9%2FS%2FF%2BHD3WzzUUWyowZY5PfHrmJrzJ5sc9V&X-Amz-Signature=de38b9c4563366746cd318f5e232d21e27da94e354c382cfa6f8a49fcfe9df9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LESZ2XK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCICzqH5KxDSLGbcUX0wslaC1G%2BMRSXWc310LSiRweqnMWAiAYc4OutEYKvORKviwwM6gjkHOZ36ZkcKDPxdHhjpgSAir%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMOoQsiivEH7aBvKyfKtwDDIxYFBvWTvU6eK7Wtz7VFyX%2FoTHM0mS62aMHgJb6JeHetpmyV1Kl9%2BYrtUFoDapBsWiDfsJIW6VnClrtq9i8FJPiHmK%2FMDcNpuae3vt7zRQGyVoiTzPN1gJbIuzdzxfXRoxtOOvVlhI8owu8MRdHGdICJrvfT4J6bpCHbWHRHeHA6sDRY%2B5Wh%2BfWb1e2rvQpFPYC%2FTNuPDWLMrCAikIV0juTfSeqciiy80EDIHCssnpUGFq5hNhN5D1wBQAj7Fxbtwh%2F033PwvAgppZlnIuRopSiDJHlUR0gcQ%2F7euqhlClK%2BKdRaQdqYiw0Gi1l5%2BFzzIBqEAeq7WOyf6YrOQDIAQtzZBTcITZO8waHHqV10ltnpgQwH4BMYmYMYoY5iN%2FQzhGhVAiXI3C9WLO2meNGh9WCxeXAhVWm44eQoOqu3dIKc%2FPYrzo7V74HMBQOu9OpA4LRPCQRcyVaoMaYXEYVCli0WKuyi3%2F2QIBkJNBjkb3zwoEjapuRvP4PifU%2FyxBnLL0DjrdFbIwaNp%2BtPWi6QQSPbqMY4yP6v17Epn1FmeLyh2pxrvQycHh6qj%2FwNNACPAwOEZFe%2FxHl9lVC2L6xeAxUaAD4ah6gqO15f5g7SJ0lobA8RaXEA%2FQpOP8w5%2BjYywY6pgFBmqPnNkuXGvdaWaDVlA0VFlLU6rkcEBCo7M1uPrZ2NCP3DjJR0ELS59flAWIG1ayksALsJR8pW%2F2s2%2FmZwQA4ziJjMFh6N3vtBDfd%2B1FU9atHYwYnaFHBk%2Bc6vza%2BCnmOeKh20kSZZiNwmKFlPzWD%2FHKXWrNMYofW2LLnrZ7q8vwmf5J5eT%2FmD%2FoufNKtrP%2BCrOVlTRMzxK1vdZwOTIN1lJZgvXwu&X-Amz-Signature=9c95ae3aa41cf7155d4f214ef5ec808f9b0522b7338e6f2ea8c7f1636f2683b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3T63H2M%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIGcC7EpBTqtGyIOPBavAY8MFer97dTooii0sje6qWRRyAiEAn2wDKDjQhz%2FqrEcCIXY%2BJysu4fqdI5%2BZIi0CzCLsUdMq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDHhY4QExgzszVnF8dSrcA8uajOUiePaT2Km80%2FnM19iSZCKIanHLMfqTMcguRaZteUk9uc4O6G7iY6%2BoJlG9D%2BekhOhVC%2FqEsAbVW4Qeybe6Sm0ZxH0XpGgGwGQr13xYwGkiCYOP%2BUzyFE1cYXMA4a8jNOkDTiRYiphpCJbhN1oy27f1zVngmMObDXCNvYmXh1L0iydeKzPtORJ9KOY8N0cOTPbQxuDnvrTaiq%2BvWhJx%2BJd0d06RS30e4AMGsYh3SQo1b%2BRGdzSVJDG7Q6xxREeSxB%2BOMJjOWtrdzoAJqlDkEzxZYBOmybTa6EIc6ADdf1CB4gnr1fQsgAf4yYfTy2dXNzt4uBQRG8wfkAuwUDSWIVrtmS01NCLiLJgP78JgADdSOF0Ts81nqH1qpmZjxJoDZPHtSY6QHrN1ap%2B8peM21BSsTUe4HvwLLjjVobcxKDIJGzk78TK%2FINYUMHJUjBSFmyFbenINDW6HgvHc7xoE19ETWEcgGRXC6OSmM0h%2Fd8ZBLvjmLwTaApNclZD2WTxTCQ5nI3zzta9Id1vCOiC9jZ%2BWq8sMSXp1wU4dQh7uKVjqcGPOQQoZn0UeNSjEoQ2DdpuER7yD0%2FXwTM4W1nfYvSNVke5rzG1vE9w4KIK32lkAOWPqUT%2BYzYnFMPro2MsGOqUBmpqWd6OjqoMd%2FdJTLckqbcZJdHl6ZC%2B5QwQM3OKMquqVonGcED4ki3nS31P3WBmKTHPT5KTet8VHT0bqrSNkfMzet5QExlfpIm2ij35BKsmepyl5EZz5nopx2QGtasgkPIbm7Re3OWCHgXc%2B7OPJKnhDQtAYU3iH2pjvFac5VIdDB6P9GIbkzWx2Q8oSd4qS7gvpLs4SQLOlz6ABTRw3UmMiaLAV&X-Amz-Signature=c3ff58e6565566507fb7bbc4bc8fb8724a22564fab92bf8073e6b5e04ec72bf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGZFZMT3%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQCPHeV9du%2BZObEDJM8efToJH05oOwIbFrbXJ8XxTrAELQIhAKKMn2LDn98HGZkBQRe3%2BZ9w%2F2b2O%2FMxQCAvMSqZy27eKv8DCCkQABoMNjM3NDIzMTgzODA1Igx%2BGe7HYq%2Bf5j%2Besagq3AOdpV5rlxBhpcRuUtuUXLHOB6PTnbMag6mMz4iT%2FIJb7llseWCKRzBCnJrcO6%2BFoJtfA6ZqZB%2BmkkiPopncgs5sov54u1YCfyH4pqD2WgVPaUoJTCkk2l6Cbe7ZH5c9WNInK7xGC4Z6Bsa4fDDa5KVsTOcHq1VQLE0iI0XvmFRFjugYfynanQUh9Q2AHzW0OmUqm23Ow1xOxPiyiwr4pGBvsagjngC901YK%2BNv9zvVI4CnogDwXafmhutXUjqotdv0PWzC1Tv60R3R56g%2BN9p8meVSsLC3zpCyZPHEawbfOENMkSEyOcFLWOnIhe64DWJzll3Ckb2CWUguvBxZei3Ku8zYh5fmsOHxg4S3KSvLRbDdlTVHIoBs79PVg8NfF0hcPr1wqDDDQ%2FW59Nxc1IVVPgKAdVSsPguuON4x%2Fx4hPTIgAAH07YwaiivppJTy4Uq49cGCciKUbxw%2FJMCccDPbEI013w1QWnyyxZ73%2FqWXWf8tbVLTbfbTttNBaMCeZTBG0DgYt%2FJxy0GplWO44TrdLKh8eMEc7zTcjm1l4T6R5qx%2FRVBWt8LIVxinXxHYRTNTufN8fiTVfaBROZwGMJd4rBfoZFNoJmQ%2B5eCLww4oXxyi88UfL3K2bDEV2XTC37tjLBjqkAWFPeXHTjpPsOiYkjX%2BE%2FwGY7uxve36dgkq6tBqGI3NBbDRCYB2c1yl7SnZlm6%2FdB1x1vWVXKkzdcPyeRmGFWNaeyoGUAjGA3fmxBTmirknhm9BeS4XBk49zyCmEVoBq4F5X%2Bukpr3quNxAlFsdfPtKxKHnD64Kkq9vqz51HY4jf0INiA4U2vwwl%2FqvQWup2volFqNda3LLTPDHAtzRtzXrnmvGy&X-Amz-Signature=9e3d90a67783cf3c141bf63c5af5df67af77094e0d943f965c47e8e5f02244ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGZFZMT3%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJIMEYCIQCPHeV9du%2BZObEDJM8efToJH05oOwIbFrbXJ8XxTrAELQIhAKKMn2LDn98HGZkBQRe3%2BZ9w%2F2b2O%2FMxQCAvMSqZy27eKv8DCCkQABoMNjM3NDIzMTgzODA1Igx%2BGe7HYq%2Bf5j%2Besagq3AOdpV5rlxBhpcRuUtuUXLHOB6PTnbMag6mMz4iT%2FIJb7llseWCKRzBCnJrcO6%2BFoJtfA6ZqZB%2BmkkiPopncgs5sov54u1YCfyH4pqD2WgVPaUoJTCkk2l6Cbe7ZH5c9WNInK7xGC4Z6Bsa4fDDa5KVsTOcHq1VQLE0iI0XvmFRFjugYfynanQUh9Q2AHzW0OmUqm23Ow1xOxPiyiwr4pGBvsagjngC901YK%2BNv9zvVI4CnogDwXafmhutXUjqotdv0PWzC1Tv60R3R56g%2BN9p8meVSsLC3zpCyZPHEawbfOENMkSEyOcFLWOnIhe64DWJzll3Ckb2CWUguvBxZei3Ku8zYh5fmsOHxg4S3KSvLRbDdlTVHIoBs79PVg8NfF0hcPr1wqDDDQ%2FW59Nxc1IVVPgKAdVSsPguuON4x%2Fx4hPTIgAAH07YwaiivppJTy4Uq49cGCciKUbxw%2FJMCccDPbEI013w1QWnyyxZ73%2FqWXWf8tbVLTbfbTttNBaMCeZTBG0DgYt%2FJxy0GplWO44TrdLKh8eMEc7zTcjm1l4T6R5qx%2FRVBWt8LIVxinXxHYRTNTufN8fiTVfaBROZwGMJd4rBfoZFNoJmQ%2B5eCLww4oXxyi88UfL3K2bDEV2XTC37tjLBjqkAWFPeXHTjpPsOiYkjX%2BE%2FwGY7uxve36dgkq6tBqGI3NBbDRCYB2c1yl7SnZlm6%2FdB1x1vWVXKkzdcPyeRmGFWNaeyoGUAjGA3fmxBTmirknhm9BeS4XBk49zyCmEVoBq4F5X%2Bukpr3quNxAlFsdfPtKxKHnD64Kkq9vqz51HY4jf0INiA4U2vwwl%2FqvQWup2volFqNda3LLTPDHAtzRtzXrnmvGy&X-Amz-Signature=d634df14f7b8b77fa74dbef7e23ed17ec82c6589739f316eb03cb38be36f1fae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCWOGKUK%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIE3l8OZEsNS48hyC5uBhgHqn3cMBerIvM%2F4m68j0gZuLAiAXN3LHkXLZ6jfGopNGbh0Me3Wf6itCrmp4jMznYpp6lir%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMuudtbfe6jlNyYn8qKtwDSF2fLVKNUqtgxkKYe15m3f0esuAU7Nsme9N43jm4RusC6gF%2Fibh2jTucqZ8YzeIEeyREqriiIalesRO%2BjCa%2FpK0W%2BMBD%2B81IGMxPfymwOfqWuIlF6ONgvkj1hgb%2F%2BuT9aDumcLjqbgBoeocev91o8BaQMUm2cCUizjEDPfjkAZW5S2ADNOwYPtssW%2BwRY8GA7mvmLJY%2F28ul3Fa7EyER3qPhexhUYaxxmY84wzeRFmikloJyPJ1FWDgDL6odXT3DfS970dR2DAR7%2BotWEJ3LRLhtpPtBX9vpkfvY6F40u2dHeiw4dKUdUxzzr%2FQfMdxUre3el3DhLQsEMBkXUse7weO7wyMhckLYxALYvCHl%2BT9aKrDhVOZkOGA616%2FmJ%2FAO9Vh1xUWmeQXjUSjFOrlpAXvz5ume6VJzxFf7KSKsrckTRwG097WBY2LmrqV%2BRbtbKBuuVbdwmp%2FOSsqVM2pbPoV%2Bf19LOQtuNfcgbWjmZte4pOtAoV4xjuo1%2BUA7A9EUUBXvQTJs2q5lbx98qWK2gjguspgWiBG3UwTZ11dNDdBirQBchEDmxFFPcPaeeZJpPZFcmvqyYYtH914GlyAndk8QLLjFxy1rPrlRZ0j22aObQ9E%2FYZ11dETHTlcwkenYywY6pgGv2fuZDjbGr8lCprtoUx8qLLg2a17mwfIxaX%2Fn%2BW1FE%2ByMMTI1yLI64bc8Mwuevth0KVzxbj%2FxOXnhCFkPiiSGnzVme7ncKeI0qhYxflJhcPaRx9C%2Felqcp1LwY2xaql4oxOKSGA62hWpR3y8oQ0sv7wqf9wQ%2BjyHojao%2FYe5iMeGx%2BguHrt0Sd59oPd%2BVGxKBPer%2FOTkBoMZCtnDU24bpkoF%2Fij4b&X-Amz-Signature=0a1f8a7ac1b1852e10d7d4cafba6e5ffebb41209b558bef773a800adee370518&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UICXLPPB%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIE2a8GWU7dFxZiTAYJ6rn9hhKwoqabJPAg2dNLZKRnL4AiBwh%2FRO6R0cNz4HQ8LYVZ2IHeVZ%2FAbWEkKeAcHXjf9K8Sr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMAsyenaGriH1IE6%2FAKtwDHGT890P4C1NJrRzWOTRjz%2BGNzLOAxcjH6c9KTGlf525C9Aa0%2B3HRkfLSXIBInLgBlA0Wji2yxe7u8csNLGCCRijxW1CWmQZq8Fmm2ShearRZ89VLOHP77xvDCUtJ%2FgLRnNDkxRuaOyC4ZWRCiLHGFFhHUut6q1D6Y8%2FGc0H550lrxhbjCjJOPIrBHGwJ1M4TR1nsK%2BmL4kgjM34VztAx0nSVedbxIltIBsnsGIXX3uYekaR1JTxjv2tqzvGxBCbUTPCfZVvx5Nb275tnxE1ZmXOH17ih0MKLZGfFcTBoNDBe4lUKmntsxsBIaWkXY50I3VZmIudp36PkmKrPAVV28%2BLRnwah1gWjDA%2BmL3ESAgdCJ%2FgLSRKsZUQ0a13lxq92i4ulumkQs3YO0wW%2BwUEGN5ZTi4xuUBzxt%2BtvvUcKJHyhcCXn3xcuQfK3Zh6BAeTFsIkMGXKiZ3544Fpasn5W8AmuqKA%2BV7fOkh1aPFSeE9%2F0nwxRfcZPYfGTRFCGK7z0F5o6DRsHgVovopVq1aTrq6ItNrGqCEAenMSz4Ceebel1UGo%2BNMUnf8YhYvdSgi%2FVIFqJmGx8YwoNKGmLwmgCCiunJSlmUWqD9ysBrim0L7nCBNYLaxRdQY16jTQw2u7YywY6pgG%2F6Dy75Yjug5vMAD5d47adzlq1FTJsXwJM5B0t4bzMKx23cl6HSRBzzVXyXhyx03FlRzhb9IxM2YlJjKJ1CnDr37GKeghNyvTqQYayKm8y66UkEKG%2BO%2FJIlxNYeV%2FzpnuD%2FT4Vw8O3i61TEOTLeVq1X3lZFn009%2F5y7Y2NjW2G2a59pr2aKPG%2Fng%2FDGsomoudg6F5mTjasVwYa0sQp2oOIVzfCfER%2B&X-Amz-Signature=4142c4c6ad1360d35c38bb5a425fe56c993cfe9408e8c99569de56bcc048700b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UICXLPPB%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJGMEQCIE2a8GWU7dFxZiTAYJ6rn9hhKwoqabJPAg2dNLZKRnL4AiBwh%2FRO6R0cNz4HQ8LYVZ2IHeVZ%2FAbWEkKeAcHXjf9K8Sr%2FAwgpEAAaDDYzNzQyMzE4MzgwNSIMAsyenaGriH1IE6%2FAKtwDHGT890P4C1NJrRzWOTRjz%2BGNzLOAxcjH6c9KTGlf525C9Aa0%2B3HRkfLSXIBInLgBlA0Wji2yxe7u8csNLGCCRijxW1CWmQZq8Fmm2ShearRZ89VLOHP77xvDCUtJ%2FgLRnNDkxRuaOyC4ZWRCiLHGFFhHUut6q1D6Y8%2FGc0H550lrxhbjCjJOPIrBHGwJ1M4TR1nsK%2BmL4kgjM34VztAx0nSVedbxIltIBsnsGIXX3uYekaR1JTxjv2tqzvGxBCbUTPCfZVvx5Nb275tnxE1ZmXOH17ih0MKLZGfFcTBoNDBe4lUKmntsxsBIaWkXY50I3VZmIudp36PkmKrPAVV28%2BLRnwah1gWjDA%2BmL3ESAgdCJ%2FgLSRKsZUQ0a13lxq92i4ulumkQs3YO0wW%2BwUEGN5ZTi4xuUBzxt%2BtvvUcKJHyhcCXn3xcuQfK3Zh6BAeTFsIkMGXKiZ3544Fpasn5W8AmuqKA%2BV7fOkh1aPFSeE9%2F0nwxRfcZPYfGTRFCGK7z0F5o6DRsHgVovopVq1aTrq6ItNrGqCEAenMSz4Ceebel1UGo%2BNMUnf8YhYvdSgi%2FVIFqJmGx8YwoNKGmLwmgCCiunJSlmUWqD9ysBrim0L7nCBNYLaxRdQY16jTQw2u7YywY6pgG%2F6Dy75Yjug5vMAD5d47adzlq1FTJsXwJM5B0t4bzMKx23cl6HSRBzzVXyXhyx03FlRzhb9IxM2YlJjKJ1CnDr37GKeghNyvTqQYayKm8y66UkEKG%2BO%2FJIlxNYeV%2FzpnuD%2FT4Vw8O3i61TEOTLeVq1X3lZFn009%2F5y7Y2NjW2G2a59pr2aKPG%2Fng%2FDGsomoudg6F5mTjasVwYa0sQp2oOIVzfCfER%2B&X-Amz-Signature=4142c4c6ad1360d35c38bb5a425fe56c993cfe9408e8c99569de56bcc048700b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CK44KQL%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T160120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGAaCXVzLXdlc3QtMiJHMEUCIQD7nt3ZkK6Osonuc2unYuMX%2BfFiv%2FDu6XQJXuV1E0AIrgIgLUFp52Gjz2IPgw%2FC1t35TGt5%2FcH28BMjPnkeF%2F64Hcwq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDI850CEZHK3pRC0JQCrcA8AWy55Y6aSgjVVtEApz0WWDslaHz1%2FUmowE9QLCyq4dhvHNNL4a%2FUOLoZplM7Qfa8hvnWN30O0tRmKiM8l5eL3D8h16GAWpdSpF%2Bsw6tb8KH%2BaeMxa1LqUohuOMBduwBNPRIwEoGBs%2FZxQVDfGI6wIGnv09E0RxNqtWwjXeOjI8e7mDjxUqSn1of4uSZ7WJzjgsLa1gE8KqljHEQKV8YEV7Ur3dmXdywBo6Ko3ALpaQuWLVGRESvdzX%2FQTdcZcZOvCvW3GWv7K6EXbw0TSEuTY0C5QUE8MeGp8%2FmqsCLNS1CCyly72jFKA8mIBhdmdh0vUnq3TTPVsZk67ZjuXrQe74moHtdhfYcyKwKQdl5%2FAn5ak3D482PjkTtA9yyMtUxVwneVfhyOqO17LcGLboNLTzRzwhQPgnsNQA6%2FEIJpELUOqZ79KV4%2FrRdAah4RV5OMMwfEZgr500Y6qM8QEBt53AqgvuZLxRMrP0uZRd4NL65agl0E2aHFOSitQHbOUJKrFeSX81a2e9Qoui%2FZ80g75kilFDSoJnY0Vw6ig6lFfY1RiSJ04rpZ4hfnylhHpgtkKpkTTkZztuzFp2E4c4huLnfgbyH5%2BhC8%2FZ0maV7Zjg0m%2B5iw%2FWwGSt2R3oMIrs2MsGOqUBLP27%2Br25CNI0qNQ9z9%2BomMg1moerPgwzdbIaO9oQrwBuJQNKGb6ZENh7%2FoPg43pTd7hEDhUvt%2BjYGUuUb9wma5GVPDlC9K6j6WaKMdjpkGpHiKnvjDY26VWqP4hI8LEhJwKvMbzKJiDGsWKVvbuM6F1cwPp7coFaKi0kVRWmiAvuVi8R0Br5bTe5wcILHAggBktCLL1iv603ziPoqw7cK%2FqmcUQK&X-Amz-Signature=d9a4d84fc733e0756b4394e3a33a11bd7a9388f34602df2052200114756149c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

