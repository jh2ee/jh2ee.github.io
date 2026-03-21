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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVXHKW5F%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCoB9lvB%2FfbBxvXqNeedmLqGvQnM%2BlXpZW1qDmlkuJ8PwIhAKgyrzgswtJad3MX1ovi7R3XVK%2Fecye1gHDNsTA61WgVKv8DCFUQABoMNjM3NDIzMTgzODA1Igz4BfnOMUPzvtfKe4cq3AMJmmvaeu1%2Byl3lnGBfQnyXT3YQVvJHIX5U7njK1jbf1ZONB58obsbPgr9oeDdkmU8efX6E2kWKJDHh1bAk3ZdY8x3i88a4RuoALj0k%2BRJRkC2K8nevahgRpvtJKvoDEZboPsG8O9xUiH6Don2YSbWmho5WSktmnKHg%2FhdzUNQy%2FglqKwrGrp12BrWfpaxTFjo5T9kJ4OLwiJMdMVolBJtggDhzWHLPraPGH9aIuO7spn1u0ymIuANWxLmU6h2NMeNCjAxvd3z%2FA7UNQdemUItP4C5jCWJ6wfu7UnjzDdwCFz5pqKseJvb8XqRgDo8lC8DkL2So7HItDvOlvRNyfgsMHX%2Bi1A32DoHnbNE5hf8cuKO2st7rSLG5ALv4LAXaXt8wUA1GJIR2eLwi70hPIwfr1Mzye8%2FaWbKBYtGt0G5Rj6jA8v1DwhGKHSoqSGYC2lWuvX%2BacOZak0CpR4m1oodp1CgkV%2BfyDPxRCTlO08iL4ri3uzZY4j074TwCVtXEkowYo4iUCjlrY8rcGPF9vfKGKff9wMhUgqmCIsaWBE75YFy565L9LMZns77ppM8IlYGr6Lepap%2FeWvfw8iKVDDHwtvLxvPoThS1kQIpcGSbJ%2Fj2jKFYUeARJoViFSjCi7fvNBjqkAdok%2FNs1M5gSDkmfPRlAIP31jhS1eHqNAKTIxNyvmL43GcqKiBAizwmQ%2BWvN5UQc0INlzn4Tx0DOSsNjv4Lg04%2Fp7t64lmtvmwsl1skTZjHk%2BGOmUgy0CvbL9u4NK8iOstjXe6wGpf2jZ0K5s7ip0a6AyF2qAOCKSFrZRFWBnrnWZ2gb6On9hqUR2ea0UOAReqHUZ0SuV0wwchRT3WWGSOD62MkW&X-Amz-Signature=ff502b2f7a45b6c4b8839d4d2f1de69fe8857b4178882e5162368fcbf8149f89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVXHKW5F%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCoB9lvB%2FfbBxvXqNeedmLqGvQnM%2BlXpZW1qDmlkuJ8PwIhAKgyrzgswtJad3MX1ovi7R3XVK%2Fecye1gHDNsTA61WgVKv8DCFUQABoMNjM3NDIzMTgzODA1Igz4BfnOMUPzvtfKe4cq3AMJmmvaeu1%2Byl3lnGBfQnyXT3YQVvJHIX5U7njK1jbf1ZONB58obsbPgr9oeDdkmU8efX6E2kWKJDHh1bAk3ZdY8x3i88a4RuoALj0k%2BRJRkC2K8nevahgRpvtJKvoDEZboPsG8O9xUiH6Don2YSbWmho5WSktmnKHg%2FhdzUNQy%2FglqKwrGrp12BrWfpaxTFjo5T9kJ4OLwiJMdMVolBJtggDhzWHLPraPGH9aIuO7spn1u0ymIuANWxLmU6h2NMeNCjAxvd3z%2FA7UNQdemUItP4C5jCWJ6wfu7UnjzDdwCFz5pqKseJvb8XqRgDo8lC8DkL2So7HItDvOlvRNyfgsMHX%2Bi1A32DoHnbNE5hf8cuKO2st7rSLG5ALv4LAXaXt8wUA1GJIR2eLwi70hPIwfr1Mzye8%2FaWbKBYtGt0G5Rj6jA8v1DwhGKHSoqSGYC2lWuvX%2BacOZak0CpR4m1oodp1CgkV%2BfyDPxRCTlO08iL4ri3uzZY4j074TwCVtXEkowYo4iUCjlrY8rcGPF9vfKGKff9wMhUgqmCIsaWBE75YFy565L9LMZns77ppM8IlYGr6Lepap%2FeWvfw8iKVDDHwtvLxvPoThS1kQIpcGSbJ%2Fj2jKFYUeARJoViFSjCi7fvNBjqkAdok%2FNs1M5gSDkmfPRlAIP31jhS1eHqNAKTIxNyvmL43GcqKiBAizwmQ%2BWvN5UQc0INlzn4Tx0DOSsNjv4Lg04%2Fp7t64lmtvmwsl1skTZjHk%2BGOmUgy0CvbL9u4NK8iOstjXe6wGpf2jZ0K5s7ip0a6AyF2qAOCKSFrZRFWBnrnWZ2gb6On9hqUR2ea0UOAReqHUZ0SuV0wwchRT3WWGSOD62MkW&X-Amz-Signature=ff502b2f7a45b6c4b8839d4d2f1de69fe8857b4178882e5162368fcbf8149f89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643VBS2ZW%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDAzld4oDw18vq%2BKLdIIsKASAA%2FvSr8PMIrjKhfnUORzwIgP8Afy7LHta7y1OhSHS253L3XSBdzsLEWRmkUEgtwqcwq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDCyMy2vQlCuEmbqCbyrcA29KGTe2%2BY%2BEXuPxJgzK9mjiS5QPTKH4NxwCEoOIcQqHS95t5B6uCio9%2BY77rCDJnZmkEQRSatWw0Cdz5yUDHqea5TaNM2bguUhM14A631yBSlyaS0AsWuqHaOOZ2lpL6%2FtWjKs4YJBKzqXfy%2BChhHOMgGhqSShJ6fYuCSc92iTlmHsaVoj%2BDJpQOdfqqb5hxQSUFh3kFx7yUngdzpFNn75EzeaiPJRyR%2BJNv%2F8hDiElvqi2M2h7y9P%2BO9%2BSRsRLWNB2Xti40oFB6gI%2FYAIJRtlGiZEbovyt8pcvPz1mG1OV69i0o5dK8QRA7%2BLHSd7RN1u6%2Fk2HaDdzH9S61JdATBdqc2g00OsmQUCfcR3lSUGm6e51q7%2BXqtuajSCM8JJEzgM2sR%2FTJ7Lr6ddVWFUUmRC7FDYOun8gARqkSjit4E4Ej4FRuu02DCtPEcNOJgkoLReYOrP%2BGgBL8BMylNFAGq9WFOSOsiwSrn6GZDMWCbTLwaY90ASvRctnpzT8Ryw63uokm2zbnmlPp1g8JB%2BU577Cnm4m0X%2BjpK8MnF4Y%2FOeQ1YmOrPQmmtklqtIt0F6aE6MfNtRtkgUU%2B6zNktNCD%2BOOpGu1Cdni4ElofyIgK0VmsEQp5oyRPC3ytVptMN3t%2B80GOqUB1CCQoe0olk94hGJrxkjTc47RNBiJLD70slk%2FgnwFLuBw1APjUIOuLoVANR3VxHYyfAspFthdPbIYrJw6kp9GwE16AuakIW%2FnnBZ3bLZ2kmpv7HqyDlmIjbdHQ%2FDTN8zRRdZ2ZOP99NDr%2F8YvMg5Z2sTY44OFESBgiJqB3LxjdTwMUTfr1DjPPNE5Chuvv6dyYc7mj1CVDMQpsQhnp0MoKcCpaadZ&X-Amz-Signature=e53f51a9c59695bb434086697947c6997937db02d5dedb094f817ae3a8a8ef81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RISVAS44%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID4rb1rPteV2iLAPxFcKSdpJ1UBGCnqX9%2FF768nIkduNAiAWQnqr%2BoSqzI2xYQjpB8EtnRj6R63v%2Buenvoaei%2FMUAir%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMueIPIULGFDO62i2KKtwDDnnLSdTqCrEUkELaadDCGzzpGt%2FXiIotoyFGypPitha1uQcdndltKXgvo6wkCbXddYgDIMbVEL7sHcHIa6t2s%2BDWSUkZzczTquUP4bJe0XIh4jMt0tbehI8stBScz6WCTMpIPW63854RBMemeTWo%2FrY74KVFMKU7foYV8FiJ4nM1LzYz2U%2FPDHVZUdn%2FsOVEkM0NMOzK9212CmLZYi4YPgmJjD1JpMieG7xKasr%2Bvxom638%2BUX9HdJPFrs87Rocaj2L9vH%2Fb88B2%2B8ThgcnXbhy4FWA%2ByFxYE6mTQtaI6vnIi4IKO6q5Hgi40V07kqVLkyEVLdi%2BLxL0pec2Q57n5y141jgjSCSPpqfQzD6nrekIMbSV0fku7UVN261G2rwHCxOVESUtPpAaQHH%2BAEEoN1fhHVt3E5r1WiKTHEn5Pb%2FOZ%2BrmF51Na1aPV6ZQjHJnicf%2F%2BqnaiC3LiX5bmkJGozSNQR9w4p5uG%2FUmYf6mlrOSIbSTomTQs2jujlI3%2B6n6DZILo%2BXbXwh3lthgxhMiPjiAxeA1koqyR%2FbCsQpiD0zwiOYxhmVzMlRUIAgOa32%2BxzU9B7y3wxTIqlg%2F0aoCh9ytFT7H%2FpJQqfuLJN6ScgVjPG5as4BgaQizfo4w4O37zQY6pgEAIC7TFJOp0KBmW2Hqdc6GZvTd%2FV5mm6D4ArHepBxRnUNtdXii1fG37u1LmyLnUIAhyKvJt%2Fkmov3RHTuwUVt10JoYdcu5jP%2F%2BdmrqULsuSQPvQ6jHnItZ2j%2B1WU22AoqgQguwWgih%2BVRtV8YiWOryEz3hnpamxiEjnybZBjywblqL5EoC6dE5eq1eKIelMO8zw44FKhhtq9txgAjmC6RMvD3XmKaK&X-Amz-Signature=f44b3225c66f6e7bdfb31a01944495d4e55fdbc75ab15de1e4b19cf150977d95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RISVAS44%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID4rb1rPteV2iLAPxFcKSdpJ1UBGCnqX9%2FF768nIkduNAiAWQnqr%2BoSqzI2xYQjpB8EtnRj6R63v%2Buenvoaei%2FMUAir%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMueIPIULGFDO62i2KKtwDDnnLSdTqCrEUkELaadDCGzzpGt%2FXiIotoyFGypPitha1uQcdndltKXgvo6wkCbXddYgDIMbVEL7sHcHIa6t2s%2BDWSUkZzczTquUP4bJe0XIh4jMt0tbehI8stBScz6WCTMpIPW63854RBMemeTWo%2FrY74KVFMKU7foYV8FiJ4nM1LzYz2U%2FPDHVZUdn%2FsOVEkM0NMOzK9212CmLZYi4YPgmJjD1JpMieG7xKasr%2Bvxom638%2BUX9HdJPFrs87Rocaj2L9vH%2Fb88B2%2B8ThgcnXbhy4FWA%2ByFxYE6mTQtaI6vnIi4IKO6q5Hgi40V07kqVLkyEVLdi%2BLxL0pec2Q57n5y141jgjSCSPpqfQzD6nrekIMbSV0fku7UVN261G2rwHCxOVESUtPpAaQHH%2BAEEoN1fhHVt3E5r1WiKTHEn5Pb%2FOZ%2BrmF51Na1aPV6ZQjHJnicf%2F%2BqnaiC3LiX5bmkJGozSNQR9w4p5uG%2FUmYf6mlrOSIbSTomTQs2jujlI3%2B6n6DZILo%2BXbXwh3lthgxhMiPjiAxeA1koqyR%2FbCsQpiD0zwiOYxhmVzMlRUIAgOa32%2BxzU9B7y3wxTIqlg%2F0aoCh9ytFT7H%2FpJQqfuLJN6ScgVjPG5as4BgaQizfo4w4O37zQY6pgEAIC7TFJOp0KBmW2Hqdc6GZvTd%2FV5mm6D4ArHepBxRnUNtdXii1fG37u1LmyLnUIAhyKvJt%2Fkmov3RHTuwUVt10JoYdcu5jP%2F%2BdmrqULsuSQPvQ6jHnItZ2j%2B1WU22AoqgQguwWgih%2BVRtV8YiWOryEz3hnpamxiEjnybZBjywblqL5EoC6dE5eq1eKIelMO8zw44FKhhtq9txgAjmC6RMvD3XmKaK&X-Amz-Signature=25731ff597756a6626ef5013ea507bea71ed8e33ec8adce7f4aa0be67201d28e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666QMYV7AQ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAk05r0YsgP3cuxTV2Lzz7XsfhQ2cn9s0JkyizBS9Ki6AiEAlFTH6n2dC0BUqV6bVpFdDZcbo7DbK93btAbtN0nRy%2FUq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDCX4l%2FrNTxsMrDxmxSrcAx5MB1O9LKvHnPEpuAeSQnBm4TtgN3eoULDQr%2FxP5fHzbKFRBhot4yp5uU1o1JVXA%2FzO7xebNy7YuJ02WJp2LG%2BEvoFC11sYcidMNpUc81cD9lf93JpwzK2tuMa1GUbBl5SN9xFfv%2BR7soMw5yR5i%2F%2BhAv6bxQikyFnbqP8ERYjL5YGaaR9dBmeeaOhp5bGXe44UWBCsHbd0TfCxXDWQAfxjd7Q5uOSRSlPx6fraYcy%2F75eVBncQJTZ%2FxEmCV5GBD2O7Y53Zmii%2FrCdxx76GoFMnH%2FNXQUvgjy7HPsryyjFW8dALlF9aI%2Fvevd3UPU6pjtiVm7oavloOLVq8OxiKpDbpuPUPYThidlMkksm%2FdRFzivBNNOKpMCP%2BZsQbvYQHY4zpBkISoBQ%2Bf8lETmwpzr9u%2FYDO97nnnjM7tpSDxdOeHb9j%2B2jkUHtc7SynWYqJBB4BZ%2BEd3J%2B993kZlucM96r%2FEJFaeCBIuw0G2NrXBZBI20G2s5UEv%2FbndUWREPR8AqXnOhefV3DqVqxZA2iD%2B%2BL5sqCGQ1Q%2BhIny628in0GhbTSyKjbuNIVmPa0q7egMO9bq4VKAimATuRa2cG4dUUl5wKIKC0845hvpzt%2Bg3u%2FXAyiEoiEAyGXiQ4xXMNzs%2B80GOqUBKe8Hhmj8%2FSmNZWefe9opzAhIVgSnEg4typkAxN6gvULzADaKUAoidI6kjRrRJjm277vafg%2FBzMCDk5RXz4PS3MNhK6CU1NmCT5G99XD7PoGQ6%2B2eJhDv%2Fo5pTVcZHHe7TPypj3m4pMT1VeZDrkUYu1A%2F9iKRx0G0XsoWHry4xYtPePF5L4U6krswE7KnoET7OXijZ6x0EAVikszdfxEicOtN5n0p&X-Amz-Signature=3a2a7ad3b70274df6b5633e91ffd743eef93182bc6bab10b25a8115bf4d32d90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667QZBIQN%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBCQCvB0fn0fLb1nRKL6hjuVu9mu%2FKqJJEMuS2FdxZPGAiAoKPxSR1pFxESQ4Q63OBz0NAveGhyIi1RiFmDWSrqt5yr%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMApwPf01%2BkvX8%2Bol2KtwDXokZIEqjy5TOBUyImkKE5ZQG9jkOaEI6s2qvU30p9RbO4iGYZ2IPGT2Qv0XXF0oK6JrRn1%2Fa1cgSiTDR3U2mQ2X6Pxdpb%2FIRUxKCcW7UQhYpNLnu1pnwVMTWMp6Vj0tGC8%2FEt5%2FL6p75yOa2rDkbCGdRk7Dr4bYmyf8DsAPcH1N2BtQCH70u2sgz52UskIwkxT0oTXyigTH93aUMg1jwokQ8r%2B29%2BqDIdpTz8A7UjwI5dsy9cvlEZlsyJtSFMJpwWZmGzxtZy19xxQ4z2a%2Bz2M54U4S4PN%2FBwKz0iNzXzL5oMFytybFCu9hFFg%2B%2BmBrgOl8bLhXI%2BHLqzempYWF1HNoIOs4LhnjgxNPNfjzq7KkSG2K%2FwBMUExWiXyH%2F7279pQTNTKq%2BeIrNZkhUYpsiDaRboUGdpiIJgmay%2F5cjoUVguxqZGZDWOb6sCD23qgRhFEon8o7K4%2B%2FMKLIcM%2BSOftyND0%2BQ6tyg7Ujo1fLvc4SScUyd%2FlOv1u0cgF8mbtirC%2B5SzUyZtmpBkfRDO9rnLlvvJrBOs4kq7b%2BDvUL1MMQJSKDZ0%2FX5ttS1M8pRSrBBfjQs7h87nfYHD9XGPEaQUwy4WOmpTlmDZhrShZ3Crigf%2FuqEuHrJWyV6Cj4wyez7zQY6pgHjaElaRJHfOfnZJlhQ6VJjpylZ1MDVCIgJ1dfrxRhrRV%2Fd%2BBzhuQpykScgWUy4Ii0HT73ZQW5ZsELZIWgdFl6P6zAATY8dcT7Zvg%2FCCrxaLIx4wiFk2msxv1wayVRiuw4txT4E%2Fd5u9uFiUs3P60f9gaFU%2BL2XV9%2F6ngSrfSd0vBnlM7KP32qFKcN7A2IGsCc5SFDr8jbUEcQq7GoRJWLkPMFD%2BXXu&X-Amz-Signature=c2dfbb804be32db21b327540beb397ca65dd76fc046634dacb2d9a866960a0f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SF5SDB2I%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGIMnGcV8eJb%2FYwP8qJDERAuZFuLXDLiB2ZOWw4Srm%2FPAiBEiaTVc3HT0wkSTdPZJRJl7NZzDc4Pel5FYmwcXylp8yr%2FAwhVEAAaDDYzNzQyMzE4MzgwNSIMgRlmu2yLS2bp2vIeKtwDw7KYRzQRXlh7ayf9S%2FKwK17S%2B4hkvj21aj70CJUnFiQGJlduLUedDhjZHS54G8t5f8XtoV%2FJoJAoDQLY0JziXceFrMAIEbEWUdT9sTX479%2FbekEuP3BV2R86F1JPZ8BHtyrhvBDSa0KDhpT1lak1oqgP6hS%2F2fDME5GEp%2BNeDNbNx7TaEKU5GmMJCx5xBNuclBo3ovVIQ%2B4zM9SM4o6%2BjSeN7tOY%2BFyVg0xT3fZ5VigiyluMKFLduhgCcgHymHYwkQhLG05P7WiJthKYp%2FWR6OZ6HDDjGNZG5rfc%2BP2t3rQEhnYPNuAFTDHg2a3xTTQiGum3DhksTO0UW%2BMGThiNxWc3sk5455DF50pj9r1YWN%2F0eU%2BU3BpqAE7BIwpWp2WE%2FXLZYztY9iiOUt3uW0lNa0zVvppq6vAJi5ty9w9uNeed2z7WHuRLBMZUf6QG365XaNYZeAPE3Ss0xV3y3ZyJiFARJKkKoJ80dOEJTqwPWfGPU7pTTL6A4iAusrb9tb0%2Bbc%2BQfZ2lzMREEcvBpIPHF9QAflGcq%2BtPSWE2bSoQJkQKcA9AHhf%2BRnxVPXP5fvvkWESvp9xI3qWd%2BmWesh%2FO6fD5hlQyb9QBm9FGDfukW%2BYUXQ3DvXwhaims1HMw2e37zQY6pgFpzkYGO4A1aYL9FeUf8RKWI%2FbpuP2Qy2LT5wnm0zzN2TTVlIKV4yPPyh093OT%2BILVwcizSZ%2BodMoyalyKI8lzQvvdtm4C7buOX6OuF0FNK601oRkjtski75Xi6DJfYIXzsn7aV7SB5giCuNBy%2FZ%2FTR07CKNC8xA1UDh%2FnzAaEYpO7Kmo4htprio2Es6rWnV2npfj1NUHB%2FR%2FUOPGanEAxFKDKwfORp&X-Amz-Signature=eb68101c0ae1afbce311199ec049418e7f99217d46210aa16b832ce2034c3b34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKYXIXHY%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGcUoyrWazx1jhjato4nKofGNP3si1ukOo%2B0pv0IjPPeAiEA2IES1Kv%2B1jxKDBkle7PbCVb7bbriipHlLOb2hJXOlXcq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDL7vQRBpOi%2BLaWw7GSrcA0HpQqw%2Fe8QUgilzrqE8Sz3mOiSCfa0F0sU2s4Sz95Apvqbgxy6vjUuYpf07IT57B0giENOA0jrgcu8M5%2B4NZIGifErNHd%2Fv%2FZ9zrxwzyM0toFdIu6cnPjlaiXRWzJV7NnpjcJP7lAfo6fOj4gnoiT%2B%2FfWZna3fDbTG%2FWVis8b7BSkefiXxDsA0uUNgaUE8034AV%2Fp%2FhzGAnKfGkmEFR43sK0SD5UlO6QOniIy2idEIKBb5p10zZZHrlDKxf%2FmBaatxX4TiWt2hoYOhfcGcw8MeqVk9pbn5fldVMsh8cr1eFhwZafJqX65Ym0UD%2FushfrE4bLSCGcHJy50XMB4KM7Vdx%2BeKM7i2kfL3g5Hdqs7BCXGOAPfXqseGedc6VIkmYgPyVL9NPkI2c5cXleMwx2kG1UTBGYUqQ%2F1d1ukQ3TH3iLgar4BsGxRiqvrh037G8%2F%2Bo87z4tClez8FxTpHQEXbUNsKfOMLBD6UHShNqcRL25mHzBPKVz%2B2yF4EmffN3qcJswMMSeJ9EGSakGshpR4HIhyeMHVqEdBkRcUOv%2FJL4OQQH8x4f7PHkmn8mSS0ex2rdK09Hg%2BpMym67UMe8kNhTr9eNWieoTnZebAtwqvycIDTZlX%2F%2BeRWGxf7PeMLHt%2B80GOqUBMiJpdGysG%2FlVr5OU8ZhKDUDypLu%2B%2FfYELwJfVdcNmtKfEOzbG4Tphp1%2Bzt0PgocUaM7QUwvizcuvPIHjn3m9hUx24Ms8xdLquP3laPmW1SK%2B%2BmBefyVLsuDs1HVTZ95A22VsGA6IYrg2bLhFzwH7Yj6I5uU%2FSE1s%2F9Sk0TqvNo%2FBNN%2Bl7awL2xBCm7OGZTdTZFiybUy%2BbQ%2B4nWU5MBqwmT75UX6T&X-Amz-Signature=74efe35f27589a92c3ddcb1161d19bec789a435bedeef5e3eb50999130c67933&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKYXIXHY%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGcUoyrWazx1jhjato4nKofGNP3si1ukOo%2B0pv0IjPPeAiEA2IES1Kv%2B1jxKDBkle7PbCVb7bbriipHlLOb2hJXOlXcq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDL7vQRBpOi%2BLaWw7GSrcA0HpQqw%2Fe8QUgilzrqE8Sz3mOiSCfa0F0sU2s4Sz95Apvqbgxy6vjUuYpf07IT57B0giENOA0jrgcu8M5%2B4NZIGifErNHd%2Fv%2FZ9zrxwzyM0toFdIu6cnPjlaiXRWzJV7NnpjcJP7lAfo6fOj4gnoiT%2B%2FfWZna3fDbTG%2FWVis8b7BSkefiXxDsA0uUNgaUE8034AV%2Fp%2FhzGAnKfGkmEFR43sK0SD5UlO6QOniIy2idEIKBb5p10zZZHrlDKxf%2FmBaatxX4TiWt2hoYOhfcGcw8MeqVk9pbn5fldVMsh8cr1eFhwZafJqX65Ym0UD%2FushfrE4bLSCGcHJy50XMB4KM7Vdx%2BeKM7i2kfL3g5Hdqs7BCXGOAPfXqseGedc6VIkmYgPyVL9NPkI2c5cXleMwx2kG1UTBGYUqQ%2F1d1ukQ3TH3iLgar4BsGxRiqvrh037G8%2F%2Bo87z4tClez8FxTpHQEXbUNsKfOMLBD6UHShNqcRL25mHzBPKVz%2B2yF4EmffN3qcJswMMSeJ9EGSakGshpR4HIhyeMHVqEdBkRcUOv%2FJL4OQQH8x4f7PHkmn8mSS0ex2rdK09Hg%2BpMym67UMe8kNhTr9eNWieoTnZebAtwqvycIDTZlX%2F%2BeRWGxf7PeMLHt%2B80GOqUBMiJpdGysG%2FlVr5OU8ZhKDUDypLu%2B%2FfYELwJfVdcNmtKfEOzbG4Tphp1%2Bzt0PgocUaM7QUwvizcuvPIHjn3m9hUx24Ms8xdLquP3laPmW1SK%2B%2BmBefyVLsuDs1HVTZ95A22VsGA6IYrg2bLhFzwH7Yj6I5uU%2FSE1s%2F9Sk0TqvNo%2FBNN%2Bl7awL2xBCm7OGZTdTZFiybUy%2BbQ%2B4nWU5MBqwmT75UX6T&X-Amz-Signature=0e8beae7ac1f306df18517abcc3f8aaa2b474e5de38fc4bf11acf78222e92165&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XEE5R4MR%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwUBSwUgU16q9UrihZPzDIjQydHUvOcLjqrN0drilc%2BwIgZXhNswXaeyEaWeTZnZagJzmbZBmCp27wP%2FCC4WXD3fsq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDCxEnSa5ZGKBwABWTircAwztAEt36uGtiCpEMNCPHSD9MqaazzxT637veWKX1D34Ws%2FOdcH7MemLy28CB5ZiqC8M3v4QYIMWwVdqhnmmlVKsWRgg3zjihyD9rZBwJC9uQaKo6h96%2BlNj8nhFcPZJg%2B9ulTh4wnFchRY0Q9WHONhb6qgLxxr5NvTSF0fPZ5X5QgJk7TkkF%2FcyvP970%2FINLpmqulc9u9AIqIAlEZ7Rj9IixQshuBPi7vdVKhj9YcOGwld%2FdqosrZFvx9wP1PghR5U1KL1vaZpB003kRhVRpY3F6KSxA6krKPahlBN6n1584Uxbcwu0pLe4oX0fkjrxwI5QjbOIkGIAA3CXKNzr9MguTGvDvvYXvqOuwcy9TWCSJpJqGW7iWWDBFPkmqgjOK8lKrIzO%2B53vUeLdSTEnJ5kapw4XM7D%2FzRX%2BNbYLdvfZ62OPNsCcIy9iKp95itv9RBoi%2Fkh0%2BWDGTUFmy6ZCMyTixwtEI%2BKvq0HI%2ByazTGkXxS81of%2BGpGwamh5h%2Byfw2%2BYWiyzQaVeUpfTYxsDsWRrZ5XGrRcBNOLdcy4pufFnFKDsR9hr5CdoVxzjC%2FnmqB0LUsissnUZ%2BPTatpXMa1CaRSzAz68pXptazfYOhL4DLtVna5aAnT7lz%2B5ckMOPs%2B80GOqUBvGMIL0PAoHMih%2FQMk%2BuikXsHmS42dwu1%2FVx5QazTWxcdEO%2BZZBFY0XJ4%2BLLZBnF%2FTzhp%2FQmjbl6HtdOMG%2FlwESzpSzA8YLmzPE%2FXces8cYPWl5Gr6VhaV%2B%2BRe76VpBN%2FBfvKFqNBQQOB3%2BrWGWQbLl2ydJ8%2FFGKXUfjA6%2BqY1kTo40GgaTYmWiwDgVdksGgrSucibw9PHZaJY%2FZKGnZJtJibTjOB&X-Amz-Signature=64229f231d7982f2a8309c85fda1d4658dbd473573a15fa1702a56b12d895244&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRU6CEPY%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIrlzhHXNXhYru%2FEgMvakrC2YWTBWK2Jtbn6ObKU7avQIhAPvyp8O5gCfNNqcoCiVceqpgu%2Bx%2BsTVkimpiBDQONSsAKv8DCFUQABoMNjM3NDIzMTgzODA1Igz9RI0oqEHMAJ8OnDwq3AMHqUBt%2B5R0wXvAR5STHaZF3WlVM1TbnUOWxGhu3g7bCKmo34ChbVRWl%2FZ4fUaAYuE0%2FX3avfs%2BrhTZlAVIn57D%2FWMPz0fZ5xEGheTD8HOKEF8RNHApcpkpMURBCTg5d94R14vJZuRgk%2FjwZ2yxXZUrg%2FXspj5v%2BMnF0R1KMaYVHTTEsADJI8gIV0vf50OCNd0F5CujGa5vbRzwLaQIq9vOLQARWGqjBVXvF0WTADjIHY0Th21jHxu71FjWmXsTzSQElSsCwW%2FOza%2Ben67%2F3EUlfts4%2B8OP2qx1nX%2FNCdMliifHazoJpo85YCJlxNaJ62SyS6FfHy3laUqW8vuMciHiUQIu0z7D10EWRaqby0smcdpp81qR%2FzzXmv%2Bv484CnlK5slhYr4RaijcVs4n%2B0Y5tYiacFTrS0GLnmhaMAGYRBkIgsOhZrsSCLheKs7v67uGJD9fTCZn%2F91GirEv7%2Bu1EXSS2lnkL8r9WH3EvlyCu%2BiZTdfxNZhylBRsq3gBZ54AbOsu5zFxzJIBGrKTSBt8rlPIDT7eQ81DvLxjob%2FMfBC5B%2FMSjxNNH32vendy%2BAQHYzd5KIrYw2YpnZHpUGIM%2FE9NRjDtPHvNupIErMELyS2mpSgDTs5HhZGkJuDDJ7PvNBjqkAW6JPuKH3AdzaEfb3WktuhcKXSqCPXkUFIm8uhpy6hl7obiqVC7PEdzpDroUtqj3KoGriHwg%2BDWH%2BE5kxknlRZl3rsflRSa6mSaqa1fICWh67Xa3RPEznIYAvrpanCV14ew1PoZQWYSXxjd2PasMaaKzXbJ7A8qJ47CVCg7ZH%2BxNlXzIdJDDhCNopCffbsglziSXQvudjaqCBhe2%2BpNMEJ6yFgqL&X-Amz-Signature=5fd43ef71231043c0d99027ab00076d73eb73a296f279059fab1103c6e06c98b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRU6CEPY%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIrlzhHXNXhYru%2FEgMvakrC2YWTBWK2Jtbn6ObKU7avQIhAPvyp8O5gCfNNqcoCiVceqpgu%2Bx%2BsTVkimpiBDQONSsAKv8DCFUQABoMNjM3NDIzMTgzODA1Igz9RI0oqEHMAJ8OnDwq3AMHqUBt%2B5R0wXvAR5STHaZF3WlVM1TbnUOWxGhu3g7bCKmo34ChbVRWl%2FZ4fUaAYuE0%2FX3avfs%2BrhTZlAVIn57D%2FWMPz0fZ5xEGheTD8HOKEF8RNHApcpkpMURBCTg5d94R14vJZuRgk%2FjwZ2yxXZUrg%2FXspj5v%2BMnF0R1KMaYVHTTEsADJI8gIV0vf50OCNd0F5CujGa5vbRzwLaQIq9vOLQARWGqjBVXvF0WTADjIHY0Th21jHxu71FjWmXsTzSQElSsCwW%2FOza%2Ben67%2F3EUlfts4%2B8OP2qx1nX%2FNCdMliifHazoJpo85YCJlxNaJ62SyS6FfHy3laUqW8vuMciHiUQIu0z7D10EWRaqby0smcdpp81qR%2FzzXmv%2Bv484CnlK5slhYr4RaijcVs4n%2B0Y5tYiacFTrS0GLnmhaMAGYRBkIgsOhZrsSCLheKs7v67uGJD9fTCZn%2F91GirEv7%2Bu1EXSS2lnkL8r9WH3EvlyCu%2BiZTdfxNZhylBRsq3gBZ54AbOsu5zFxzJIBGrKTSBt8rlPIDT7eQ81DvLxjob%2FMfBC5B%2FMSjxNNH32vendy%2BAQHYzd5KIrYw2YpnZHpUGIM%2FE9NRjDtPHvNupIErMELyS2mpSgDTs5HhZGkJuDDJ7PvNBjqkAW6JPuKH3AdzaEfb3WktuhcKXSqCPXkUFIm8uhpy6hl7obiqVC7PEdzpDroUtqj3KoGriHwg%2BDWH%2BE5kxknlRZl3rsflRSa6mSaqa1fICWh67Xa3RPEznIYAvrpanCV14ew1PoZQWYSXxjd2PasMaaKzXbJ7A8qJ47CVCg7ZH%2BxNlXzIdJDDhCNopCffbsglziSXQvudjaqCBhe2%2BpNMEJ6yFgqL&X-Amz-Signature=5fd43ef71231043c0d99027ab00076d73eb73a296f279059fab1103c6e06c98b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJUMTDVI%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T200106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF0S2YhUpCX%2Fv2Tj%2BaRXuYnFd2KyRJLx%2Bd%2F4XpxvGzT4AiEAr98YL6091%2BzXJHFa6ChXCL6DgrtFYp6om4RhW%2BCVsrYq%2FwMIVRAAGgw2Mzc0MjMxODM4MDUiDK96Pa9cKpvJnwPEZyrcA3E%2FXxnoBGtP3JdOiBPhhZPzzShbBXwyRBk1wrQo2sWIexx5SONP4kd9vXK%2B6rFDA8txd2Tymy%2BGF7f9zAEGivkFUy2%2BpbdTNsWd69B2F1BXm8kYWc43ATGqjXHn7k4rz5iLgExf%2BCPIxcY6mZMg7TuD6ZRajb83Ou4Q%2BMAPdOpkxeZCaSVc9OK41WXdCcKOXHzGt%2F7tQGI09h%2BllmabCtwYRmu9zssUU2lhqatz885X0no8yX0FfAB5R9hXj7nlHdtRy7%2FgnMkgZeiOr3Yzn0v6tm%2BOHedT%2BWX1knEqyaxKQymlOGdNd9lRKi0zH2duSPOlx3yajkd3Nov4n5QKgA13H3KfmpqkCBw9b7A0BSzQUs%2BLhA9%2BjDWDy8X6%2BRquCcDwQ7Sz2HTzj%2BcUKF0FiwA7gQ5dx7GobllVXC0KQ0OsvPZtUJ096RxurkEBGmV3B4pZQ0FKjz90ez3D1OPG9dj%2BaQogagwlOJOYxTWbGuBiZLaY%2F4CnNSxDB31PRtCWOAh0r4wbK9BPVj5oHar3oHgZg8GstbleQgdQi3QHNESenqJNy6zQOcYKNtFw1rjKTp3M7Lk10%2BwYPyCrHxaomJgc9eC1m8pUyR0WB7BsynEv35Ta%2B8TgyGFOpxHMMLPt%2B80GOqUBEw1FRzrf9ysaXFxLe%2B%2FGfgLXualqy6HuBr1U%2FNGpGBCT2zePkqSPJlWyUcVwHd4TJGd2zqE%2BwKRELcfQyfqcp3aiTx3Wt19OLBOBNotG4wQGcj2c5xG1JLXKAYjG8ckyYiHmeHBHnR8dKpPFIKLeFJ7b1PxxbNZN7RNczLxBePy38ItJA87rL6vG7MaclF3XGdtlcnAQQSWks2QbSZNDMnSLElMh&X-Amz-Signature=20ae1be42d1523918a0446edc8e494d8b1d9ba73d092815c2a1874f637d81199&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

