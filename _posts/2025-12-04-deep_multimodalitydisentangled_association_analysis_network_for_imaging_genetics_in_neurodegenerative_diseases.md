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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZJLQHAT%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEQsEoTa%2Brdn2gLYAD%2BBAXtyJCmrWtPlnrtdVcMlU%2BagIgIeiCM5IfWHHp792cF0LK8dPxEamJUPFfHxlgSkzwTvEqiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGHHNj74zr4FexWwRCrcAxuMmH7kCMGVH65KZX7O0o7y9fKFnrCxI7gE9XukhUrpBPNvnOa8s9TzHxBxKhRIGnV0nskeFRB8iXxsDmk5ZCh2Lz80UdxFjneta3n6IBxzZZ10NrgYk0ZOXA01i0QMDF606SYvtGOzKao7ZCBxwbG3DGBskoiCaI5Of2FLeqgtP9KCkqNpwBranykWnyN8mxSomETPF3i4TvY1sMQO2rXJKViCZD8P0oPWJgKRfT8ddI7eny1cSDUSL%2BKAwBtLEhpqm%2BZzWaBmDYNTIWvdCxQLxhoePBmsO4%2FesLUzfL9JMZ%2Fh8f3oNN6zzxK8DGYKE%2FIikpxpEI7moyXdegd12BvO%2B%2BYEFNKMxnU2NXuqfsVJtgRoM7%2B2r0WdDzrWUKiWlF03rWvw9cYJQbixnBAzGrATccTCfTMEaeAlxbpHiCGzx3DPqsngF3W742QCCTPocF7sChQhWRIZba5QpAbqWCqYTcxkUwpa6Mdr5oRbBZyUwUmxN%2BmDctWwgkQwN4%2F%2BgtmnVXzbnz1A4dyHLSf43MaTHdjzrOfy26Nks7R%2BEYc3%2Bv79lA5anV%2BoOIOWHHxyDNriquO5rGclgEvwvtpqtdXcfk%2BB4DJKyxIxMFiNI39LK4aIfh6fxPHvFgQ%2BMLXcwcsGOqUBlxI2%2FG9%2FMEYUE0NqGFEfTRjgEGk9OIeAL%2BmOSivWbd0oJI4s67ZMLGGzAXhWtFAERpPIr6VKG5Zq3jMFHAzvdXKv4nec%2FIB5Nk0jFKe%2BH0AuvjN1zSDgwkKJvvkmQtPykzderS%2BZ6xg1P2yuVUUlu6TMBYmwSMkQ9zsPIt1hkP1OFiEUJEUX%2FqMAmySH9d36GDw7rfvalHXKfeez4%2BL4pLUgVbaW&X-Amz-Signature=c18696e7a2c40d15a3128e06e61423beca6e0fc7db1b843a7ae0b068ecc4bb8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZJLQHAT%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEQsEoTa%2Brdn2gLYAD%2BBAXtyJCmrWtPlnrtdVcMlU%2BagIgIeiCM5IfWHHp792cF0LK8dPxEamJUPFfHxlgSkzwTvEqiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGHHNj74zr4FexWwRCrcAxuMmH7kCMGVH65KZX7O0o7y9fKFnrCxI7gE9XukhUrpBPNvnOa8s9TzHxBxKhRIGnV0nskeFRB8iXxsDmk5ZCh2Lz80UdxFjneta3n6IBxzZZ10NrgYk0ZOXA01i0QMDF606SYvtGOzKao7ZCBxwbG3DGBskoiCaI5Of2FLeqgtP9KCkqNpwBranykWnyN8mxSomETPF3i4TvY1sMQO2rXJKViCZD8P0oPWJgKRfT8ddI7eny1cSDUSL%2BKAwBtLEhpqm%2BZzWaBmDYNTIWvdCxQLxhoePBmsO4%2FesLUzfL9JMZ%2Fh8f3oNN6zzxK8DGYKE%2FIikpxpEI7moyXdegd12BvO%2B%2BYEFNKMxnU2NXuqfsVJtgRoM7%2B2r0WdDzrWUKiWlF03rWvw9cYJQbixnBAzGrATccTCfTMEaeAlxbpHiCGzx3DPqsngF3W742QCCTPocF7sChQhWRIZba5QpAbqWCqYTcxkUwpa6Mdr5oRbBZyUwUmxN%2BmDctWwgkQwN4%2F%2BgtmnVXzbnz1A4dyHLSf43MaTHdjzrOfy26Nks7R%2BEYc3%2Bv79lA5anV%2BoOIOWHHxyDNriquO5rGclgEvwvtpqtdXcfk%2BB4DJKyxIxMFiNI39LK4aIfh6fxPHvFgQ%2BMLXcwcsGOqUBlxI2%2FG9%2FMEYUE0NqGFEfTRjgEGk9OIeAL%2BmOSivWbd0oJI4s67ZMLGGzAXhWtFAERpPIr6VKG5Zq3jMFHAzvdXKv4nec%2FIB5Nk0jFKe%2BH0AuvjN1zSDgwkKJvvkmQtPykzderS%2BZ6xg1P2yuVUUlu6TMBYmwSMkQ9zsPIt1hkP1OFiEUJEUX%2FqMAmySH9d36GDw7rfvalHXKfeez4%2BL4pLUgVbaW&X-Amz-Signature=c18696e7a2c40d15a3128e06e61423beca6e0fc7db1b843a7ae0b068ecc4bb8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZDBO3JC%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDPLKcyvVJJMDKo%2F1VnwrTmA2NNSYBzrxFtHQnRUIwy6QIhAIzUlUgiG%2BYqwPT0YaauL6M4lwD2%2BPcaBhBZ3tFrKsoRKogECL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxlhkhv2jTD4WRMFrEq3AMSJZWtFoUHuCG9xCWUgELK3qi84cqluJSEGPANOhNZNBptRuevzxJsyGqL2qm0ljUQJj%2BRK1zZCwd3nvtmQAhlQ8YAjHpZOGp%2FToKi5sdAGaqxnTEY5VKpZrjVGyPMTzt61343zcLxfPdN8JBYPpuib%2Bx9FN95O1Q2jJWAQr2DrWyDRmFkxwo%2BVYjFEBQiZbLdy783lqQGNw6ko4JnmoBxrsQf6MvO%2FzBayTanS%2Fu%2BV%2Bz2ieux1DM65GQ8UtN0AnPUVOv2WdI%2BCujwuvsh9JTzAdrlgfNx6I5yZls9s5bOR2iEA5xQ61nYlh56XXLFkcsX%2Fe1gov2NSMSc2kZDGIt2mq0y%2Bd9dRuyLBebDVDeQBWoJB9LVCSMse4aDRq6xmutQK9aeUuMA1ll0%2FiLC6bslhIao1Tj1cHQ156kNP5avgceVd1s36wWhDOGFIvVrgKnONuh%2BO1sU6LY9CQB0S6gfmSyHPVE85g5s6KU9KucpIUmFmsr6ArGhU84MC4I33nreDZ1KWr0C9L1L52GZhaBqEAA6ff%2Bf%2Fe8oka9J3Ohj%2F3D15995dm%2Fgg8ZQxRgSTSpyH1eHi9SZVq%2BJBzSnQqIwPp7DCHa%2F8OAxrY7JFZoDx61lnXBvVRQrAC1NYjCE3cHLBjqkAQpPBCfX7G9yhFv45reMGyQp4vvZ5n5J73B1ym8pN6IuUqa9P27KqFcxgyiNPXBFU5e3xL89cuT3H1GkfUGTQ5V45rfeOWVNw602UC5RnPt4RiNbFauY8wv%2B%2Fz%2F0wzkV7ksm%2BbyMGYRJpSoSt34eEuLSiCrepdNAstIKRTg5szy%2BbkhcreZgCCOwTA1h%2F5E9NGrAHjTGaXwyt5HA3a1eN7zcpY3M&X-Amz-Signature=22635418c43676a735ff8af63b44ed1c641814d5984d93b3ac82f67f95cd2ab2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBOSFM33%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDinAe7Njm%2FWvgmjaf5%2Bqhi5R9C4ClUXbJpQV3qHwJN%2FAiAnx%2F5SFSdhX%2Blj6IjtOBYvi67tbHfkEW4pfUx8SZcJ4iqIBAi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJN8iFJAnirqF5HUzKtwDZyGBVnuVyCIDwoCtfk62uKrHzoUqPBocVeNPKr4oAxtxx7SgeCzIEp46q%2BNSKVl43%2FuprYhY1OvKNaY1meguP7XB2V%2Fo2wxdezcYEvDDj2mI0%2B2YVfyOrixj1P6sfiKtV5DF3EXUDl9HYu0z8TCsd7iiV3e71HeM3BD6iUuNGsYZsuU7UWYH3ZcmpWFOCTm%2FhNV%2F4zszt8cn8ls5YE23vkkMm8Ekjl9d9j6G6MXNvPRj8GiftQxpBxfNCnTN9dasNGZZ%2BY4EI8SqByeYKIIIjNGX%2FWZtluxFqVWlAQ46sI42G0Jyl0dT3bOVOoh%2Ba9eBkCmRYtFJauiP84yTxe4Jitgih8PWZLSHwrcTWSlxpI%2BLEVoylqY9d2gjvwIFtOkVoRnWcPNu2eAc2xSnobRbUtwUShDm6dLQjNtbA5EqyWe%2F2j%2BY4eAFshGCx0lnklVYWSiv8P%2BbG49ojpM%2Frb3J9DdYYk2E9ywxgtH02PFwugubXO3%2BPUM2O2HX17it4oBx18yCLvqFLFZwhEXRfk%2FPCxvGGQOVcDPVSY4Rlgi%2B9M6SkcZbFlD2Y9gTZjq6FmbXVv5wXkzwCrYmGzmvd8vF%2FOM3CU5Pvh5uB2kEj02trGajeDuTFVcofG05CX4ww93BywY6pgHj5q6O17H2%2BIhmcqgdAN8S%2FDCYnUBvtyzZDcoLXbyaxwxFnp%2FY8HhAMJwtqJmVF3i0XVMm1OB5orE002JcURTJb%2FwXcqTkv6ru49EovhY%2BM6VMpSWV2%2BK0RiCDjtpMnjOPZXc6by41vsx32ZRgqF91Sln%2BOKuaJ%2BkcTmt3AoiH75Fu61%2FSw3w7qosmJMYvDJy448mxGPhq2jL80q6sv%2FQZXhQ%2B69sn&X-Amz-Signature=9626a381e187950768b478bcb57debd8a5bcd486c56f85460f82002a4ae2227c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBOSFM33%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDinAe7Njm%2FWvgmjaf5%2Bqhi5R9C4ClUXbJpQV3qHwJN%2FAiAnx%2F5SFSdhX%2Blj6IjtOBYvi67tbHfkEW4pfUx8SZcJ4iqIBAi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJN8iFJAnirqF5HUzKtwDZyGBVnuVyCIDwoCtfk62uKrHzoUqPBocVeNPKr4oAxtxx7SgeCzIEp46q%2BNSKVl43%2FuprYhY1OvKNaY1meguP7XB2V%2Fo2wxdezcYEvDDj2mI0%2B2YVfyOrixj1P6sfiKtV5DF3EXUDl9HYu0z8TCsd7iiV3e71HeM3BD6iUuNGsYZsuU7UWYH3ZcmpWFOCTm%2FhNV%2F4zszt8cn8ls5YE23vkkMm8Ekjl9d9j6G6MXNvPRj8GiftQxpBxfNCnTN9dasNGZZ%2BY4EI8SqByeYKIIIjNGX%2FWZtluxFqVWlAQ46sI42G0Jyl0dT3bOVOoh%2Ba9eBkCmRYtFJauiP84yTxe4Jitgih8PWZLSHwrcTWSlxpI%2BLEVoylqY9d2gjvwIFtOkVoRnWcPNu2eAc2xSnobRbUtwUShDm6dLQjNtbA5EqyWe%2F2j%2BY4eAFshGCx0lnklVYWSiv8P%2BbG49ojpM%2Frb3J9DdYYk2E9ywxgtH02PFwugubXO3%2BPUM2O2HX17it4oBx18yCLvqFLFZwhEXRfk%2FPCxvGGQOVcDPVSY4Rlgi%2B9M6SkcZbFlD2Y9gTZjq6FmbXVv5wXkzwCrYmGzmvd8vF%2FOM3CU5Pvh5uB2kEj02trGajeDuTFVcofG05CX4ww93BywY6pgHj5q6O17H2%2BIhmcqgdAN8S%2FDCYnUBvtyzZDcoLXbyaxwxFnp%2FY8HhAMJwtqJmVF3i0XVMm1OB5orE002JcURTJb%2FwXcqTkv6ru49EovhY%2BM6VMpSWV2%2BK0RiCDjtpMnjOPZXc6by41vsx32ZRgqF91Sln%2BOKuaJ%2BkcTmt3AoiH75Fu61%2FSw3w7qosmJMYvDJy448mxGPhq2jL80q6sv%2FQZXhQ%2B69sn&X-Amz-Signature=5aeb7bc674f142cccab31e771302dd474b6f640758a05797f35ea4aaf6c956d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YA2DMYV%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDzbcSDQ0oG%2BS2l20xh4JFwDggAxlvt95R66pDHKSTCbAiEAm%2BMY%2FnYqLYrfZgwIs99fd3bTonZ8XJXoBiR5DON16TEqiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO1zhACcAuLIgYjY5ircA9EczgQMgkVSN0hG6SijfEVDzp8OgyrdS8oI3h%2B29cvVNDEbQlg7n%2Bmbzue7S%2FCM4k2phmJQhOHEkQvKs1SR1twuBykXouFjU17yyNcuSoKnm6a30tUAo0V3IQBNdBOvSPV1DFek6QLfwZeogIGfnYC7dxRmu%2B08DPM1MyFpV6Au%2BMvvhTPA6YrcqYEr752FlHbSmc5qm1EYc9zuWjT0P%2FDV55%2Bn9Mut3zCWemroMbKOYIATIpjsD%2BlCB8i2L7LdDfjcf3wQMHh9HgnWH8mkOzUtaldJhE5aqMTI7ZW8kFuiatpX6lMXeu0bSKKPnIzUhDTbef4qpI40cFRrBht9k%2FKyqCLuDG4uHCuBThsTWg3JSkNSqP3x5NkE1PSEXetFXEBqAvwDwXpEeYoblJDdvAS%2BErcMuLkIDm5IgjJao2AvKUylUtDksaJPsJqGueYtE7iJiyAjft9nhbyuQxZ2h5Qkxu6TebFnvq%2BP9qoZ%2B%2FcTGDsb3icjPYK10wJBRq6G2M3TNcFPud4VTOalEvBp1tIcSdjR8MR7hyJD0xhqdRsaMJ%2FGWXDlH4pTCNLXmSZS6cD2Y1uxgW5uuYOorTNcrlPpw9F3kQEqROJpoGiGC3trbX5K02SBQIDDleJLMJzdwcsGOqUBVWylTUPv9E1YcsNurvdJOBfTI5uUUPBrRrhQ9%2F7W3OCLIfPUWcYJz8fv8aFj%2B2Uv0NRDIE8QRhR4zDu3POo7sJHGe8gmqRbtZRI6zuR5Icbj2N1l%2BiMKSxje9ja7%2BCzopd%2Fc8yShONbkJlk2qQKsdZ8pgAI2YJPoQ%2FvBylWwucDtmv753AnDeRmzaI%2FtOnJUwLAOUjjOvbHxJy1M28TbSC6YPJvg&X-Amz-Signature=d5b660ce5d38852e07cd6bc5d79518685a4df3a4e9a53a4f9410d5dbfeca69ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXV7QSF2%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061806Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCXLLwA4j65RgqLbhbcjzLYvqc%2BEFguuoKAGhI%2B%2BS65gQIhAOk5GfrPPJWDpeR%2BV9ANBbH4rsC%2BCmL40TLg9HzG2vqUKogECL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx0Og3qwWax93DIygwq3APWikvl9jJgNhC62FdSAfcMIcmCJ%2F3znCGji9YTqbcmGsYWC6ZLpJ5Z15RR11LqREezUPbII2VyTbO%2FyVXbYW1VoM22J1i7s8cYma1AOxVOl9CTyFaRgYcJHqeCmBG8ghi4ChitIHbmAOvX4OG2BYRr3bYiutQRfJQ9REJnrReI7llj%2Bmprif1BFx5%2BF3gqDk96IJODBoVSLc%2B2nMSNBgUVy%2BufROeBmx%2BS1WBwDNa1kd%2BFsAD6wLb0w4cvenmUnG0Eekpim4saXzQZVZEE2fOaeIn%2FqbWkU8%2B9Vl9xg2oQLqcLuxFuvForhsN94x246Qk9p20o1M%2F8izJ%2FiB25O6PHtdL7a5RX6k4ApIhS6CtkKTS2seQU57oy7K8xwh4qKHv8ccvIRWO49K0dOek%2BFNorn8GBtQu3uvJlqgt1mTX14FfO9bx%2BVizzdk25xZXZGB2pY%2FFGNFOlrDoQcZXHxhBZF9pJIMpzOVAZtB4VUexmmn4vHIP1dqP2RvhTUZIkO1OXVz1yUbsh0VJX9WYSbaY%2FcHLlMENtRDfyGV8v9Z7iWk1I%2FT5waiPGcle8%2BIH6hGDFPZWZzFV2iXVkjLRTpA7FUBLG33mbLAfBh8WNDqVqgA872Gc1Hbri6%2FceRzCV3MHLBjqkASrZfc1tb5QoBlf%2FF6p68ExuuEScBA4mXWAcJcSId8nUUdJwQ4XAk3ftPLVa39GqczP9yTvb0RsoBSDUN6m%2FD18R1fJ0IzpzCb2eHAT68Cy6kECzuZTnVQBb10SkpkrGZQw6pRvEN17kHwcAGkubRVwRN%2BQeEsQdZftrehOBqtCIU7WVvohugnd1yFaQDFahoKCSDJ1dNbgCiz07FxXMCB1M6aQT&X-Amz-Signature=1b0eae3e06c129688ca4abe9adc5b89ab4b25776e8a2f398342ab9f06676b9fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L3YSSAN%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHodPgmg6RAAh%2B2YmRHzMbaASMmY%2FbZRE3A1t7tnqJcRAiEA%2Fg7kPQLox5Wf0ptn1hl3GccgCyvuXa7W6cNxI2gDVCQqiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGSep2VIE3r5gifUXyrcAzBQWQvpUJTh6Y%2F8P7xy2JS4pKFCyc3cvVtYY9rkCclQfNo14svPRKZluS%2F62PzwkKZZnBGQUCUgU%2B4ZGTt5MWiBpQT1kRr559MR9YytISmjUfljFzsPbz16XVM5wQxD7KEW0vY%2FkayoH7TQRuA9S7kCem%2FKwESacavJYEsooCp2IJJtUbh%2FP%2Bnonp4ngff%2Bid%2Fjb6shPQpSAxj0Tg6GAuNXsL9CE69J8TffLrYfUQCknIzL6%2BPDwFbdo897mad5FbZY6gc4EpBFq%2Fnp32PgBZQ60k8I%2F7ARaZ%2BhmauLw%2F4NTtLz9%2FcUYq8%2Bg%2Fxica6RtX2UTydHXklGRH%2Bpf1mXysVronBJ6fUS%2FOvUNRQNwwx1S%2FJPDESowNynvthjwD4xpzQ%2BiQ8afMxeU9n0JSwIsiglbbTLwnszb9cjEiN7dhWcz3tJ%2FUHIPzm3%2BhAnhQd6j40FkxjQYsM5P67bdgoNoWL%2FfBccH7SynJwYQZPCgmHqW44Czgoq0cPnVi5Q%2BxOgtIAqRyD6pFaLwLNaVchkwV9WtHr0rUbqGjt4V2krzlelcX7vfHxcLhsWNjOp7tZULZvI9vii298T8rcLWHUA6bQpsxtaCznKQjThDkoSKH2fpVtoVk9jV4IXFS3NMIbdwcsGOqUBAxoOgS3KA2wmh%2FGI8PKX1N2OHcNsk3CCSGtDsM8rHeyl8t93UGeDd1v7mkgkupOfOWbKxaFzM5%2FmUN8l7ySmXRDtv4MHTs3zMowpQZR%2Btp1M7nUPqpaGJ%2BHhq9XMjNZRFCzS0lk686cgp167WltjxzpeAShfyM457lkCDapcZUWLxgiIavSKT41xYk00GTOWXED0ehObQs%2BPuuL93vK8nDPuYwCe&X-Amz-Signature=25e0c288110399df4b1dc6b41f7f8b194bcc866e7cbf26869ad7847fb78d2d9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMG27V5A%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB4FR%2FEr5VWKPYbitSlbZduYJurKoJB8vJhs9bGkDosfAiBX%2FRLdxCOLLQNNmzEYCm7l82j%2BTm7LDlsJgkBT7DOjaiqIBAi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuoK0Me1%2F3sIwSeCFKtwDbX4TNWVGVwo8Tf6iC70JrRIawA0LpBjRTqvo17%2FaPBi63nZzHVaLMgvFByj171m8B6jwOm5osYUHM0PzVZz4tLAWP2nSbGnY%2Bh1BwPBHi%2Fb5VqbACn8VIWjqa2xk709VMPyqqQoH%2BRciRagf4HMUNAEfVQFqXlCcp1sXmq%2B%2Bxt8JwkB%2Ffw9mXOqEDeems0ZDnZdLKx2kzRRmbbAhTMtj004CP5WQTjjDMkW6itLGXc%2FJs7Y6XZa%2FANq7uh0Ve6GIYRmBUqzNmRLTKG9eNasPO7jB1fo3fg3wq7JG%2BqOUIjoi%2F7fTcoZbf86QVZTS4%2FKXchQKY%2BCmrnUOOwqr2%2BTioClMZxmGlEoZbEtfGybI%2FPE7ev2aEk2T%2BZ454EEEGbuCb%2F5vrItJTH2Tuj9Wk0Nw3yF6QnajM9EPi0ka7ozAVCAjh8oUU3NCoKRTZXs%2BRp%2FcSoZhBapiop0QMu7nfpfp0%2FbZoKa2gz96p1iwMVfwPDX0u5ZjIpA9JZS7YUOOB2s98ZA%2BYUsvBrRBYp4MGmQB0t3GWSluS7IpSD4I4HK%2Bo94FkXXzvw27rZFYlg1HN5i%2FlqtqurxgKjuq0mfhL%2FdOZEoaaYTR%2FxpE54j1UB9kvT76S%2BwVLDmr2pI3m5swltzBywY6pgE4GAIPu2OXckTLMnHPa9nd87aztWGGZPIHYNhgOTmNJfqFNNk53%2BgH8rI5oHYniIP%2FwQfTQako4BL9O5upPB81upnwmEOv%2FlbeZm%2FHtcomCVsYXKVKmuK7SFQhI74sNFsUb7pHk725%2BTpGQEHhsg1wdNzbnPH7s1DBq25Cv3dKub5eORRtcvr1UeXIRjUJoz1F0pCaI6bnjb%2FdQLBm65KP5mm8DFh%2F&X-Amz-Signature=1a40d553301992b40f35cd30407bb61ab3478b85e406617920a7825c3a7f050e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMG27V5A%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB4FR%2FEr5VWKPYbitSlbZduYJurKoJB8vJhs9bGkDosfAiBX%2FRLdxCOLLQNNmzEYCm7l82j%2BTm7LDlsJgkBT7DOjaiqIBAi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuoK0Me1%2F3sIwSeCFKtwDbX4TNWVGVwo8Tf6iC70JrRIawA0LpBjRTqvo17%2FaPBi63nZzHVaLMgvFByj171m8B6jwOm5osYUHM0PzVZz4tLAWP2nSbGnY%2Bh1BwPBHi%2Fb5VqbACn8VIWjqa2xk709VMPyqqQoH%2BRciRagf4HMUNAEfVQFqXlCcp1sXmq%2B%2Bxt8JwkB%2Ffw9mXOqEDeems0ZDnZdLKx2kzRRmbbAhTMtj004CP5WQTjjDMkW6itLGXc%2FJs7Y6XZa%2FANq7uh0Ve6GIYRmBUqzNmRLTKG9eNasPO7jB1fo3fg3wq7JG%2BqOUIjoi%2F7fTcoZbf86QVZTS4%2FKXchQKY%2BCmrnUOOwqr2%2BTioClMZxmGlEoZbEtfGybI%2FPE7ev2aEk2T%2BZ454EEEGbuCb%2F5vrItJTH2Tuj9Wk0Nw3yF6QnajM9EPi0ka7ozAVCAjh8oUU3NCoKRTZXs%2BRp%2FcSoZhBapiop0QMu7nfpfp0%2FbZoKa2gz96p1iwMVfwPDX0u5ZjIpA9JZS7YUOOB2s98ZA%2BYUsvBrRBYp4MGmQB0t3GWSluS7IpSD4I4HK%2Bo94FkXXzvw27rZFYlg1HN5i%2FlqtqurxgKjuq0mfhL%2FdOZEoaaYTR%2FxpE54j1UB9kvT76S%2BwVLDmr2pI3m5swltzBywY6pgE4GAIPu2OXckTLMnHPa9nd87aztWGGZPIHYNhgOTmNJfqFNNk53%2BgH8rI5oHYniIP%2FwQfTQako4BL9O5upPB81upnwmEOv%2FlbeZm%2FHtcomCVsYXKVKmuK7SFQhI74sNFsUb7pHk725%2BTpGQEHhsg1wdNzbnPH7s1DBq25Cv3dKub5eORRtcvr1UeXIRjUJoz1F0pCaI6bnjb%2FdQLBm65KP5mm8DFh%2F&X-Amz-Signature=dec5585dbafaf5c8c1e5a13f854fe4c81ef7b7b3c5119ff7e930fefdd38dc2d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635GWPTM2%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061759Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF91v4NpoHkq%2Fg5Zya8dvg7N1%2FwO8gP3H%2Fp84PUOjLrtAiEAtbZp08B9t7Drak2%2BiOvUoT9YQEb%2BDYFql%2BCr%2BDTTkOEqiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCygKdRekiIcUqS9fyrcA%2F6nk7ZsGbtihy2LPEK%2BZhBb6f94nJOlhBXslYozjI4cQMf84Ylk5bXyAxqwJvvZ0wrwejs0IeiQqBWqH3d9XnsZYt5l1qTyXKXT5wwMwK3iEyzmHGHOHrcN9Ju%2FH2tlTHoQHNrdh8LeOswDfVjmDO%2FuABBOHO5fz3cuHakDFshqf7CU8eYsd3eDri1khw1cK6KRV4XgHqb5MgoURsLQmAAY%2FudpNlSXEGd9AkB%2Fb90SkWgCzc9zqya2lcGH7MAZD6PrUHyP5HSnCFACR4gPu2DfklNVgtdYszUkm%2Fa%2F2FTu%2BKoEcmWikNF5lGr3RXsuPW3%2F7qQ2z0rR2lVsqPIrbeoJlYSw790vP%2F%2Fxyms3GffL43zIeGiGUapYnpDE3MQBw0FjJ5bqblr0JR%2B2fKiVMV%2B72i%2Fyv%2BvUTfKgSbO%2B%2FXkmxn38IObPllwwK1nCnD4tNf0RmQlht0naOVN50SFVJLiSO5oNX0ZkxSCd4mqymx%2F2WSUiY0eqNO5U8U1vyVsM80OIevkXo6bGdBww541m9W6nOwRYeAZbGBgujuHCwNS9FzFhM%2F9qom6M4Qbb3HPxfvP3ZkxSYeb4hKB06UqcE6YrmN%2BB8sM%2BxQJ60sQ8cRu2QCDlqR7sDajSGS5oMILdwcsGOqUBSPEJWzCY%2BYIUVMex2K%2BmJvKYGDxAyRS9eMyzR6qBqOSQ995RpLcFSydiwbPnV%2BGokCYJ3INOlZv54FJG8rOYUcNsBJTr7vDVtzCDOJJjlsrkvcY42jRFiAd2Izbv3z3B80uMk3y0LgECjx1kreL3Y%2FwBa5yqs60r6B8MB8azgSkkf7pNV6QubX9CmlsGtRfPYg2YsIBa1SPJ3t0vIMPB46aWu5yq&X-Amz-Signature=53fbb4a821d12d4ba00c743d8d849538fed6f0857f68493bc35e5c8a96163827&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBHNMBXY%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB9AOGJnEVsd7laCxegZe1g9%2B9MDE4rjQFXgfpE7bAskAiEAyePVlfONgJX8RXHACd%2BX8%2B%2Fc%2Bac3shU%2Bj1ie5g%2Feu58qiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKvk8HvaIomw4lYK2yrcA5bji5qk0b338prV8y4gzuXVHvrioIzfsbFLunYwepCGfdU7OWAhf1lsRXERk%2FkA8d8uaeuFURLdLqbrQau7KEE1o0%2Bgssv6AT%2Fq%2BnH8R%2BGd4Q8ds1q%2BQVOl0gqFw8a7GfibS6CMkr784pCUDcPMChIFmFLB4761P8wdfHlLMsHEcTnoPSd8NzZnk72KnT85bvuJN%2Bzk6O6WJvZiPFheo8vfW0Ll0m0bMML2%2F5XUlV0qIGqu8%2BtRTYARU8pdeoVvxqrd3JkPTvSvN%2B%2FclliFDEZ0LvcL%2FI6U8pN4UrDlL%2FNoTaqX0hfBktNZe9rFiYgb%2BG34f%2FhjlwJ3PjDRaf00RzcmK%2F7Ql9Ck79OQPEqbPL9wRtVyrCyIVFdQuBdZiAyKuTW7OWSyFHrio%2BzzZ3OOTfc3A0ly6F6ISN67XrMImXkPZcnvTPdNdBAEitT8B%2B6uHRhkSwWskpoBcpYSt72TLsXF9SypI6C2bzPu8KR7ZBU04Vn4xk%2B%2Bt8qQOICrJUpoycXdbOCzmS7gFi3z3EAbkj1CG2jA86MwAkj3qYMPNgWzAUZ7bI1hRScv%2FikgVzWYzulxTQqHDOY2dm02KdL9jmVkRhcpQyT2y6GrhUIsBTon6qZWMvitafRBmX8mMLjcwcsGOqUBiySKjHqXpPOKi7ZnJdDACWZLl%2FwUgxx35hZQJsaF4O4G5Wzwh1Uxb4pB7F6PMnCyjtBxGK60h2hx0uKHE1D%2BDi7Nt5N20mbZMes5Ik%2FG7LZYgSh0zQucBqdpF5LyMxJCkPO767LVF2uvmFJFE4teDt9oBMInWZBM4DElCRN%2Fr2MzUjXV1wu7RwWhWU3xtKZ%2BNvYCxThRq8f1%2BPQUP8TiM0RsaDS7&X-Amz-Signature=c7245f97442ce2e126e9fed296fa20228d3f8af50d7bce99b36f92fa44535358&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBHNMBXY%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB9AOGJnEVsd7laCxegZe1g9%2B9MDE4rjQFXgfpE7bAskAiEAyePVlfONgJX8RXHACd%2BX8%2B%2Fc%2Bac3shU%2Bj1ie5g%2Feu58qiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKvk8HvaIomw4lYK2yrcA5bji5qk0b338prV8y4gzuXVHvrioIzfsbFLunYwepCGfdU7OWAhf1lsRXERk%2FkA8d8uaeuFURLdLqbrQau7KEE1o0%2Bgssv6AT%2Fq%2BnH8R%2BGd4Q8ds1q%2BQVOl0gqFw8a7GfibS6CMkr784pCUDcPMChIFmFLB4761P8wdfHlLMsHEcTnoPSd8NzZnk72KnT85bvuJN%2Bzk6O6WJvZiPFheo8vfW0Ll0m0bMML2%2F5XUlV0qIGqu8%2BtRTYARU8pdeoVvxqrd3JkPTvSvN%2B%2FclliFDEZ0LvcL%2FI6U8pN4UrDlL%2FNoTaqX0hfBktNZe9rFiYgb%2BG34f%2FhjlwJ3PjDRaf00RzcmK%2F7Ql9Ck79OQPEqbPL9wRtVyrCyIVFdQuBdZiAyKuTW7OWSyFHrio%2BzzZ3OOTfc3A0ly6F6ISN67XrMImXkPZcnvTPdNdBAEitT8B%2B6uHRhkSwWskpoBcpYSt72TLsXF9SypI6C2bzPu8KR7ZBU04Vn4xk%2B%2Bt8qQOICrJUpoycXdbOCzmS7gFi3z3EAbkj1CG2jA86MwAkj3qYMPNgWzAUZ7bI1hRScv%2FikgVzWYzulxTQqHDOY2dm02KdL9jmVkRhcpQyT2y6GrhUIsBTon6qZWMvitafRBmX8mMLjcwcsGOqUBiySKjHqXpPOKi7ZnJdDACWZLl%2FwUgxx35hZQJsaF4O4G5Wzwh1Uxb4pB7F6PMnCyjtBxGK60h2hx0uKHE1D%2BDi7Nt5N20mbZMes5Ik%2FG7LZYgSh0zQucBqdpF5LyMxJCkPO767LVF2uvmFJFE4teDt9oBMInWZBM4DElCRN%2Fr2MzUjXV1wu7RwWhWU3xtKZ%2BNvYCxThRq8f1%2BPQUP8TiM0RsaDS7&X-Amz-Signature=c7245f97442ce2e126e9fed296fa20228d3f8af50d7bce99b36f92fa44535358&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKHYIJZB%2F20260121%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260121T061813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCFjuWvN%2FhdiQRCuK7YqQPZHevkNqTg0eHj5KvEYWBHRQIgCtHxXf3Tvvl6ojH7z7uumaqhmDBks%2BQ2BGEPwHwSXgEqiAQIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHPi%2B7PIjQETYS9rEyrcA%2BtfmcEzROI8DgqrgMxbIYGkjoT2zI4YpYiaNT%2BA1vG0uig9qLzNE2a%2BxkeNs7X9aN%2Fa2bgMvvAQiFnS7Ua%2F6JW3wNwfWexsuN%2F0JZ7WUWaalFTPcdBnDZb7mVezw56yaKyHCxcBJ3Op6kMRPRTwYvXw3KLvhpfsGnm050frOLprtw%2BZU7UqRnOM27jmiu68UlMr7ZPZ4viITneUpXj9tELgDoVYF8oSm2cooy6DVSxcPQe%2BRycrfzVE%2Fki640BBbv9tzjE5ZjkRBfMNGiACw%2FDm%2B2LqEW9H2noTxKS407Ghw2%2BVdWnZdvMjimGrci%2B1iTkB6aETTfSv6p1IRvSmmKswVGSqY4p0zfELrCwzQv8PHgqMbKGgYjQAPHfWts5Ja4esQpd%2FpfnG1aLyCQK3%2B9y13wExDDX%2BYi34YHVVzAyl6P%2FhAAD%2Bm7hH5sM7pKjkpsOz%2FaaNbuR712SRmdIFFanER%2FLnfi4OV7gvna9kENVCXiDB2DpX57MmHPNdh12i2l7rByMWZPfAlWt5YmYDC%2FBhJV%2Fd1iNgiOqDuHNlPY56gJ7MWfHMcZqFLB5Ffqii5nKCM0NH%2BFEEXVOq4RGhn%2BlVeHzCu4Za26vnDfeFpOU2adNKxl0j%2FBAaVjxDMMPdwcsGOqUB8J2%2B8eZGDX%2FdxeVk3ixpYQ76XnQ0%2BihcyFNvw6kZfaZDUyRf7pbbFM1CUhyRadzSuTRk4%2FMLQ88Sfmb8IuH3Ge4jaq5QXrigPcXyQvYAPHeYA2U1WwU78kZWLREmw0ZANjISVMk6LANtqA7kZCOQX6Gyfl%2BTkZJYLPBfg00u57D3OrmzkSYnBL%2BE2LQ3pXQDNJQpV9Vnmw%2B%2B7UP1pFyNpAb7D4MX&X-Amz-Signature=bafa6e8b70e48bab562f3a0e4241834020e3ac1fc090472d1bfc49510a2e9cf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

