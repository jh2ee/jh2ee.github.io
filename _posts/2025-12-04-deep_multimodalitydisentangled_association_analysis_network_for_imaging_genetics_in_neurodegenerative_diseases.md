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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KYSTHZH%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIDXayf6LCP991BLbJXQ%2BNN3u5Q3iwQV3zdiuzHsNzW7QAiEAwFLgOIp3ytTQfbyIq32du0RMWQLwJIqEj8Cap5hM5Hoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDMr2cW%2FWJYc03yzW8CrcA8%2BWk6BwKP03muXLK4WzC1fn2Mt%2BZjRJA0ZX8ZDQqOlgngnl5UgSW6nbgP0ik61c%2BG9fzZZOBOrrYB7WP4NTTn6BnkMluVSNiBYYpVStgfXcy1IHYpsLSbNL8qBKPy%2BKfSSkZmEP8wQkK1Ee6N3aux1YqORR1Kj2hIeXh6TkTdGfAti8fBZH0A%2BJ%2BfaKdX%2F5BHgP1mXjecM3Yl0bjo4xBDw8MKyAA8OwH3eNEe8pll%2F6HrL9NPd8C2U8xFvypGgWggrFMX1fO28ZKsm92r1UaIynf9t3hsWDeKTQRWs9RABL6EesCH9xl69YukZ9SrCNij1pLTmc9eR%2FrszT0eCNDu9v8EB83AVwu0pjR3wdcjjTPENgJ6T6xavCPa8RchtXwQPKVTuy%2FwUymU4N4BdKvV0BEGLWmqNBTpVUkUrFjnnJMdi3iHhYxn4Bn3IbvhfRJAVQBL%2BG7ZI5qhstmM2A1zEoG9wSmu%2FNuBi1XTSU7tGuxcQ5kS%2FSfTZL2ZGA2wq%2BwkBNVWAoICjtMlgISJhrpC86GR6hRoE5%2B2UfPEmkX66g9ts2SHJaPqLB13hya7%2BqVthYm19MCj%2FNl3HCz43lsdmAXC6v7d%2BqnhsE9Hwoa5Z%2Bbmccvol63Yq9LcFGMPCyn88GOqUBrhj6VJ4LPeEea4J4zxWLrBtUeN0rlhCDuZfaKJ1wFpzDfpu1m5eqiexIVfvCuaU%2FWlBRXHx%2BEPza8P5VfCadLETaPGCCdVRAI5F6evnlt8I9ztQ7WTOZ0oddidOcU07RbQP1%2FuNQ9YvP8seRYe55yjX8faZeeLzRqChWe%2BBByssyjMc82RUS9eX24955CY6HeQ83wOcCb696G49EBDg6vHAAC4Vn&X-Amz-Signature=c5323b61ee55864305c28bccf3898dfd2694d510b2e45fe09f1ba55990ea6704&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KYSTHZH%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIDXayf6LCP991BLbJXQ%2BNN3u5Q3iwQV3zdiuzHsNzW7QAiEAwFLgOIp3ytTQfbyIq32du0RMWQLwJIqEj8Cap5hM5Hoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDMr2cW%2FWJYc03yzW8CrcA8%2BWk6BwKP03muXLK4WzC1fn2Mt%2BZjRJA0ZX8ZDQqOlgngnl5UgSW6nbgP0ik61c%2BG9fzZZOBOrrYB7WP4NTTn6BnkMluVSNiBYYpVStgfXcy1IHYpsLSbNL8qBKPy%2BKfSSkZmEP8wQkK1Ee6N3aux1YqORR1Kj2hIeXh6TkTdGfAti8fBZH0A%2BJ%2BfaKdX%2F5BHgP1mXjecM3Yl0bjo4xBDw8MKyAA8OwH3eNEe8pll%2F6HrL9NPd8C2U8xFvypGgWggrFMX1fO28ZKsm92r1UaIynf9t3hsWDeKTQRWs9RABL6EesCH9xl69YukZ9SrCNij1pLTmc9eR%2FrszT0eCNDu9v8EB83AVwu0pjR3wdcjjTPENgJ6T6xavCPa8RchtXwQPKVTuy%2FwUymU4N4BdKvV0BEGLWmqNBTpVUkUrFjnnJMdi3iHhYxn4Bn3IbvhfRJAVQBL%2BG7ZI5qhstmM2A1zEoG9wSmu%2FNuBi1XTSU7tGuxcQ5kS%2FSfTZL2ZGA2wq%2BwkBNVWAoICjtMlgISJhrpC86GR6hRoE5%2B2UfPEmkX66g9ts2SHJaPqLB13hya7%2BqVthYm19MCj%2FNl3HCz43lsdmAXC6v7d%2BqnhsE9Hwoa5Z%2Bbmccvol63Yq9LcFGMPCyn88GOqUBrhj6VJ4LPeEea4J4zxWLrBtUeN0rlhCDuZfaKJ1wFpzDfpu1m5eqiexIVfvCuaU%2FWlBRXHx%2BEPza8P5VfCadLETaPGCCdVRAI5F6evnlt8I9ztQ7WTOZ0oddidOcU07RbQP1%2FuNQ9YvP8seRYe55yjX8faZeeLzRqChWe%2BBByssyjMc82RUS9eX24955CY6HeQ83wOcCb696G49EBDg6vHAAC4Vn&X-Amz-Signature=c5323b61ee55864305c28bccf3898dfd2694d510b2e45fe09f1ba55990ea6704&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZIWLHGD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDXODC3IGlQbav88V2qEEIhEk0gkfddr4Qa60xq4kUPqAIgS9u2ncewfLfAoU%2BVOO55plsK6Igw9uYuh4W3jIRiaoEq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDDhRUnmZ0LdLLrQ3SircA8PTnP29%2BmP7y3y%2Fqwhat8VHA7WcV7GpriF%2BfApM78r3z1IVoHMfru%2FNyu5EyTDgIvc2uQdbW8DJ7EMAmvkwu%2FwYuCv%2Bcg36zwlzOnDT%2Btm%2BEsaRgMQQ7po8Y0oTbcxgAX0e0s8F3uQ7B8P4gomxWvylbaBm91MxN%2F2sxlU3XNtdIXgQD1WMFDQ2wBzZIUl0%2FPHKGLKfBwOpph1yCMbCccul4NJTsIR6DXDE84UhqIrgWjVe9jCTEO9mi8%2B6m2%2F%2Fx47gbQzLW8lZAniGM%2BAYQngqoTes1OjFk5GzAQl0PUsfDVWFppC8PLP3Dwp6i8mxBCRhTnIIyq2oNtexZ3KiCBNvs4wkgnQisM4mgIi2t1il6p5FQ%2FKZ%2FS0IW9pyCxc9nmsA2J6kkwScrf78UOBDFPXOGxG7dyK%2FRiwwi7cRxmRFy0ZbGchtKfW0Hvo%2BYaPseg3Uk6ypXAHi81NRAcd72MCC3GCgj3n0NfRvfk%2Bf773KGXGwkAyu2cqF%2FqrSiBKVUKHYnxBoDDlMx8q0rR2ZqHkRTHUFfZ4iNjY2O0B4u3YtVLZlTZQtHr9DC6RA6GitprYCB%2F3kWd%2BVfeEsAqtOp4Duh1ph8WgIqM4Lf%2FmDZYByTn9Px6OcHrm1StYbMPyyn88GOqUB2DOOFq7FFR2QUpIcLpqr88M53n9SxAFcIh4E5xDULqUZSWXu%2FXa5YQ5iL%2BcY5RVhlinuWB1sq4WbK01RwmD1tGbMZzMcLJBRNGjD8YUhZDWFftiGDo0e53QGXLsphWHfhCvNHZ9Q%2BNe02z2yPJP3Z67yG6btqa0%2FkjX6JLGRUWTHE6YEAxgHWJAq4cr%2FYimI422zQndo8qH92sPHN6EoSUoBIVZ%2B&X-Amz-Signature=e2dcae0916a833a847698afbd07f4c1627b734eb155e41bafea7866895fee31e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CMA66L2%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQC9zZMpGSgA6A6Rg0f%2FZdAug35SBddt5pLnraJThIkOsgIgAvpC1x5kOcVrL1Iv6mDlTwvxwaFCiVnD2aokOnUaFUYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDNXdjAWSw9h5u0B56SrcA6CCQzloqLjV1AxIOMh2CoE%2FvsEL52H2dXPI1QHDIrE0AwDD0k7JgnESOrzmU3%2F3P05lQvSkPZWJjgAZBg6dExpto15krs93RUDy5t1h8PTRE9gUf%2BoMaRz%2FcvshIAKO7LecGKSBcpnRLvdLfv7%2FwNCjgs6NeIZCfRKydg7u%2BuyGOwAnVxwN4wl%2Brpvy%2FIzX3QnH268V3Ir4QMpOg3Wp7gg1WxuVBlKXvlV%2Fll8D4BWOgvlJsHHQvhBmsAXO6nXb1YaPi5yWN7CYKnGKUwnlIyh%2Bky%2BW%2FcNMgJYJEpkoPMJcXlKRr2eQ1MlyZY6eHa1egmc0GEc12uWnTIuNNxeD34HQAdERHKI9ljNOctIdqd60BpPAD%2Fhx78%2BzIrC8iO50lIiB%2FdRL3aA7swkRIrni1%2Bi7no6GgNmHqK5e%2BhHl3SmQpDGvAxuOFmMsOFCnOyG%2Bbl6PkpAO5P7ixX%2FOkiIUOIL58erCmSuOaXYS%2BaqIaZLeHs4YwjW9%2FpDSv2Y1wzL7TJ37%2F0wfWeQwfYwafRqqqTvlIHCbHo1nMriL6ok%2F9XSrvyGVJZIkFv%2F9yfR%2F%2BP8dQVTzPyb2NTZCwplCTTD9j%2BpeKNoApdFBquRLAWVrUTs6HLfb9FzV%2F%2Fw3PHZTMNSyn88GOqUBgvuQOK%2FHOAGaiQn9KDfL4ywLhFGTCXW%2BF8RU1rRjcCURMnFu6il7BvoZBOvEos3GL62toVb1uU%2F%2B43Cc45j8PWx8onlghxhx%2BrdCvxJR7MtoC23NO2gG2ZMqBPglvW7GtUTjvaKy1laWJhOoO02y64j0CPG5IK4O%2FKqPStv4KTi8%2Fe8jzrG1p2a7JXF7Lc76M1mPdNlAM2QwAtbPahh4zpt6s6tC&X-Amz-Signature=29cc4c9a900238186eabca589020a5a38f1c5e0b6a6ef2986c5f4437447bc4db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CMA66L2%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQC9zZMpGSgA6A6Rg0f%2FZdAug35SBddt5pLnraJThIkOsgIgAvpC1x5kOcVrL1Iv6mDlTwvxwaFCiVnD2aokOnUaFUYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDNXdjAWSw9h5u0B56SrcA6CCQzloqLjV1AxIOMh2CoE%2FvsEL52H2dXPI1QHDIrE0AwDD0k7JgnESOrzmU3%2F3P05lQvSkPZWJjgAZBg6dExpto15krs93RUDy5t1h8PTRE9gUf%2BoMaRz%2FcvshIAKO7LecGKSBcpnRLvdLfv7%2FwNCjgs6NeIZCfRKydg7u%2BuyGOwAnVxwN4wl%2Brpvy%2FIzX3QnH268V3Ir4QMpOg3Wp7gg1WxuVBlKXvlV%2Fll8D4BWOgvlJsHHQvhBmsAXO6nXb1YaPi5yWN7CYKnGKUwnlIyh%2Bky%2BW%2FcNMgJYJEpkoPMJcXlKRr2eQ1MlyZY6eHa1egmc0GEc12uWnTIuNNxeD34HQAdERHKI9ljNOctIdqd60BpPAD%2Fhx78%2BzIrC8iO50lIiB%2FdRL3aA7swkRIrni1%2Bi7no6GgNmHqK5e%2BhHl3SmQpDGvAxuOFmMsOFCnOyG%2Bbl6PkpAO5P7ixX%2FOkiIUOIL58erCmSuOaXYS%2BaqIaZLeHs4YwjW9%2FpDSv2Y1wzL7TJ37%2F0wfWeQwfYwafRqqqTvlIHCbHo1nMriL6ok%2F9XSrvyGVJZIkFv%2F9yfR%2F%2BP8dQVTzPyb2NTZCwplCTTD9j%2BpeKNoApdFBquRLAWVrUTs6HLfb9FzV%2F%2Fw3PHZTMNSyn88GOqUBgvuQOK%2FHOAGaiQn9KDfL4ywLhFGTCXW%2BF8RU1rRjcCURMnFu6il7BvoZBOvEos3GL62toVb1uU%2F%2B43Cc45j8PWx8onlghxhx%2BrdCvxJR7MtoC23NO2gG2ZMqBPglvW7GtUTjvaKy1laWJhOoO02y64j0CPG5IK4O%2FKqPStv4KTi8%2Fe8jzrG1p2a7JXF7Lc76M1mPdNlAM2QwAtbPahh4zpt6s6tC&X-Amz-Signature=a0e6ba7dcabe1ff7e5525c084b6d6ce00ecb6480f19c34e25c98656924f07f17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QODSTA4D%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIB%2FgWP8hQT7E%2BAzamNbp8uxLDivc6Mx8D2rSfeOP7IZzAiBPOZT3aaDrJnnFEg7HirLbtFZ7BuyhFL%2F3EVSrF8WkqSr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMTq026IOW5JM4rN5wKtwDpH8UnwSatssLXCj4ei0czQ4jKjXh%2BHcgdRwNK4KHQFjC%2FExFfC5AGTqFkkC4cp6UxCyE73wjm%2BATcDjSIMz8MXBgizi48pxuiHVfA0Sv5OXeVZwfP%2Fpx4ZknDsR10Po7Bjk%2F1pqjM4LOR1SwpM1%2BWuOe3D1kHsEK2ltt67fM6ErdT%2FaYtR%2FtxDne2Aqq8Cg%2Ba511ZHqFLTuxmzC4RlokoCq2nGd4xtfvRBitoR3kcW%2B6n5SMeium9d33YmYaciKpBYMk2TAS25D%2F89Q29L%2BaOfj02ss3anL1U1nk7rBDZ%2FCTGjSN1OmLJ8564b1kadGwZly6Qn3Bifu6sSC3Agtsp4HXrO2zYpzO1Nt0Mvxt87srCBtoIvoNIZPrJImgwMjpV8%2F6zl3keVdf9cszfKcGaFjUz8JYNEA93PFX%2FPdyKT2GfW5BwqGCvlkIKGBsgr2BYKl3MaD3pNRqK0ME8wVGIAjPOZBUy2D8hvg5giGxfiNr0pjCTfGiWdCC0PfQcUfyYM84t9jqwza7crIPYmu%2FLVtXr7HghNy28CwEvf%2F8Yfj%2BeKT6JbjHLsY2%2FVU5fYs01c6CRzETlhrPh4%2FqPUrBDf4P5sBvU04CJgpgyKX3mXjbpLgGG4Y3Kasw2LUwk7OfzwY6pgGRPi5%2FC3covjDrMJEYK38is9RZ0aeoHg2oK%2B8auFz2fLOO4nMcTsYYOs1%2FZehB4bZtiC4MaR8PYU9EqCbbAbsaElT7kkLPK2MMCQocKtrlHhnOG5uUo%2BTFy6qmyAI0%2BJb4gwXfQtQOajj8yRJK5X3IXGFFwqWdkSF6ZoyPtxOsD%2F9rWl3NrMF0TmGUgcXv%2Bw8gm3w2%2FG1EBGyaOWb469ScwM9vq1CX&X-Amz-Signature=9fccf25f13528d0acc907e87c03b613b670cef32957c81030f2971cc3e12fb57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TH6P7Y6J%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBVk3alpidHD5kQcEDQBEUoBTvaJrdCxvi3bteUHGLkPAiEA93QfPmVnJP%2BOgU%2Fpo3j6b%2BMJ7auwPM5XhlvCxEjCWpUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCcaS7Rhaq1HHtb6yCrcA6ibDFYnbEuazQhkxhD7RpL%2FBwkrNIrffi3NEIVFJjkPpyIKEjKYujkEIuX9SetnBHdyoSsTaWzlWy3c2aCgB3SUVrEUDa8YwUjOG1wOhnyHVjsYl1ZMCCWyEvprjVpky1rx7wpZ%2F8DY%2BMS2xQE3h6%2FkOaNqPXY0DLv3mjNBbCoLgL1DNZ0ku3qugj8HIJlioMC3H%2BzuI628R%2FCuA2fMBD2qgNo5%2FPjKA3Bz5Li%2FeBU4AgPBenQYLFy%2FXkwzCMM1nY71S5B9JTr9ghIB95wuuHTKFZEmRqnlVCQ4K8yG9qZJ3rvvgnxD8Qi0cXVpew5RtbZjZuwiATh10TY3h%2FstT54Bi4xJ1lHEvlGvlk1Cy9a4P8hbldGDo8%2Bi0YyJuAEKo20kX%2B6wMQeZ%2Fl8MjJ%2FU%2FY3aDKxivIK%2F%2FvwyV2Au4ZHktMZ1uXAWeJoCEFleopzgBdvAAXyLxnbrpCThyU%2FTiX08DGYZMGwGB%2BmAUxFRD8Fm2gguAy4EPFwdwgRR9HuWnGEmB7NNEQ3xO3mHSAqHyuB1PG4VjupzQi6Cwyy6CK914Ykpmx94lr5trpFZC46QNbPeph%2BxDTSh3xw8wMEGsGnr2n2kyIwRscKOSehaKjSfsnW6nDClC5bH1z1PMKSzn88GOqUBW%2Bx5gwJoRR1oTTb6WsM4rqmbGewk8cF6I998SIJS98gEBbZvoYtFBrihoLI7%2FOlTr44MUKx9lvboGwv%2BnsIKHt2ePTX%2Be%2BALgBGgF5vh%2FTq7ASFL8%2BKUpObj1rCPTcn%2BAqH0fDO1hrIfr6Hl9vt634ic14ciL8pB4%2FQ%2BbLUg%2BxZVPa86z6SLTK%2FXATtV2byUxm0qaO%2FeWPYaz12q13R%2BOWlkHWzX&X-Amz-Signature=73493c75e4cf74977d18128802090976bbb587df951773a076afc15af4ead979&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B6EHTYJ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDEk0DmQ6YislxBAto2OpQl58cSnE1rRxnZ6ypBaSHPeAIhAP8%2F4lOOiqsYrg6Gz4COCDAJS3TN2oEx7OQ7oi61qK3aKv8DCD0QABoMNjM3NDIzMTgzODA1Igx5Wn2HO%2FTU4VMOOsEq3APzUS4LS30ZkaOSMHRSgqwEI4qGu1aZXZ1NFPqRoEvSlscl6J3EIcWW8HU8ON9eL34sLTimAQxmrF90sQhXFZz6jF2oV32J3xQgd4IAruAcT0Ux23HL%2Bl8QhpGRV%2B8cAghNsikw5ljOEreeQfh6aeaySqNkxBWETXCisoTCEIY9sq%2FWzJTaCGhc0wR4uUkBR0eDZMRi2y04TSeIlnbSNvpOuK4x%2F0UmGZmiQtZsHi3f%2BEwc14Ygabf9jRd4IwEj5mPJb0LpgH2dQt0HG0uQuqQ7Qw7gssZp8Y3AFRC0D%2BnD87qglBnx42795l9vbHu6yh08mIUH8U4pFYNydAcResLRDx8Y5tok6e3EjL4RbhGIdCrrep5jgODTC7VugdQ7%2BviDfLpisv0sgTkxlynXYhK6cSiH6iuinKjPnsFHFoYp2xJ9EFxIbwUwSQe55qdTVIY63gdTziMU8JgSbJ%2BYpUBKIVYpz9AOqfLYZS1vQoJLEj8sjd9NqCvZ9QMW4ET4CtyPm2xbdPcU5lUe5kXo936NL0TLumCX%2FTa4iZaKB%2FYWeF9BiCBhKCRKOM4FIEzruoCbqB5LcHZ8BP9jIlzOUn%2BVyFiqXQVoYihIihn5UFmbO8%2B%2F9dPkxxNYmotQiDDetJ%2FPBjqkAbmvZ2g3Ojrztbql0T5qXTH2rocFKi%2FEgfJ6zI%2BrXTn116fHkxCKfyhk%2BGRsyGhmGuEiERO7N5RleyAf3PER9VpQ0rD4pY3kdGQXASrOb0NlBuu2niYlxlZ7ZS8qDnjGz2xxYt5aeYGSAYnStKtIgJioVzwMpcVck5VjaQZfguNh5Yzyx0pcqDBtVMZZFhpEGuHT9IJNpf%2BF8qDAz7DkHYfT6%2BVm&X-Amz-Signature=a8f3cf037459af2a23e81413b23381b58f7eb08168203d1d997bb215797e3fb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ4OG2PK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFP84hvBlUBZpLYiGqrplCDniLoP0AyIhmTIgvkuhlcWAiB4kpLcyXV4ET1EvTr9xA4KaisQiQAgDiG58mo8p9b8Xir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMadeUtt6%2BeV9nqMyeKtwDS%2FtRuh2Oc%2BgU1fcSbE0ZGNT6Ud6ml9rHa42dEyFoC1IA5CDMEy1BljgHhIRbeXwwuMFpVHPcsAWiJlFbbzxDWTOeHCjbVByzFywo3PgXdx4QkSVZ8taxoWntWEDXL9fXuVoDp0I2rCe8axAxUCgYeA8Kg5Y2J08Z2ZG0rGIKQDCGGa2ol%2FCmLqZIR6fj135ZmRNmAsXb1FCFikWJl2JViNPLTIvBsS2KoPSwnDnMIixZ1CtOsn5pSa1bvV0gn5yWPPtQzjJVh%2ByCj1QCcAfR7gUnd6dlczUM2yi7o1GYMFyAC7nTIyhbbGMRGDpyEnr1YzSQXJrbNEZocMUshjFHuBc0hWE09TFlmgec%2BVlrl1Tgic9bDd3AjqQQrOWMbr%2Bvu%2FnaYgEULZ4TfISHktfVFy7uCLZUn2SWHVBQ2cHwwVQSGLnuOVYFvIBUkO8RvVmLn5bWg8Nwg1r4YvfjuaRC19902KZLWzq7lKZkaIIR9R5jPxpwczQEKCGTWaSneE6pHRiE0exTozlsMhW3ymuU8lrmQ9AO3eeV%2Bhko2Lmd2UYWBpZyx2qdmLBgez6UF5bThdQsBywnikcOaLZBffQd38FEw3nGkFtckvmn8zXVg1%2B3qabqVylf3SDB8KowqLWfzwY6pgEcVUv%2F1gAsB5XV0OdWbMAQLhZwMh3olvKoH1bgBOV1Oh7TielzmP8Gtpe862YlXBqueF%2B3XFNjcrBWgc1hRB9KqetGAh9eOgGNvCAm%2F7QpwpazDWDNkQcqmeySrPavHqbHSKNPlzijLliDJGKY3IgUKfoTbQVhz58%2BJlDCnRDZRbUmYsSB%2F%2BHp%2Bct23I8mi0oCoq5iuQ2K%2F7FbEL0LvwfGi2l2fvZg&X-Amz-Signature=ee609d809e82d1535dcb65053b61e53e15ac8121d6b54cdbffbb1e271ea85894&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ4OG2PK%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFP84hvBlUBZpLYiGqrplCDniLoP0AyIhmTIgvkuhlcWAiB4kpLcyXV4ET1EvTr9xA4KaisQiQAgDiG58mo8p9b8Xir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMadeUtt6%2BeV9nqMyeKtwDS%2FtRuh2Oc%2BgU1fcSbE0ZGNT6Ud6ml9rHa42dEyFoC1IA5CDMEy1BljgHhIRbeXwwuMFpVHPcsAWiJlFbbzxDWTOeHCjbVByzFywo3PgXdx4QkSVZ8taxoWntWEDXL9fXuVoDp0I2rCe8axAxUCgYeA8Kg5Y2J08Z2ZG0rGIKQDCGGa2ol%2FCmLqZIR6fj135ZmRNmAsXb1FCFikWJl2JViNPLTIvBsS2KoPSwnDnMIixZ1CtOsn5pSa1bvV0gn5yWPPtQzjJVh%2ByCj1QCcAfR7gUnd6dlczUM2yi7o1GYMFyAC7nTIyhbbGMRGDpyEnr1YzSQXJrbNEZocMUshjFHuBc0hWE09TFlmgec%2BVlrl1Tgic9bDd3AjqQQrOWMbr%2Bvu%2FnaYgEULZ4TfISHktfVFy7uCLZUn2SWHVBQ2cHwwVQSGLnuOVYFvIBUkO8RvVmLn5bWg8Nwg1r4YvfjuaRC19902KZLWzq7lKZkaIIR9R5jPxpwczQEKCGTWaSneE6pHRiE0exTozlsMhW3ymuU8lrmQ9AO3eeV%2Bhko2Lmd2UYWBpZyx2qdmLBgez6UF5bThdQsBywnikcOaLZBffQd38FEw3nGkFtckvmn8zXVg1%2B3qabqVylf3SDB8KowqLWfzwY6pgEcVUv%2F1gAsB5XV0OdWbMAQLhZwMh3olvKoH1bgBOV1Oh7TielzmP8Gtpe862YlXBqueF%2B3XFNjcrBWgc1hRB9KqetGAh9eOgGNvCAm%2F7QpwpazDWDNkQcqmeySrPavHqbHSKNPlzijLliDJGKY3IgUKfoTbQVhz58%2BJlDCnRDZRbUmYsSB%2F%2BHp%2Bct23I8mi0oCoq5iuQ2K%2F7FbEL0LvwfGi2l2fvZg&X-Amz-Signature=55b477ac95f1b47e45abb42d74479076b7c68968c8fe75e85fcb49309266e6cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHKC2RAP%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIHKsBKvYYDbkA%2B%2BUXWrP1iW3KOyLyUcJCbMshFmVa1y4AiBHSSY3PUUo%2BN7pttSNrB6pfLX6NlUWimQTCJJeFFP6HCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMGKCGCgjWqSM2m3pSKtwDaMxrLGw5AY%2FVUBiv7CwkFRL5TFsyUI1DRSKiWAaiVj4Okeg%2F7G22xhxN%2Bi1WvrPh6LA%2BPr1IzzEirJXcDVKTFxxiD2yVdQQuwhnTEvk1AAnHSRwQq915tfSaxfSjTCHLsLAiQWa6RlG%2B1FLwziErCfAUhQatPKK1utmuNjxSfxtVGyYVRO0LDACPgEdo9aA%2Fq%2BhMyhqoAD7uLVLJ%2BxpADrCz9PPG51Tr0KEY4a7thtFRIvU9dyMwLC4XxXdKbqTQsF0h7BKu%2Fbu1hoNnnDc3XcvAU%2BON3%2FmhjJ1dVmipAbFPAD38nsWwC3V6uPkk4W45JohYIjhYzEB7DO6ZvBtiXQ2gToXnsrj2Q1JtOBPEqmcz6UPsmv8LDV0udJzQiUlBNWy%2BKbAtMYzcwRKJxD8ljLVgEFppeoh21%2B6u3AlljSU5J2wCsldA78WhgBsWvKE3MEJV1RgRVsgv%2BB8YHrZgSY10ObHHtesH7PeC70ZVHQEpQYtNSsT4Q8GT0yPBTbpSXdGy4CLN%2Fi5Kpv%2F4spnQesOMbl3tJHLI79aLcecU10WZEnz%2FhTBN%2FwMe0kqLLxBQPSnEMep2MoIzBmXzxx%2FBbrWFvocqY%2FwN6DuwmyNPgo96Qv3altCifbHCZo8w17OfzwY6pgE%2FjFzHvZE105DnAdQMWRTN7jXjNaYqd4nldCgedg1dUdJC4kqUgzo1FOaVueGdVcbbiTSI81JH7Xr0M28Aeos%2FeWa9R%2FkBd%2B7G4gSa%2FaoBZ3Iul2kNiXEqt6RaHefwerHnpkYKT1GA5Mh4Wu6zP%2FrrfI29QXejkqjd87q5OkSejxl5S%2B65Bn1kN3pHVNnzMbrFEfPalAhVkr9H3A6yJhM%2FaBM9iw9E&X-Amz-Signature=5f41e57c190f6c1f31872990018d0e1ba1bc08289965cba05e2ebedda2df8e54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEIARFRA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDZ4U0IEHHyz3UOtvywiyBsqQRzSLZJ6mGedhUsRXE9FAIgB4qcDrgbP2XhGirwqfh78DLAJLRnR7p%2B8bh3fi1knQMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDA0nOGo32xhjxSFTCCrcA%2BFlpheunLgKnv9j%2Fkp91MsiDFqMAP7gLUb2QdD8DQr5NvkLX6LrVoR82MOd9d%2BbFHuPhGViBpzD72FEJetL6tA536C%2BhDI%2BhaHLUawP6P4mBd4SCxICPNbT%2BMCnMmcTFuTu5%2FL6mt%2F3U0BManlE49V6j%2BdmehTxEYl90F6T7Wtkm2ZHNMTCYLiQbGZ7jjuGETb9GKrU6ksCFOfk6WbdIZzUkxiNg1qDtl9xBuU9OPqyZVuZx7gRY6Qoj2Vx5cpy8o7ql5uamjtB%2BzniPgSX9wjj3B0kb2ziUcic7HCWBGxlu6AFAmxdNgqd%2BIlS3fjBoPHuK8vhToqnv%2FclqfXzsqzHzYAAu0wg55xITbsiWORjvQIHdk8tcpXYHdrh2o56sRLqfR%2BruZxa7RWtly0z1GImMMRV8aOG60mxJs8x4Gke3qP4QgPLty64cRkCO7Bekhsg3XfR26oAFHHEKJWwgOD88Ajtqzz5h0sLEBCvjNbrXCQ6XGsrR1atVINXz0AEH4aJwjEk8o5ZaTbUmF5p4YKfuLlIhX1ZwmHPOeFpPgEWKvYlMVTwfKV6h8eKYXvUjnr%2BSqbeSq50BHwImNTPrIK0YcrR0Pgb7Un4T3et%2BP%2FWvFunvSFnIaO9tVadMIG0n88GOqUBbcsOUg11Vma6SBeh%2BlhS7TccgPip%2FaqB8YKD%2FWuOKtX9x1jFOpUN5Kh6jzTcoZ8K%2BDOK3OIHHLvVQveuWGu5Nd82PLSMf9Pb1pKBOSAaufstMa8Gsage8gzYoXrQHPQcDNCM61Ou7NubEqib5sHnFfKQW81KSiZKdHnn1ZwZROBZ1ZPwkh1Sq1u4T1JIr1HYz4Oy7jWBkvR4K9dVE1lRwhTS8ypa&X-Amz-Signature=46ccbcfcfb20f3866a8811fcd0f35d6506b11a627ab23367c4200691f15f753b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEIARFRA%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDZ4U0IEHHyz3UOtvywiyBsqQRzSLZJ6mGedhUsRXE9FAIgB4qcDrgbP2XhGirwqfh78DLAJLRnR7p%2B8bh3fi1knQMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDA0nOGo32xhjxSFTCCrcA%2BFlpheunLgKnv9j%2Fkp91MsiDFqMAP7gLUb2QdD8DQr5NvkLX6LrVoR82MOd9d%2BbFHuPhGViBpzD72FEJetL6tA536C%2BhDI%2BhaHLUawP6P4mBd4SCxICPNbT%2BMCnMmcTFuTu5%2FL6mt%2F3U0BManlE49V6j%2BdmehTxEYl90F6T7Wtkm2ZHNMTCYLiQbGZ7jjuGETb9GKrU6ksCFOfk6WbdIZzUkxiNg1qDtl9xBuU9OPqyZVuZx7gRY6Qoj2Vx5cpy8o7ql5uamjtB%2BzniPgSX9wjj3B0kb2ziUcic7HCWBGxlu6AFAmxdNgqd%2BIlS3fjBoPHuK8vhToqnv%2FclqfXzsqzHzYAAu0wg55xITbsiWORjvQIHdk8tcpXYHdrh2o56sRLqfR%2BruZxa7RWtly0z1GImMMRV8aOG60mxJs8x4Gke3qP4QgPLty64cRkCO7Bekhsg3XfR26oAFHHEKJWwgOD88Ajtqzz5h0sLEBCvjNbrXCQ6XGsrR1atVINXz0AEH4aJwjEk8o5ZaTbUmF5p4YKfuLlIhX1ZwmHPOeFpPgEWKvYlMVTwfKV6h8eKYXvUjnr%2BSqbeSq50BHwImNTPrIK0YcrR0Pgb7Un4T3et%2BP%2FWvFunvSFnIaO9tVadMIG0n88GOqUBbcsOUg11Vma6SBeh%2BlhS7TccgPip%2FaqB8YKD%2FWuOKtX9x1jFOpUN5Kh6jzTcoZ8K%2BDOK3OIHHLvVQveuWGu5Nd82PLSMf9Pb1pKBOSAaufstMa8Gsage8gzYoXrQHPQcDNCM61Ou7NubEqib5sHnFfKQW81KSiZKdHnn1ZwZROBZ1ZPwkh1Sq1u4T1JIr1HYz4Oy7jWBkvR4K9dVE1lRwhTS8ypa&X-Amz-Signature=46ccbcfcfb20f3866a8811fcd0f35d6506b11a627ab23367c4200691f15f753b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657IOKJH5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T213344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQD9DHtAPpzm5R3q8i8p2TXe6gIABYUiw98k%2BAjTMFZw8QIhAIEJ7Gc%2B7C1cc7G20%2BUzv3Attitkt9jdDjmBhOcz8g%2FfKv8DCD0QABoMNjM3NDIzMTgzODA1IgxJr4loLEML%2Fzyk81cq3APdnvV00IRn0Ujo0F18tRtbyBnSyuzZdXrQp9wfUdr7dye14LrdXe6XVu%2BIsxrm69B0BMdNMLXkjYu%2FuQpva4N32LytMC35SQxjajHsknIfpoH%2FBSe3z1SL2oIhk8aBjgDdX277gMsRPG2AppXuLwxrEbWjfUt8AatPXwbW89lx8p4rjNewE0BwJTqwWoyJylupJuqa%2B6IjJtZBNyve0UOzBhrG7A6vcB3bfstC38f%2BVgf60JWBD4e22mjKKFVpTVWNu7P%2Fw6ZczP5vhluj6bDLEWjFcvukb%2FJe33aR4cumNwj%2BGxTKw4M8C8jtLNQf9LqbKTT5DbJWehBMnT4JKihDdgX04ZfkFYZOg2sOF8r907E8gKK1sOLHhXXUpRIUSnQkRmGR%2F05TsHEJsGjnKloBDFIZmGVX7U7wnj00BiJSNL%2FoEeFQWe3Awrj%2B%2FLe%2FkPNXCMtg%2Fot1cHqWIVwvUdUOlJ3g2vKxuqlyeayfg0lsi6i8b%2B59wBo6f3AG6O39iiKQeslTYlwuGaxd%2FqqUIILfxYoexB9giMAjkLDwYe8lQf3xdx209ojFaBIhT9fqJ20HsJ8UXhqRB8n4%2FlUASlAumGRdDaujuv69u8rNdQduWZiTb%2B0EcfDzeODq3jDDs5%2FPBjqkAa%2BErOwTnMhQ%2Bn2m7c07a5KHKad0AUDCwnZsapkSFGzfJCqTS1rJ8nY6aSW8HEsQ6FPhLgQi2vvPrzlpfSoUsOAlXZCBLFEzswAS5pV0VrdYSUs8yZqbWp6IE29otn981GBxC5dDgTloMyYNERkx5BBLSIAyyts3%2Fb8YoztcyizSSvQ%2BOTnrFqDDagiGA9rPOPwY7k9DXmlzjNelGEdj2o0a0H5I&X-Amz-Signature=52f20ba56b2e0f5ebb51aa5e75faa4a48a60db4eec4c42b5833a83ab162f41c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

