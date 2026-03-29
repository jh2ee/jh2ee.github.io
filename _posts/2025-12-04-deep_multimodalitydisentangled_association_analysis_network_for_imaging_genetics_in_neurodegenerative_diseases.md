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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXEOTZZA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCXBaov2vjDbq2U58BnLHCClP9U%2F5tV2EqFJa10pvyw%2BQIhAK0eJP0xeRPnuMAwFPIKHBYq71pu31MnxnG9kKyiq7UPKv8DCAsQABoMNjM3NDIzMTgzODA1Igxpm9iV7sHOfBxX2RQq3AN%2FiARuwobDdrC4lxmnxb1t%2BpC9UPOxO0TV5Sk8ESI4r2CuIkD7WDdrkOLqygcuiranT81O9PQOg%2BG1V%2BEruoLex8%2BJuX7DdlzRN5UV8xAji5W4dXv2DqlMp%2B2ksA%2FiAwGK5%2F1zH2x0JZBuQEuQRngkPo%2BWIlfBGKpKWOCgUbhn%2Bk7PZjEbvlL6KuBw5ohOPqTXMVwiX9EgkKpJofafQlUIHh3uOvcTxhiOUAKO5fdh4gydukGKgNNnAkaGvOjOQrvkyRdBaZbsgiQa8IDSI75BE1WmotqcP7TwRRbNRvedVdxn6o%2Bbj98zxaRWjO%2B48u853ZuhM1ay9Ijo1WN0QgRpnqT4uJEA3oSkJALsyjVJAnRNULx136AqwqZjsAsBUgGLbyWT5HuRKpOa8YvRSetFR5QQ6rR7ZN5VXATS0Jks6OXQ0%2B8Me%2B5Bc34HFzSYpTBfDDs%2BKeIB5w7FzqB%2F3Ufhogt0tFVY%2BYdm5cB808QM%2BC80qApB3ReJa9gX%2FMf1Zzst65%2BHQB8pA7B4B%2FY3ZV2w0cdoxqLcVo3w49s1tRBuMNxWb3ji1rqiMQYiJ4tmRWUkAh8OSEkSbX6lqIgYJDqM2vwNUtWkbJ9W15GqhIItSEf%2B43ZpBh4g0gM0PjCJ7aPOBjqkAYToYXSW%2BpumcQD1t6kiqhggFZoO8SyuS0iXqla0QLgQsu1uF%2FhX3JWqRLNbKAy2QewaT7TsURQ70XFGQ%2Fud7oYZ%2BY0jY%2Bfj0Owdg%2BXRxNPiPLUJLXlnYGdYCBgUPzn1drQ7lDaIjgLir8%2FqEeaF21rNQhULLkRx0Sp0Kmxyk53mogvE3I%2BdYnmm%2FFlvuEfAfQF5XQn5JmTavcBJ8v6sNEkzmxeO&X-Amz-Signature=89178d50d1fe565d021269d2100c5c4b87716812dd933c71565bd9859cd95365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXEOTZZA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCXBaov2vjDbq2U58BnLHCClP9U%2F5tV2EqFJa10pvyw%2BQIhAK0eJP0xeRPnuMAwFPIKHBYq71pu31MnxnG9kKyiq7UPKv8DCAsQABoMNjM3NDIzMTgzODA1Igxpm9iV7sHOfBxX2RQq3AN%2FiARuwobDdrC4lxmnxb1t%2BpC9UPOxO0TV5Sk8ESI4r2CuIkD7WDdrkOLqygcuiranT81O9PQOg%2BG1V%2BEruoLex8%2BJuX7DdlzRN5UV8xAji5W4dXv2DqlMp%2B2ksA%2FiAwGK5%2F1zH2x0JZBuQEuQRngkPo%2BWIlfBGKpKWOCgUbhn%2Bk7PZjEbvlL6KuBw5ohOPqTXMVwiX9EgkKpJofafQlUIHh3uOvcTxhiOUAKO5fdh4gydukGKgNNnAkaGvOjOQrvkyRdBaZbsgiQa8IDSI75BE1WmotqcP7TwRRbNRvedVdxn6o%2Bbj98zxaRWjO%2B48u853ZuhM1ay9Ijo1WN0QgRpnqT4uJEA3oSkJALsyjVJAnRNULx136AqwqZjsAsBUgGLbyWT5HuRKpOa8YvRSetFR5QQ6rR7ZN5VXATS0Jks6OXQ0%2B8Me%2B5Bc34HFzSYpTBfDDs%2BKeIB5w7FzqB%2F3Ufhogt0tFVY%2BYdm5cB808QM%2BC80qApB3ReJa9gX%2FMf1Zzst65%2BHQB8pA7B4B%2FY3ZV2w0cdoxqLcVo3w49s1tRBuMNxWb3ji1rqiMQYiJ4tmRWUkAh8OSEkSbX6lqIgYJDqM2vwNUtWkbJ9W15GqhIItSEf%2B43ZpBh4g0gM0PjCJ7aPOBjqkAYToYXSW%2BpumcQD1t6kiqhggFZoO8SyuS0iXqla0QLgQsu1uF%2FhX3JWqRLNbKAy2QewaT7TsURQ70XFGQ%2Fud7oYZ%2BY0jY%2Bfj0Owdg%2BXRxNPiPLUJLXlnYGdYCBgUPzn1drQ7lDaIjgLir8%2FqEeaF21rNQhULLkRx0Sp0Kmxyk53mogvE3I%2BdYnmm%2FFlvuEfAfQF5XQn5JmTavcBJ8v6sNEkzmxeO&X-Amz-Signature=89178d50d1fe565d021269d2100c5c4b87716812dd933c71565bd9859cd95365&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCJWH7JB%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIEQu055Gw8sJCD2bHQIlOjmb60IqiaT%2BLQrITvW0M3wzAiAE9C5E53Za2JZ0%2Fir4hr2CthOSVF6CnekJF892fxElOir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMtypmRngZbSNrUgrmKtwDKQPnKpecfWztwHu%2FOFJrmhTVNogkNoBJy1edtr%2FqznWXWXsV3gfxg4fanbRFOLX61cEY2eeG7uv2Dr%2BNHOHMjYDyOl%2B4FBNWdvHvUxanLATPcrJjq%2Bk6A7Gef1CHnCYF3xpRWSPy3YI6TFA9ZIsdAv1cWXhUkYgZfFqfS3oIMlQwmTlIlGY4SldJgjdEHJqiLeLAtCI%2BB29nVBPRYQJXntVGX9xfJsVNejgMV9QbeWdcDnZXWVugbth%2FwbuEBb5OMdzY%2FtbpkUK%2F7WKMH5gS63uvDuxrA5oc8tKSHB20Jel6UC%2Fr6X0OZTV8NRuEmH7kvzFpyxaMQ2Zv42QAtm7jZwQx9Ddwyf%2FkcfVPjR6cOhzHmpJzi%2F16sg8ceQn%2FQKWdKL7j8sl2tYfVAJyRD1JouYUf3HSeN1v6jwlvKbKNTuyiOBRruiB1THWjw6Jft9RKzGx1wFPK12jfwxMFVtBmsuRSrykGlNc%2B9bZXZ9q9Q5UnD7XP8Uu%2B3JxijPdInZi6OYQw13IFTdHugkbrqYyiCkWxiZm32gd8HDClwCRnHceqEaIPslblJBQR0owtjv6ad9g4%2BlTvxQ5uXclCFnYUl3AtvmukMKpkFyJZsbEoEWxLt6SF1g0ogrRSUiwws%2FGjzgY6pgFM9fvz6L3%2B%2BtiZnJzTjpSv4ySA6KaMTm6BA5p7Nh4HEPj%2FWoW0a9IUkBYvkVa6oAx%2B9oYqMBWYmFrmgQhUXBkbr943nKkWP61ccNgSYUdY4DPORR708ds9OIvmDbfqFOk%2FIJvtOm3ZZRZzK1I%2FEFz6QRPqPdmd52amM23GcjlaiH%2B8Q%2FYdWOEDA%2BcJHTL3to6tm0ooI3ZpjleCQrvgNQooiZyF6WDO&X-Amz-Signature=dfbf02159d706295ac6d5798810765d2d666379dd32c562b37bcbb288e467154&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QE2AIMYO%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIDwM9N%2FGxKyAVyaw9%2Bnuas%2FcutrOVOsXzo%2BgE4aH0zpwAiEAs749wgKtPmn%2FEDmax4VueHojOQ9Tm1ad8dJJPmbXlDsq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDCcozNrbqXqkpZKHMircA7kVGTS432uqbYN7QMHHA%2B96tBdHjL2CvJLXYd15wGis%2BRAlWA4fnnGS7XwEW830yiK54lPWKoBe9Mt7AnSrcakeCr6GOfG%2Bp6wc6y8%2B52m%2BFcGvNPLOiqsFWhKp1RR%2FS8eGCMRJMKjBbo5WBoScjDfezm3Zfsu6EnRwgCzC%2BriZAWy4GBvDbtWb5QO5hkZfcfhd4BgfYYuZ4AT7z4XDP%2BMFKa1GhNctHxje7D05f8JKFap752UcniBLuSFGrQJ6bwI9z38%2B55Ksct0aUzNLUynssqpcXftl38i5xD87po%2B2u3b0PWLTha07bZL4PdaHTPYX83zGTJ1PrvUYWCxbIfqlRQmW0SO%2FcEAtfmAatha8mF%2Fd%2F%2F6GcdI1FbGKUQC1d1jFbF90vgAJK4SRpFK%2BvzVJQkPMQ6XKGyxmdGPOZ5qU7bLpsE1tidWU3ot%2Bcl0p%2Fm0%2BRW2MJRoEhjUWplJP8mEdTaIUsZTrsctgxGcXJeK9pblCLBFCHyVc2f8%2B3wbaDpxsp9ILRopOUAzbvQczbKdWHdkJwdTrj3FPtCP%2FEWkOtKvqZEHWg3doAem7nZdDDXrs%2BEEsx3O2OovRwlKrgZZSLHzz8YVvk2%2FkLE32SppgFKJ7oxNyC%2BAW0rCrMOnso84GOqUB77Wb58%2B0oNz5gGTIo8D6t1P%2Fz%2F2CXNy9bqQ9oi%2B2cPEJVcDZ7y4rTI4zvnerEBWyueEGJQCbTwg7KgCGi26iqdf52%2BVdQ14xRVInJMHieLwF2BEE4WW51%2F9yGvFiS87GOSKCBOTA9Uigoe3CxyOz%2BRl8TtxM27qFCPB2PyOsvsmooYcfNidHaqspSLTPqYE6ybZwDu2NXa2XOBFqWcauIJ088RBd&X-Amz-Signature=f7f9ebb535f5619748649b02a8b735b79166aa80e4fb5c02d02e03c23b947f17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QE2AIMYO%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIDwM9N%2FGxKyAVyaw9%2Bnuas%2FcutrOVOsXzo%2BgE4aH0zpwAiEAs749wgKtPmn%2FEDmax4VueHojOQ9Tm1ad8dJJPmbXlDsq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDCcozNrbqXqkpZKHMircA7kVGTS432uqbYN7QMHHA%2B96tBdHjL2CvJLXYd15wGis%2BRAlWA4fnnGS7XwEW830yiK54lPWKoBe9Mt7AnSrcakeCr6GOfG%2Bp6wc6y8%2B52m%2BFcGvNPLOiqsFWhKp1RR%2FS8eGCMRJMKjBbo5WBoScjDfezm3Zfsu6EnRwgCzC%2BriZAWy4GBvDbtWb5QO5hkZfcfhd4BgfYYuZ4AT7z4XDP%2BMFKa1GhNctHxje7D05f8JKFap752UcniBLuSFGrQJ6bwI9z38%2B55Ksct0aUzNLUynssqpcXftl38i5xD87po%2B2u3b0PWLTha07bZL4PdaHTPYX83zGTJ1PrvUYWCxbIfqlRQmW0SO%2FcEAtfmAatha8mF%2Fd%2F%2F6GcdI1FbGKUQC1d1jFbF90vgAJK4SRpFK%2BvzVJQkPMQ6XKGyxmdGPOZ5qU7bLpsE1tidWU3ot%2Bcl0p%2Fm0%2BRW2MJRoEhjUWplJP8mEdTaIUsZTrsctgxGcXJeK9pblCLBFCHyVc2f8%2B3wbaDpxsp9ILRopOUAzbvQczbKdWHdkJwdTrj3FPtCP%2FEWkOtKvqZEHWg3doAem7nZdDDXrs%2BEEsx3O2OovRwlKrgZZSLHzz8YVvk2%2FkLE32SppgFKJ7oxNyC%2BAW0rCrMOnso84GOqUB77Wb58%2B0oNz5gGTIo8D6t1P%2Fz%2F2CXNy9bqQ9oi%2B2cPEJVcDZ7y4rTI4zvnerEBWyueEGJQCbTwg7KgCGi26iqdf52%2BVdQ14xRVInJMHieLwF2BEE4WW51%2F9yGvFiS87GOSKCBOTA9Uigoe3CxyOz%2BRl8TtxM27qFCPB2PyOsvsmooYcfNidHaqspSLTPqYE6ybZwDu2NXa2XOBFqWcauIJ088RBd&X-Amz-Signature=90fe1ecee539219a3e9e1d46924181a39dbee7e942eb8362d1e5719697395b0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D6LFW4B%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIC%2BUxel9h61zbgf3pVCI2KiLJ5azpFdDpoOVpMH3wvXJAiB7jnk1gxObl7I5hGKs4BLm09QaAdqiB5XoK1dFghkGNir%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMUpvgLSsn5VcHaY8hKtwD892f26qdZ5ggHqYq2vR38XEECcDtwml5c5umxiT1AIz7iBIYvRSpkpLdMCTZDQbcKx1Nj5WJoUfLPnf%2FO2hlNEZ8qTRlP8Zf31syxQNK43lcjD8P5hD48ZYnlm%2BFHT7QI4E%2F5xAPUwUIu8Vf%2FOaSjavwDUkxWQ48QZtH%2Fx9Dv92L%2FgMAORDnhOE2ULfIXp66j1en3f2EkdeUGQeg%2FjX77cGGGhcv84%2F5s4%2FGQPbklIBeHkU2i46V4CWYeHqgjH0kLTxaguPNZyAwCsFWR0uuM01el9YtXf5ZlSiFA%2BzLl6c%2BFcNo4Jwyti8a%2BgcG225jugOMgrAIoGuWNK1qVxH88GpTP%2FWDYrDsvwe%2Ba4s%2BAKX1nEq3y9HE0qNOTKf6OCVtrlzTwb4ZKWXAglQ03heEH1fEVSupuBtq9xdeI0TL0WImxG%2BZWnFqYafHNK%2FzrZ31coM%2BMnGkPcJ3mncBWCw5N%2FEAKaYwjqnmRWGB3qvv8sLMPpdW0vqF3W2kNpvditunzP0a%2BqRc8N%2FmFv7t8InN49RP2Obx7jE4kOmiOukiQ9AQPVgEzM0kxOssmJ96gxKu0EhTSbX2D%2FJTx4bieMAOO%2B%2FDSQj0p6dAtFQreFEUzHcg1nCJDQey8pAs0Ucw8%2BujzgY6pgFwp09lOz0vlnucNal5lXRxV47Krq9tvIkGAE8MBlDl8EQmD%2FFXCPl7eqHpnNgJFerN%2FWlUuqDJ3UXfay9Xdu8yIDnPy1x54gq5iXg4gaX8dHKxEcLHUZXuu1JyL84EQJiaUf8YwIz6hgyFco%2FP250%2FB%2BQVhLjfs3e2LYOidWc%2B1sYKyvopm9ysrFS%2BVwl1B9fFRi1Ps5wT5X%2Fzn31sbVHdfd6LEyLd&X-Amz-Signature=3efea847963392754457db01e836b9778c41c2cb270c7e5ca0d525965d7fcf15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRCKPRMM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCICiBQ7LGe50t4%2FaGjidFqmRSlu5UeLBFH1hHbbuBWll%2FAiArQZbp6n1q1EaPnY1F%2Fq9hTQHn95ekH%2FnciIYKSpTW4yr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMwTGV3t6LmmsRigqQKtwD1fahVC1hPNxArbRb2JK8wRyVmI5Xk8hW6SBlBGpNfrJnjpzoXY08iphWfyChgifCWbNp%2FbVhNRMlspK4OFJCl4m6xVusvA%2Bf3vHlg2wEe7Ss%2F6ioS2AWq0BDCFbLMKLlXOl2uSoo5dXOb9iwtquxryaspV0Ie8k5dKsj4LtfGTwRRza0PMcMrxO5EbR9eZQLkAvyJKtd6yIR%2FQsszCIO0NtUhkDaUjlqiMzCCUDpvpvg5jWKkWmYhV6oZ9WbFVP9%2FuNLlSFskOIuQt6Ypds79DC2HK6iIYYzyyBWOEPSHOv%2B5ptbc5TsbHzyjKtSVsJwnQNkALrPL6ZtlxmY7NRz5M6j%2B86QWIAUFyDff5yO%2F4qGHqjphfYVOh8JUxq6qvmZVr8VEP6cPenQjgMjIP2nKFI08VfCgpQniToktzpKJEDtOSF0LoSzHN8DwmtNydp45GGdUZVXpbeU8xLlAF1gELKuFORVRhbffbpKlqOjaFYrGiCsph1K%2F%2BScmGQ%2FjfTHGQQD%2FqNqUrKEwsPOwhUf2mV3ByCZI%2B5auJiwISucvUqOFVPX52YCR8RaQ9i7qPEUoiqL9oAYfBL2AEDm%2Fl9du4PVBiCU3BxxVbAj%2Fs2i%2Fex%2BbHzVBHmVRwrmtncwsuyjzgY6pgGgFjmdsVziOdsbBGumnnNPF2uP6hqAkgGGW774dPiVhTn5wI9%2Fs3K50zOqslF6TgR5rZ3t9yCjXRBRJdGqvilq2qLfwfip8krkPe3k%2BUA0EWLJjP%2F3fVLj4%2BzjuvHyL2fSFJfFRuAQcaTAH032%2Bcivl7Gj0jPUaTCzKTxziRRz8tmvPhmx2kgFTs8dr4pvW8Y%2F2TWizu7cB5OkrrRQDEBM6D4Bp3Uh&X-Amz-Signature=6d120e1b5163a4ac56eec2ab851f5fcfcf8b872a969575419dd0ecae58d461f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z65CITRF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCKN%2Fxm6lr9oOeO3QvQnIFtivr%2FwJDaDm92%2B%2BWX8DFEWAIhAOzqr62Jk%2B3h0TM9w6jg4TnvrkP9U8C1JIbRBxV2fL56Kv8DCAsQABoMNjM3NDIzMTgzODA1Igz3rbl9aofwkIJ%2BchUq3AOaaPjMevD3659xtdC0D8aOZrlPcK6wPkKizxYDmrpNbFyqSdnD4tTlIwwOFkzaqOODrhFNzsXyaeM19Pax7DLuHNe%2BgyLFlVKbCQF9Rl5NYVxF5DD9qq7cFrwfLenHAJQ%2BJJ9hqkYc1fyYs7CgER6%2BZTmjizk%2BO7K2cFB5Kfj7VEKY7gsP0UlHDWZTj3WoCkhyeBdaA%2FSUAKx119Six4qMtNCbJQRDgaaogWR%2F9qnPcZDew%2F4Bd3ycaXHKcBgUupThbVJh7wpS8OIAh2j%2FekWG53T8Djy%2B3Hc%2F%2BlVH3uHHYo8wotCKi43vvPqH6HMBuU8p9hmI2PNk04Fc1qQkaJfE%2B8kCKDdPDv%2BdqVgTtlwSu9SxlatVeEbEQMupkk2vO97ZT41dc4iYtXwgSMZL436mjsgtIAeo%2BWzPNhh6%2FC4H8Aj3DWFUiiFkVD%2FJb3z%2BSxYrrLEDjp37S8FeX6GyETXQ5lune5QPa1srQ2NnqimZK5yoajIcSJpG8RGih%2FkbHnaaPOjsDwjE92Hpb3Q0fhXnOqxBH%2BdG5GwxA5CcQ3eWEGGOCSCUUFir1fM5CmvLaJobn3vVKkamD0BMhUnSuAXujOTTQVJQw64YCA6yRqoCyEpMumMls74t34Mg3jCO7KPOBjqkAWn6Oym8DJMS7TzJ1qXwrOSkDR3pYL4okupQcDqq9PkH2g5%2BhbKcJjX2vz%2FOa8kWHjuABqk52nHG5ImGpIwNZdpMqjoruhy%2B3V5BVQ%2FhjXcl4FJCFyAdPJ5Y6PSEBm49KoxdsQd808EhVjhJzlpJYXzFAPjNtXmMS%2Bah0dWsESSWtsT95TR0vP2EucKVw%2BrNs2fnOpWx%2B5%2Bp8ImE09mroH4mN4ZM&X-Amz-Signature=8f7b0160b83387f7e8b03722ab142769de44e1e1706bded6ae904e4b2702bd39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QZMWNHG%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQC%2F7rANbO9GXzYma%2BwzQJZqKNpr0hYfo7wLQNaiPb%2FqbwIhAMiMW0KXAOIrf1LiigutRgEb%2BHuyzvP9%2FqRmlVjQbMgZKv8DCAsQABoMNjM3NDIzMTgzODA1IgxtJt96uP%2FdlXmD7Dcq3AOq0rs4g16lBMJAJTAzvOHRejrvD%2Brgk2malrAfZPpLNsulQ0aSbu7K3y%2FUxdZQAuWmuz%2FxCW%2Fh6FsQFE9d7UdR7Pe1aVk4TNwiMcjoGf0wjmQ9zDNacnzCbjeQgpGvdQ1toWzXLfIC%2FnsCy7vGeyL3kwzMSvUwtIqQM5erqmNnOJUXghAXK3pmOgJLL%2BT%2FpsIvtEiOi42GmNLY2QbCm%2Bw%2F02vLS3Dk8Zlaf%2BzzaxblStMhrZnlwPAHgCd%2FHF7VGXhrNwCYjPQoPCus%2FPn6k8VFM6Eg3j62M6nlIbQ51t%2Fsu8E2HaM64wx31npzYJ0h7qo8mSx8MhA%2BDBgQBfy5Lp6zSeq8lskCHujaCow902SuhaU03hCW3ObCw7v4arecXX%2Fwsp2ToO8wtNEMwVnjFMxo%2BMaDnY2rgZOrMah5kfXamOn0B89MfRlJ5ewaOizGPHqoW7G7ED3X5mRAj5UQzKuH71PPAUKDZ8f%2Bz9Hg1ZZ1OVI3QtzKycSxbWXhbAG3guEFf89HXeDRTjGXor%2FZ6VXZuI5xYzserfBRHpduTfx2kFh1mCbL93m8zPXWL2QC%2BfEsZN7kol4auRUHxEaDFe4BTMIN97FZTOKP4E42WuNiuTZHk4kyvbcA0c48HTDq7KPOBjqkASfdhzO%2F7LX%2FV8nGCy6sdVJ%2BUFlf2VUcAwreV9IsABhl86P5ek2%2B9yvEqLQBYQofSCsTPRZEIshFmCjblr3bg%2Bsbhb0f7WOMmXrLvGJ1DC8UJuxV4L%2F3mGcZuIyNiooZjH6tyiUUqIlnJeeW%2F5JKTqhlPpFvOTnkoieGRJ%2FW2nJtTCZYUjGJ7jDPYuLWB5WeyfP34AMrCfbcWGOiBvuWzckZ%2FWf2&X-Amz-Signature=39d716965ecaa04d1cd84d7ed9a28daf6eb5be05d4cee6047c762ebf57cb8f58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QZMWNHG%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQC%2F7rANbO9GXzYma%2BwzQJZqKNpr0hYfo7wLQNaiPb%2FqbwIhAMiMW0KXAOIrf1LiigutRgEb%2BHuyzvP9%2FqRmlVjQbMgZKv8DCAsQABoMNjM3NDIzMTgzODA1IgxtJt96uP%2FdlXmD7Dcq3AOq0rs4g16lBMJAJTAzvOHRejrvD%2Brgk2malrAfZPpLNsulQ0aSbu7K3y%2FUxdZQAuWmuz%2FxCW%2Fh6FsQFE9d7UdR7Pe1aVk4TNwiMcjoGf0wjmQ9zDNacnzCbjeQgpGvdQ1toWzXLfIC%2FnsCy7vGeyL3kwzMSvUwtIqQM5erqmNnOJUXghAXK3pmOgJLL%2BT%2FpsIvtEiOi42GmNLY2QbCm%2Bw%2F02vLS3Dk8Zlaf%2BzzaxblStMhrZnlwPAHgCd%2FHF7VGXhrNwCYjPQoPCus%2FPn6k8VFM6Eg3j62M6nlIbQ51t%2Fsu8E2HaM64wx31npzYJ0h7qo8mSx8MhA%2BDBgQBfy5Lp6zSeq8lskCHujaCow902SuhaU03hCW3ObCw7v4arecXX%2Fwsp2ToO8wtNEMwVnjFMxo%2BMaDnY2rgZOrMah5kfXamOn0B89MfRlJ5ewaOizGPHqoW7G7ED3X5mRAj5UQzKuH71PPAUKDZ8f%2Bz9Hg1ZZ1OVI3QtzKycSxbWXhbAG3guEFf89HXeDRTjGXor%2FZ6VXZuI5xYzserfBRHpduTfx2kFh1mCbL93m8zPXWL2QC%2BfEsZN7kol4auRUHxEaDFe4BTMIN97FZTOKP4E42WuNiuTZHk4kyvbcA0c48HTDq7KPOBjqkASfdhzO%2F7LX%2FV8nGCy6sdVJ%2BUFlf2VUcAwreV9IsABhl86P5ek2%2B9yvEqLQBYQofSCsTPRZEIshFmCjblr3bg%2Bsbhb0f7WOMmXrLvGJ1DC8UJuxV4L%2F3mGcZuIyNiooZjH6tyiUUqIlnJeeW%2F5JKTqhlPpFvOTnkoieGRJ%2FW2nJtTCZYUjGJ7jDPYuLWB5WeyfP34AMrCfbcWGOiBvuWzckZ%2FWf2&X-Amz-Signature=f6d5b2c48c57394adc0140b18ae890bbd2b588470f17a98566ef617b3235b25e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXA4MMQZ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIFECYej14MZBHVVUT54HVs%2B%2FjkMD6qqS3a2ztUf1aj3wAiAzqNd8RcYYYRFtokf%2FKQa93yqq7XXSSUkCsvR%2BQE2KuCr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMD6d8HB%2FXDrA8l363KtwD2jya8tq9VWxutz3lLxrxOznzcy2szHFvQDbXlNk1eWzVsWiCuFA1mIM%2Bb%2Bc7e5NHF2WnBJlZhDaRR7vLmUmUfGR92jNL9tdrqF%2FIRjlUuOVM3onilExZNBQlc25qY5jqrHht1D0%2FTiiOSp5qG8Q%2Bf9rlMGLlutbnsjaLj%2FLnS%2BXl9tY1dCShwzahefiT4Ieuu7w5fU1bum4%2FX%2BMU443qzh23J7kV9fuxZmLceFSFsq7%2BzaKr0jnnK2BL1x2Nb0k16qYtJEUOOjHs3VrHuuKccZQVHVE62xK8S%2BdBXA9IcI5DThre1Fz9SalVWrGDCkaOqI2nUkfQXyfOpr4wNzEyZoiOb8lfF%2BMUaXWagLtqp71BGmwYMdNpUJ%2B%2FmBx0HihyjvYFhuNitFrqgDApQSQ0YxFFreLkwQGCj%2BCkPGDPLxnCe1j2VzxDrHkVYCeQryst4DIclTxAReyDnjbILWWbSfyLjXBi8fvhyOcYYpjNXaxcrZB2a%2FIsq%2BnA9GlaHJVhBDAGzW3QKh5eGKdkTQrmYrUXGwslhmgiht0cnLbU1la80DFzf95mlHRluvw2IorYryrhbbw%2BBBcrCumWeXwiS8pvrFx%2FJxQGA3xxIlZ52bB0H613p6WsmipS4gwws%2ByjzgY6pgEvGI9EFbTTbrMgTLTuH8zmkw3CYwZROQBlK5GQJ0nlYhoGoDNhFJ7S0fbc0TVLdgsvMW90pkMmR0Sc6zp%2BxSSvBSozDxClzZjgRMDub1tXAHs3wFWfNqJDlCssf5gB8GA6qx1TONlSY5GWthNdw9f0XuMYdeAr0QU%2FvlBdvNRsOUcj4fOMkBOrpM%2FxYGtBAZEc9TTJfOC9uVdpTNC3cKkUAAEbooP0&X-Amz-Signature=a92e5e0e6b2dc2aab95a482fdddc3ec9fa65256e15e4c634f8bd2f93a9b0bde9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFQJJ4P6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIBwlgWpnMJIdi5AfxBJib0szqCg0bGF6VuSY331xQi9KAiAw6mPeCT%2BMlDpdN37bE1AL5Qhrrzps4Rm60mTlhYFn2yr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMLaIswbHlvZvQHlgbKtwDKs34wSXJXj%2BG1copl4Qz3yDbn%2FlBytxyTRQNA7zr48wsnimS4vLFf1YWN5Oz6DjPIyaylfbchCwF%2BEX%2FRcbs09gru96a6qKiVf1yodETI7rOD3B5GM2T6PlwbgGLv9fW6KviwGkiU0vmkm4PyOmSJjyB0yo0Trl1RY6ijdnGp0So0%2FdooIg1UlHi%2FClna9S1jghzSAJUGyTOas99v3cJegHBJ4aYK7Bcv1duLPqq1cHv2kOB9nK7BPK4lC7dYfxm18CtnM8YZ4klaZTlHogcLRQ2yLNJdvrO4tb657JpmSbT0o%2BM1HRYUPSW%2FWP4LGslN%2Byymqmnh3W1cv5A7IhN3o90FZi2KtaLcNLybWoWh5lbVufs822zV4sZMHKqgEyDnAk3tq1sZMX4jzl1B625MWCBoyGwJcNyBxWqlWkZ2grpkxK00afebdfduHj25yJqlnZ1glp3tl6VvVqs3cGOtsO1oAMwKBSiPFNTXak6IloaoM3Nu3ljzCQ%2FjUgS9InTQGx71L0GeroDZtdAqd1JQfT4YTWh57UJ6VxasFOTHuaaZmjRlRsBcmJRZGdVEwGlsQaUATdVqYCb92yrI6aIKl%2BW5ZL%2FyGAJVX%2FedW7cNs6SBcUOQTZiWfxJQ%2Fgw7uujzgY6pgEhpZnS2uxCjZaif1Ue0Yulr7aPoCWTtIaAX2ZTmFAfpzulk7%2FVz3pC3RLEEC2vScmuncENzzoasnLmw%2F40FHnN4Bd5%2FnAIwAmBdcfi2pUXZxW9jjt7KOH08nFiKyP2wiR5sxA9KGmq6j2508tc6b5wnAcESxG19oJoWm3f9A3rELlqOMMXFH2TQuqJCuM0XGE%2FHHinqEhqgQGWwTQCp0RDi45xGorh&X-Amz-Signature=a50187277fb693ffb08cc37e87763130a8621b4f143170dc2849a284907d5d97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFQJJ4P6%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIBwlgWpnMJIdi5AfxBJib0szqCg0bGF6VuSY331xQi9KAiAw6mPeCT%2BMlDpdN37bE1AL5Qhrrzps4Rm60mTlhYFn2yr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMLaIswbHlvZvQHlgbKtwDKs34wSXJXj%2BG1copl4Qz3yDbn%2FlBytxyTRQNA7zr48wsnimS4vLFf1YWN5Oz6DjPIyaylfbchCwF%2BEX%2FRcbs09gru96a6qKiVf1yodETI7rOD3B5GM2T6PlwbgGLv9fW6KviwGkiU0vmkm4PyOmSJjyB0yo0Trl1RY6ijdnGp0So0%2FdooIg1UlHi%2FClna9S1jghzSAJUGyTOas99v3cJegHBJ4aYK7Bcv1duLPqq1cHv2kOB9nK7BPK4lC7dYfxm18CtnM8YZ4klaZTlHogcLRQ2yLNJdvrO4tb657JpmSbT0o%2BM1HRYUPSW%2FWP4LGslN%2Byymqmnh3W1cv5A7IhN3o90FZi2KtaLcNLybWoWh5lbVufs822zV4sZMHKqgEyDnAk3tq1sZMX4jzl1B625MWCBoyGwJcNyBxWqlWkZ2grpkxK00afebdfduHj25yJqlnZ1glp3tl6VvVqs3cGOtsO1oAMwKBSiPFNTXak6IloaoM3Nu3ljzCQ%2FjUgS9InTQGx71L0GeroDZtdAqd1JQfT4YTWh57UJ6VxasFOTHuaaZmjRlRsBcmJRZGdVEwGlsQaUATdVqYCb92yrI6aIKl%2BW5ZL%2FyGAJVX%2FedW7cNs6SBcUOQTZiWfxJQ%2Fgw7uujzgY6pgEhpZnS2uxCjZaif1Ue0Yulr7aPoCWTtIaAX2ZTmFAfpzulk7%2FVz3pC3RLEEC2vScmuncENzzoasnLmw%2F40FHnN4Bd5%2FnAIwAmBdcfi2pUXZxW9jjt7KOH08nFiKyP2wiR5sxA9KGmq6j2508tc6b5wnAcESxG19oJoWm3f9A3rELlqOMMXFH2TQuqJCuM0XGE%2FHHinqEhqgQGWwTQCp0RDi45xGorh&X-Amz-Signature=a50187277fb693ffb08cc37e87763130a8621b4f143170dc2849a284907d5d97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLFUXCPG%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T101929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIF7HMWRtA888ocwf7CxsqrLOZdo5Q0v9EF1iV9%2BkuD3kAiEA2kySpziOBeRwQl2t3tPfbDPPwEeVgREDK26m8fkdyCkq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDHlKP9IqeDCR%2B67rFSrcA8ETDkNzvB9HCg6ePmSZXj6uCizX0j73yiLGnDg35Xq%2BKiqCk1knL3e8f%2FHvVfMA7xQCLaqHvEykWk7D033ZQrJDq84vg9BANk9O1x6oYqE7QRbcgxZ%2FrogGhoTQ0WGtFaqIYsTazE2apmwbvl%2B6Ef4CsQqnEHYI%2FM%2F%2BQNwYqXFvoebRFrKN6kh6xXdjh1J87NURDRgF7qV8rOn86lOxgyZXpiwJrVPf1gyIxIjnOcrJ8oYm5w9PhmGw2ej9y13dHGMgWn1v7t8aDwxX0lLskmmnscgPNpIpOfOkFQjLK9eBw8dgz7u6AISF7LLfYUuBeqM4qBmTIsOVXLPz5sGe9ygrriHiSnZ4lARfHvvsnY%2FPitImKlTU92jTj3%2FbCTHpuAwMEzomwkOBJydghav7%2F%2BcNN2eP0xFwO9d8PCzwbioSO72YBdXsBPjUinTparGjTp57u%2FZP07iPb9pF4X1Hjb%2FlRotHEXd5fe0nalRNcyR2D4KtprpDBAIKT1hG26yQOMrQBNCRGbcx84d7qKQmMqAI0hGNcN1Y5oXkYEYxMt7K220K0H%2FetjaHE48Rj5Q7TVFQ%2BjQTnMeT84Li7oZSl5cfJPFUHpfG7VdpSJXe2o%2FOMnzl3Ms%2FZhODAShoMJ7to84GOqUBemAl%2BsYrOdPiG19N8favq6%2BrfU8i6Pz57kAj%2FkNo1sBCYhNfYDGTHYSYEkVS7eSMIPuXY95J%2FCOi1iO1WXmVzVg7x%2F4fxfr5Iad1WjJUcoXdq%2BYlKvDbfQiukxLA%2Bout6QVfujq49tvKbSZ5wii%2B%2FQpOFhGwuAP7ltFjCkiN9V1Re3PmhzkrdjpE8nibAgGUDfqrjvi0FzYXV%2F12Mu%2B%2BMt65i5CK&X-Amz-Signature=89366604e9d80cda02b72d57b8d315697ac0e767e9ff15169b68d6688b362681&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

