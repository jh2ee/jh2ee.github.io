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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SVRYXMM%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDr%2FHEuaQT2bcnuvSnCZvoGY1ktpv3xabUn0XjGa6rl9AIgW%2BPzAz9xo6qddP6Vt5SILQhhh%2FORLUB%2FZZ2yOhJh%2FqgqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOtWsUzghBzPfqacXSrcA%2FRZ%2B5rNGQk1bgYgz8tk5VFpXhNTmZ%2FvxRcAo%2Bs%2Bsx9kcNX8BkRmn9cyUIG%2BfMEqeG9yhWzls4%2B928mQGLMmLti%2FJ2v3je6iv9mnVC1L4M3kHVzpQ1t6xaVhxP1HXEgWEuIXrAOhRAyHmCAnpc3jLf3f9Mef%2B9mell%2FN9qR3oGRZ3qMhh7EfxV%2FWRRrK3f59V594qSrXpoNwwZgEdzRUaxMl2FYL5k7lI3VXTjXl3iqBdJcArefHadZ1K3QZ9GQi5RkQtEGND%2BXIN4zn6LZL%2BAnhgBVj9HhnMRYBP4ywcDGEKQcnd61%2BHBF56xjLoAZRZO9%2BL6ZLTSVItpFlJcUWwmUKf3U5PjdClOqm4y1leJ84qlJV%2F4zQ6M%2F0rgHUBYeOBGX3MTMt1QgvOeEdga9L8mux29vonBuAoiZPbe%2B7R7XHiSMLb5jQKTyaDmAPupkxAREY%2Bf2CIgCEErCA4Ye8mHd5NI7fLoeRjcA3HQmyQeZO%2Fa3yFrKMb9zSOEUi8JsckYUZae2SMunZDBB6fqsxUUlXiheY7KT%2BroQys9hX81zRomjVQAb34HpfXuiH0Kcgz12KHVacCcW8kKhm8C5viiXI%2B0%2FyDTNSJxTC9%2F%2Bs1SuDZRjuWQE82kv8RChsMIKXs8wGOqUBMhaep7a9Q6phD0N3bhdfQu7wBFJcvFJB1i%2Fwc3d%2BxRq9ifxtNUTsL7Kb11lB%2Bxwrt%2FVAOcemXFb78bLe0SRuG%2FjEkgidCWLZNMvfj93oHllRBR2aw0j2E5g7%2BpUQDKPQEC8guIC82KpUSV2gyPe45P4MSdHSKSqm%2B3%2B4T9yq8wwcLLlvuwjf26rhgnnmfmrBw6Pdh5r%2BVf5gCz47zb6avajdECi7&X-Amz-Signature=3ed1a2c2f023002a38981a06da982f30a179486255fb2b5310e962b4438b31bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SVRYXMM%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDr%2FHEuaQT2bcnuvSnCZvoGY1ktpv3xabUn0XjGa6rl9AIgW%2BPzAz9xo6qddP6Vt5SILQhhh%2FORLUB%2FZZ2yOhJh%2FqgqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOtWsUzghBzPfqacXSrcA%2FRZ%2B5rNGQk1bgYgz8tk5VFpXhNTmZ%2FvxRcAo%2Bs%2Bsx9kcNX8BkRmn9cyUIG%2BfMEqeG9yhWzls4%2B928mQGLMmLti%2FJ2v3je6iv9mnVC1L4M3kHVzpQ1t6xaVhxP1HXEgWEuIXrAOhRAyHmCAnpc3jLf3f9Mef%2B9mell%2FN9qR3oGRZ3qMhh7EfxV%2FWRRrK3f59V594qSrXpoNwwZgEdzRUaxMl2FYL5k7lI3VXTjXl3iqBdJcArefHadZ1K3QZ9GQi5RkQtEGND%2BXIN4zn6LZL%2BAnhgBVj9HhnMRYBP4ywcDGEKQcnd61%2BHBF56xjLoAZRZO9%2BL6ZLTSVItpFlJcUWwmUKf3U5PjdClOqm4y1leJ84qlJV%2F4zQ6M%2F0rgHUBYeOBGX3MTMt1QgvOeEdga9L8mux29vonBuAoiZPbe%2B7R7XHiSMLb5jQKTyaDmAPupkxAREY%2Bf2CIgCEErCA4Ye8mHd5NI7fLoeRjcA3HQmyQeZO%2Fa3yFrKMb9zSOEUi8JsckYUZae2SMunZDBB6fqsxUUlXiheY7KT%2BroQys9hX81zRomjVQAb34HpfXuiH0Kcgz12KHVacCcW8kKhm8C5viiXI%2B0%2FyDTNSJxTC9%2F%2Bs1SuDZRjuWQE82kv8RChsMIKXs8wGOqUBMhaep7a9Q6phD0N3bhdfQu7wBFJcvFJB1i%2Fwc3d%2BxRq9ifxtNUTsL7Kb11lB%2Bxwrt%2FVAOcemXFb78bLe0SRuG%2FjEkgidCWLZNMvfj93oHllRBR2aw0j2E5g7%2BpUQDKPQEC8guIC82KpUSV2gyPe45P4MSdHSKSqm%2B3%2B4T9yq8wwcLLlvuwjf26rhgnnmfmrBw6Pdh5r%2BVf5gCz47zb6avajdECi7&X-Amz-Signature=3ed1a2c2f023002a38981a06da982f30a179486255fb2b5310e962b4438b31bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QHXECI6%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGjJbkZAUFLFnd%2BS1I03tKXBom2DIxYWwezyrzpFXULgIhAIRWKAk%2FL8E3HdUeckSqEjuat8fGHg5hUeThaS58YdniKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwnqq4SQb0lh4sUVacq3ANXWOGhZv0HgQNWCo%2BRhxOJlKZY9CoF7h6kYyBn0IExQYqqgZJcdf3aHGpKUL93q8zfP9cMuoB7vjXxOWIP1Kh%2FgdYQKuY%2FUegfyV9TgL0%2Fk9WRV2UP0mLvUBMIfsJTetnHhaYGkXCUkQ6xhf4gCncWYC24oobhoDAZSUkvsaFhefbnMAiQ3e9kF%2BzDpNSDC4EwN3frBUQvuD10Z3do8txrutCWx6OF1pjcL2Ao67Ps5auvjHcdJU%2FB8d1uAJFJV3nB7bNKhJ%2FsfabTS9NrFB7N6ccKKfCcd5K997rMIYXrN2SRQizUJ0WTKhE92JgMFJdey3bo7i8gbhygEWUEk3Jrvmb8T8008m3%2BRAQXsZEx8QOnugcOoQm9ek8GDXEJibcETGLtBa4wxLyWzjAnzNDsp5Tn9G31Y2cUshbV%2FHwmSzQ64FoP1L1kwCtau6%2FrutZpXewImToo5e8B%2FtHixY2oLfPfCq08Y3QA9zt2xSW84imOFuOI8EnIgvVoQfwfefp7wNZDbkfyYdVlP6J7mTaQhV5WPTKtN2%2BOp6ifU8ob3cTi9iqP65InDtdbtKUC3lUihf8lz1AiMJmMocZcTuAViYvEjb8o%2FKDVydzlVJ7EZ7%2BRknnISEIL79w34jDylrPMBjqkAewG0dTjDWhZFA82mvc%2BvzJwMEUXfuxUZR3EqABrFi3Nb5weS6FbIcrHq8LFR6CsfgOD%2BrQi4kMl7J6V3r%2B7bs2drmMaVTwfOJkpYNIpgvH1FykgtH8X30mc7wz6EyCGsaxEGJdYYjee3%2B%2F0glbF9t6rEvaY8jV5jp6DKYw8WfheiWq%2Bz3d5LdjvNENcUJc7hLUS61EZMTVnZtFbQLbrMKlf5mF1&X-Amz-Signature=bd45123af8aacbff910b62ab0f67b52d8c60d37e0d593a6eb119453d60d8efcf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHPOVFTQ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzy5Y2cE%2F8be36l8zyV%2B8HPXSREeaH8zeXXOxwXLqJmQIgc66swENdvgsBdOJ4bBUgX1QQ0viEzoMry2TaOdM88BQqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAl6aUVXf3rEX0VoIircA3ji7LySj9%2BxBHHnnhuhonkaxZ18H3lJeb%2FFpGC6l00KXrOeED9L0OO7USMXRCHVs%2Fe1TSGgy9iCz6UwCDKoHfcCyEzauwoadIcIa4WXB7foYyXG9coTVZ7VxQpbKycwoj79TeAQrP9jex%2Bl7dL4YlcXuXLDF7UreJ4fzsgqII%2BnGovD%2Fxj6D8%2FRgYvpxKLwv9nfYm66dPxv5QzhezWN7uTQWRz4izCXBXIVz5WpAYGUfyZ%2BxPaDJB1VbUL0dQoKmZHE%2FPSSaluUVNtiTnHp36c%2BeFmf9ro6fcJLDRiFOBIcYoIHnCP6AorbYDfcJQfH02Y3yVB5C9%2BW8H9heXbniWEnzMBe2tz1%2BrJvUVQ%2FCzfjhaY1pqF4RHj9k%2FzKCbFFB8uKOoIDDmft8k4SyTZVOUXHkrFJd0Vmmjeh3cwWRAQjG7Td1uhIeUTieRI091KF%2FFmahBvzhEw6tzLIAMRZ%2BOIir2lvQpOGP%2FvNlP5rilBr6kPTggWrKdn2VuDnnSK7BH4vPJMvSU3CxzBIo36N8eJiJ4ujYv5jNuB6DejSsG3FTxS6MnoQv8Dg1yXnjwk51Srywkiew6PFoe49nieyZtqGxT3l7dqFTBak4dv%2BtDXIU%2BAau8ykwAZ93mLzMM%2BWs8wGOqUBlKQeoaVByY2JaK66Eluyp29TY8NxzGDgposBF14EdTvoBwO0%2BFHXMhJg58K59SDOpLc%2BNQ0W23j%2Fz19yIQwlwDNvlGCXwL7Y3iHUubpjsyqOELZLnAfve7gN1P7B4Wg6sJecxP%2BXICrtdm7iJ8LuEbnGJfymZv0lztrbTpqQQeS3xaes9%2B96BZ%2FUXv7HcPGem7wIwwTCi1u4OwpDgGWRMxFhYcG8&X-Amz-Signature=bc040dc37ac209f041b3d7a8e440a83cd9288f18a2734454bfc884d2d71171b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHPOVFTQ%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzy5Y2cE%2F8be36l8zyV%2B8HPXSREeaH8zeXXOxwXLqJmQIgc66swENdvgsBdOJ4bBUgX1QQ0viEzoMry2TaOdM88BQqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAl6aUVXf3rEX0VoIircA3ji7LySj9%2BxBHHnnhuhonkaxZ18H3lJeb%2FFpGC6l00KXrOeED9L0OO7USMXRCHVs%2Fe1TSGgy9iCz6UwCDKoHfcCyEzauwoadIcIa4WXB7foYyXG9coTVZ7VxQpbKycwoj79TeAQrP9jex%2Bl7dL4YlcXuXLDF7UreJ4fzsgqII%2BnGovD%2Fxj6D8%2FRgYvpxKLwv9nfYm66dPxv5QzhezWN7uTQWRz4izCXBXIVz5WpAYGUfyZ%2BxPaDJB1VbUL0dQoKmZHE%2FPSSaluUVNtiTnHp36c%2BeFmf9ro6fcJLDRiFOBIcYoIHnCP6AorbYDfcJQfH02Y3yVB5C9%2BW8H9heXbniWEnzMBe2tz1%2BrJvUVQ%2FCzfjhaY1pqF4RHj9k%2FzKCbFFB8uKOoIDDmft8k4SyTZVOUXHkrFJd0Vmmjeh3cwWRAQjG7Td1uhIeUTieRI091KF%2FFmahBvzhEw6tzLIAMRZ%2BOIir2lvQpOGP%2FvNlP5rilBr6kPTggWrKdn2VuDnnSK7BH4vPJMvSU3CxzBIo36N8eJiJ4ujYv5jNuB6DejSsG3FTxS6MnoQv8Dg1yXnjwk51Srywkiew6PFoe49nieyZtqGxT3l7dqFTBak4dv%2BtDXIU%2BAau8ykwAZ93mLzMM%2BWs8wGOqUBlKQeoaVByY2JaK66Eluyp29TY8NxzGDgposBF14EdTvoBwO0%2BFHXMhJg58K59SDOpLc%2BNQ0W23j%2Fz19yIQwlwDNvlGCXwL7Y3iHUubpjsyqOELZLnAfve7gN1P7B4Wg6sJecxP%2BXICrtdm7iJ8LuEbnGJfymZv0lztrbTpqQQeS3xaes9%2B96BZ%2FUXv7HcPGem7wIwwTCi1u4OwpDgGWRMxFhYcG8&X-Amz-Signature=cc4695ac054e12d1208ff8bcdb241798561077378d4eafe5f0be17d0301a609c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XD7MQ2CV%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC%2FY%2F2FFNWAovxq7d90wSINmNSOm3LFRqlMNXLJIXoupAiBUWnrDKObT6tEFuM7cdajdI%2BTjA0UA5yGaxALKSIxbMSqIBAjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRkfzO%2BfOY%2Bf9zttRKtwDTvMwJFVr9ON9XD6BUrHjhZgzk6B0NmC4by9Ft5Ozg9ZXXV%2B6ZFXBPuLCi2Ft8362VqLUS6ji4iF6GElH95Q%2FKIoPYNleYtttUwZYU9Pqx7w4krmkuEVx0b3Svar19XAEKo5G5lL0bwZWNIQprCR%2FVmUOfM2PpWxoVm4jBUA7O8LE5VIPi%2Bk3oLY2ysL9gqpSuVtcF3WHTagklorJnjPCDN0qA7yJhv6JRuCE54z9roIcgFE%2BEFX5k5mPB6WeJ%2FMnPdb6UOofOMUZ08sQ%2FsRDo8vxB%2F%2BHKD2a4Rl3bgI5dQMULa7qDMEsYqOw0sP2gFErQTxQYvyorGhS5EvniyeNTQ%2FgAgF7NgGVXLWD9qKBbHwHjPLr37Low3ycWq0GZG%2BwWegfv4AGFjhD2KBnMgycrNx78%2FrTkytBuAsWbbLimKEotA1K0QfjbNJseZy4uc5wYZdrx%2Fr0h%2ByXQnlmVI8yEU1FxZhI7PdJ9TMsM%2FyHK1oD3UhoHuAgJkiioX4c05Ay7AD9Q%2Fks%2BIf46KHVLYzbegvvu4Qsv8WGz958TEwPrQA98icjPRZSxfPt6GjOm1crUSJVMLz4GqRnGxRKizx6tSCaPbrj%2BtyF1S%2BoYoaANBpDMWK4ncnblN6gUs8wmZezzAY6pgHW9Zwlw0bceVtAtIdO%2Fa9K5c%2BQ1f8wUDwzVysr1YKLGKxJbVs%2Fx6z%2BwJTn%2FWa791AejNYcDlTlHzg4EPlAuSIHmXY%2BBRuTpuFZSndE5hMZzhkUoQtjdcJwQrHcSkdu4%2F%2FASB4a%2BcsAHvn3Bec8FFygra5qgZIbzshPGtYjc8Iag9CriY3OD57iKuH0CRHy3CO3mLAeLnunHxaqYIO%2BI7Kp5JKr2yF%2F&X-Amz-Signature=9f06fc8f08c9e9a2d6eea262272965a9afcd7ae543a7e36582545f0837a01e21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRRW7DB7%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrh3m2ObMYtv1AbQGK0DWLVK6ubcuB2FGCOEUWNRFTkwIhAIf4ZXwdoLguwok1nyCrD%2FNRniX5qdzZiws9%2BKoSX0iaKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyUyGsOd44W6smBBgAq3APZSGrIH2KtLN%2FHaGc0VNtOH%2FgWF0SxzZPD%2BN%2BUx32so3PTrXTAgQ%2Fv6Jct%2B6NoOoLHHXUjdZ%2FO7KPg6kD7dkzErZKZ9xL6m08pJD4ThACzX%2FPC7ZAd6kfmzcu175XKi4F9ejjtovtNKAckDpwtEgOgy1cqilUkGvrjX5lQI9hX6VuCAjILbrRzJso%2BFPFJj6%2BtwqKAf%2Be5073U7VIxebPYXVQTNVwljPF0OkAPuyxS%2Fc1yv1gytTADKjq%2FD7HNS5Uc8NGk%2BDt1oXUOuRdy8wSxrfB3aTidKTwNHaBOZA6k6rBNY0oKYB99I7ok7ktj%2BbNlW4FozhhKRiOn8%2FnWXuuJabkmHdh2lCAJW4urgNSjfuLLsn%2F0bvELFkrFuWwisIu9AY0unOrhbwcxYnQiyxI1JwjZr55vfWr6V7Te%2FLYX14%2BtUNLo8RF33cwoI1vZ4FifOHJBqlj7HQ%2Fy9KmZSkBrOJQ71kkqU8VXMg7PCg5fkcFHpSP55bS1%2FUA9pvQOQEo6fibJ44DJnF4CmKo2oMJeNzd5HLk0%2FocK%2F5zMc%2FcMuWXOElTyW0DvLodPhC2hLk%2BBUkHAP59WygONkIP88%2FIPCxYiJYoYxOqkc0rZv%2BaG8pYu8Ecv5U100HSjUzDNl7PMBjqkAVnwH5BNR3gbPHNZaX4Lh6S885miMIUEmFxfrriO8e5bNyVNLJpi8CaFFDqtPPQH7vg%2F5%2BJp55jXZXmjTdoT5w%2BllPRrhopluqSkqHLdsFOSr%2F402hRX4dXls1h7%2F6EL2WzwQ45SeRiVclAVWGuMwLlnEh1ZevVeBOPcXWZ4xWAXT%2B6muMT0vf34wgcpoDbbnatXDr%2Fzwp0LNUZZHBE6sxKpsCSg&X-Amz-Signature=49eb8026d07eb98fa5206760b9708e37460662f2d678d4ce67e83cfb9c10382d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666GYLBLLT%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD11cUyb33%2B0kGGzbmManuP%2BHve%2Bd3R8%2FZdUr4g4TSaOQIgGBGN7WT3Tid6s585hmF2vPLOjoLSO7ZLliqyOJ0OezUqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDZ5xGNjxaq%2FaXqYXSrcA0JuuQe1y0ZnMN%2BmdNeDkY4vXg8plyYB5rtG8EOzWwnIw1eLpF%2Fp31nqbrJ1s7xPbehJplffncI0LonsY3Uiqb6kqZ1Rg26pAisqGzcxGVzGeH%2BPLaE15vZHEMKcUlY%2FIUqP6DYmar%2BYQADkF9dv1Jr0KvjJHUQHo3I%2FsmLIknTTDgyTtERWd%2BwNctr8ZbZmv5mhD7%2BBNVlpVToFj3ErG5L1ybXGx%2FyuTxK7HWK1Equzll9M%2BeS0suoscd%2B%2BkJ%2B92jA2NfEEQHElfooxpkJdnce2HvKMPiDCY8uEc9KpDQAnVqZ4h1IAH8P02lKtOhlx%2B%2FloWY%2BpzNUcVp4TgHKloe78sooZUNfEnHSUJwT6Mt5m7JDFlFyh6T%2Bosciucrf1wte%2F0b%2FgYe%2BfnAmeU3MK27FSk1a%2BqiiPMEEdMEnCUgPZeksFQUNzUkJ7AzdwHQrXjTTUrHqLPGpRn93HlNOHwCSY5xrZvoQftkH1aYhZnOOBKCppqGd04e8uAqVnoLE8kTxpg0ejMstPRGzo0TJa4sDS5BcLp%2FjgnFAxV%2Bldr94kdc%2FliKP8GFmN3SrlNbryRlI0u8oMY5%2BA%2B60gmDxjeVvdAJtUAy2U5SSfGyrFzvUR3sJKCzk9MtWve%2F1yMLCWs8wGOqUB4UepEGiZRICzzZrJuAMDgHpeZjNpmNPhyv9%2F6lep1r2xe6JIPtC0rrN9pdzzHxIlROM5rTBD6pa%2Fa1Pq995Ag38sVgdWIOQ8FiVzroXFjnwaf2vRcoZhGEzi9hxxQbCgnvRpTMbW5sy5nUMM%2B8X%2FH%2FDVIooBm7YtDAFgWQe8VqTvm%2F7JchPU5q6bS0ynpDNpx27rNn518m6luHBxyHNZsMlGt%2BaY&X-Amz-Signature=3a574f2c60e296503bd3d529c943990d02c1e7d87c84ff6282215c69fe44e249&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RYGCY5G%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIECxG3X1jFRqn8zTer9Z3Sqp0oeebOu%2BGNcMYgoY1d29AiEAq7GYOqvIx8ZIrsSIq29dzdYDc6GfH3B3dtxNsI5pj9kqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCAnA9Mhke%2BzdRmQPyrcA%2FwZfHQUqMb1r%2Bo1o3%2Byi0wymNqUQMmZHdjsH6dA2eswz%2FEhepWvd6qLA5cuZmAS88nBR0P3sDlnWOVsPKN8AGqZSz287e9Q7AL3qy4xrRi87RfuOsFNkBCEeBbrvAVluVlcZJJG2XMvp%2Bx%2B7vqFlKSo9lqtt5i2WsF%2FeOvTCKMKgolmc0Td%2BRJ8CUhSa%2BM87JExcVz2hTHfrNjCorDmKOP1%2Fj%2BiXTbWctnL4sC26FvAoqfPwyPAnfFDjC64xS39jf8sImXJ23wP3iAEAnG1JBPaiir4clr5YBSq%2Bvd5ea6OiViJqLMooJ1kOL0mfnEUk34MrX2mRi%2Fs%2FA4ZuwH3F0gJuJuaw%2BR%2FfDKIQ1UJ1MvXf%2B5b%2BVZuMU2lJTZeVXUYsXA3lcNPMIiiA54Qm%2BGm%2BdBnKMgNOgGwyi1Ins3KBHnfJzTJcwUECVvNLAFuTeh4k6hRVrSP1GBSxv4nqs%2B4zK2wO0DGYyBLC2G5HMbAIC1Dmn8aaPgpOu0utHVPlStztSC0VryG5xT2oHjrxZw1ft5od1N%2Blu1jyI66CNIf2Mxwh%2BqhTJPbk7a0CTPdqIpIIouq27Y4JIchaevn10kYdUCdVeQRk%2BD6QQV64EyVw%2FuZFgu6oSu9PMlmX6NAMJeXs8wGOqUBYysvs485VZnBr%2BHGq5doVrW20E9DL4%2BhPF84aridchr3xmiCcRlaAuUd1I9RT9z0awLC1%2BJdJAmeTvdT%2BRy67GAPjfKijLGHFl%2FgWJ%2BQeyZsb3zvPY6ndWt0nJ%2BqtbjbnIY0Ot38gxzD%2FBbBytnZs25MQ9iU22UFXdRhUXx%2BPMNpN%2FmwJDmSWWKPpubLveJ7svT4pa5reJYnusyQP9yszxq496hS&X-Amz-Signature=757072c86eaa0e867149b608e5a29089b45dc045d7f01f848128c3439d98c7ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RYGCY5G%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIECxG3X1jFRqn8zTer9Z3Sqp0oeebOu%2BGNcMYgoY1d29AiEAq7GYOqvIx8ZIrsSIq29dzdYDc6GfH3B3dtxNsI5pj9kqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCAnA9Mhke%2BzdRmQPyrcA%2FwZfHQUqMb1r%2Bo1o3%2Byi0wymNqUQMmZHdjsH6dA2eswz%2FEhepWvd6qLA5cuZmAS88nBR0P3sDlnWOVsPKN8AGqZSz287e9Q7AL3qy4xrRi87RfuOsFNkBCEeBbrvAVluVlcZJJG2XMvp%2Bx%2B7vqFlKSo9lqtt5i2WsF%2FeOvTCKMKgolmc0Td%2BRJ8CUhSa%2BM87JExcVz2hTHfrNjCorDmKOP1%2Fj%2BiXTbWctnL4sC26FvAoqfPwyPAnfFDjC64xS39jf8sImXJ23wP3iAEAnG1JBPaiir4clr5YBSq%2Bvd5ea6OiViJqLMooJ1kOL0mfnEUk34MrX2mRi%2Fs%2FA4ZuwH3F0gJuJuaw%2BR%2FfDKIQ1UJ1MvXf%2B5b%2BVZuMU2lJTZeVXUYsXA3lcNPMIiiA54Qm%2BGm%2BdBnKMgNOgGwyi1Ins3KBHnfJzTJcwUECVvNLAFuTeh4k6hRVrSP1GBSxv4nqs%2B4zK2wO0DGYyBLC2G5HMbAIC1Dmn8aaPgpOu0utHVPlStztSC0VryG5xT2oHjrxZw1ft5od1N%2Blu1jyI66CNIf2Mxwh%2BqhTJPbk7a0CTPdqIpIIouq27Y4JIchaevn10kYdUCdVeQRk%2BD6QQV64EyVw%2FuZFgu6oSu9PMlmX6NAMJeXs8wGOqUBYysvs485VZnBr%2BHGq5doVrW20E9DL4%2BhPF84aridchr3xmiCcRlaAuUd1I9RT9z0awLC1%2BJdJAmeTvdT%2BRy67GAPjfKijLGHFl%2FgWJ%2BQeyZsb3zvPY6ndWt0nJ%2BqtbjbnIY0Ot38gxzD%2FBbBytnZs25MQ9iU22UFXdRhUXx%2BPMNpN%2FmwJDmSWWKPpubLveJ7svT4pa5reJYnusyQP9yszxq496hS&X-Amz-Signature=380f121b5203e639e845e8a7f7cd514a663bbe2db49c5f49e68662416dc1fb8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5OTMRQY%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHlvTjDXWmXZ%2FMzI2wUxbvLLyqk5xk7tvdWbgCT7A3m8AiEA%2BLc8fzuQQIaMjm%2BAPgrjpVjrPLwqX8rbPYWg%2FcCgWLEqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB4Hog%2BXDUwkJ68w1CrcA5sRbDrskC2OUOc%2FvyozfDPNaUi%2FT9PgqHR5w9NhwCO2Wh6ZFQFKrTVK9B27A%2FFBtQK6mcWliKTVr%2Bjj5%2F9IoNMRM0ZpZH2UhNTbnuQkUt6ProOJklHS1jjNRiCQq4M6uSoybncFCKWTnTJwfaasni1AGrtCmXSt5HkdKNmd1z8xued6w3rqV3J7balUbHtp5vcfWWPkrp%2FpjuX%2FKF%2B%2BJvqkxVaxmbWzfBvIfVIpd830KklSS63noxN9F6KGN1vx7UZu2YKrAB9Fs%2F6ah6JNMOmam2jigLseyVdN5VYEMyzASQhWeT8Yfn8laSPZRM2nTxabkaL7nTiXqtsEuu5YfzrIxJp4zpTEdcP2BydVFoPHWMFPYi%2Fxypx00zUs8mfWpe74kFp8m4oVPEeQM97EsUv5TJMp6hpEwSL3lkIpKjkw9mT7E0dN02R6VhI2rbH9HM92QD5UVPeUyOkSY7EGirGzjzWUiClMb9ULLxiKy0%2Ffywzt1KncQHbgV%2FNJ13UAnKZYU3iDvVSnYF3%2Fqc%2FgWSkHzOX2b2H2h04ds5TUlpVqu5hcB9qRS2xJ84PFK3MIBYY4TWiyRvl5F12kce05kvUrzdzX8aFO%2FW7baav3FBimcrOgpE6oL%2B47yhxCMMyWs8wGOqUBARhiJ4j8uaQKykG9kUsbuXSGe3%2FUhNU3rhQHCn2CnfIwtvQyaCN4mbkE5AeN7vpR0NwGjfp0WjVmWWFFK92SAqevoC0ZChE6vLPYEbtLcO2EpgRcnsMNBvGLG5ybyOqcgb6rQwscNL7H9l8%2FJ5tFYo7k1ahDKSz38K6%2BuaQ6V1cLDkPC9rSjjU%2B3Mlqn7YNXypxmCPMWbFB547njXy6mSvaHdT6D&X-Amz-Signature=10ad0690dec68bb2c39be8d60ff02588574d96832c840c4c8835accae680700b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNWHXY5E%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCE0tPrcXwUYI9M6Nlt9%2FLOAaAaA4ON35XgQdfEeqL56AIhAONxjmOVGvpFheuYmhrcjYo7WuR6RZSz7%2BmecgHO2cm1KogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkdRSSMGeAuN9uT5Qq3AMAUiFiJGoTXeHFqWHsBxsAcXCzoYDY3jycDLqn3pNXJX5S6SZFs7g3bK%2FKMXz%2FID91OeKWwWojdKw4j6TggAzBh6ykB1H7jqb6TQzC2MqZDlWuzwS4j9ZVeWkLCGtxr5yrRr%2FtPQTgXHwxoeJdUj6wJV5ydoJ1nsb00%2FTjFMd2YIszCoTpi%2B6ls2lEXICN2EsEBNbS3d6JqmuOp3XWiLSgXRe6hqOyCiGHXlI3tqkNz7VCgAcKkGjqaPx4gj2bQeNaQQdOa8iwAeZASmH53aE2li19EYH5wXApuMlxgwahboHnaGndiolpDvE6xEf19QYf9pd7LHvGYTGiaPuCXHzNgHzChmUz3AmMudCwspNmQyLjwp%2F5UKVqEd9yZMrOtMerzvgj4oHsKCyP6J53gmWydHSt1Svqx1CtLPJtqcvMGQ5k0X4YRF3m45UPZwFfNRv5pWC01nmuuTbfFz1mj8meuNKYvwYIAmqWtcYApGU%2FgKvQtkx8oMcHeulvnqjQAi9%2FfHOnbCMNSImUFZTWn2Puz3awPxQ7I9FPvTh5Gk%2FDeXZBoWAeohQna5mH279RuyBrHMrBQfLuLEJ4efMdl0MFiDEPitQHMbnXk5KnH1howTN06CBPPq2RKADNhzCDmLPMBjqkAXch2irxAiI9AYnJ3LO1tmgHFhwwwGLkAQwoqI7E0UEnsSZ5b15KIu0g%2BIIa0NWiVXnNucvWQ1d%2FEBBh8rRsUAF5koyDxT1Efy4J53LIziS1v03UFL44W98V8yfy8Owx0g%2Bi1DbANfiMq5OHp6aovZ%2F0KWhnQIOTuL5qU3OkZtkd314YK4FCYiC2WIjDVtyARd5EuJ6N6FQZ8TL%2BsGlcpBTV0N5J&X-Amz-Signature=6ed88c793bacccc0a312e40c6b83816752296083c5aa75eccf9b4b34b70888ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNWHXY5E%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCE0tPrcXwUYI9M6Nlt9%2FLOAaAaA4ON35XgQdfEeqL56AIhAONxjmOVGvpFheuYmhrcjYo7WuR6RZSz7%2BmecgHO2cm1KogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkdRSSMGeAuN9uT5Qq3AMAUiFiJGoTXeHFqWHsBxsAcXCzoYDY3jycDLqn3pNXJX5S6SZFs7g3bK%2FKMXz%2FID91OeKWwWojdKw4j6TggAzBh6ykB1H7jqb6TQzC2MqZDlWuzwS4j9ZVeWkLCGtxr5yrRr%2FtPQTgXHwxoeJdUj6wJV5ydoJ1nsb00%2FTjFMd2YIszCoTpi%2B6ls2lEXICN2EsEBNbS3d6JqmuOp3XWiLSgXRe6hqOyCiGHXlI3tqkNz7VCgAcKkGjqaPx4gj2bQeNaQQdOa8iwAeZASmH53aE2li19EYH5wXApuMlxgwahboHnaGndiolpDvE6xEf19QYf9pd7LHvGYTGiaPuCXHzNgHzChmUz3AmMudCwspNmQyLjwp%2F5UKVqEd9yZMrOtMerzvgj4oHsKCyP6J53gmWydHSt1Svqx1CtLPJtqcvMGQ5k0X4YRF3m45UPZwFfNRv5pWC01nmuuTbfFz1mj8meuNKYvwYIAmqWtcYApGU%2FgKvQtkx8oMcHeulvnqjQAi9%2FfHOnbCMNSImUFZTWn2Puz3awPxQ7I9FPvTh5Gk%2FDeXZBoWAeohQna5mH279RuyBrHMrBQfLuLEJ4efMdl0MFiDEPitQHMbnXk5KnH1howTN06CBPPq2RKADNhzCDmLPMBjqkAXch2irxAiI9AYnJ3LO1tmgHFhwwwGLkAQwoqI7E0UEnsSZ5b15KIu0g%2BIIa0NWiVXnNucvWQ1d%2FEBBh8rRsUAF5koyDxT1Efy4J53LIziS1v03UFL44W98V8yfy8Owx0g%2Bi1DbANfiMq5OHp6aovZ%2F0KWhnQIOTuL5qU3OkZtkd314YK4FCYiC2WIjDVtyARd5EuJ6N6FQZ8TL%2BsGlcpBTV0N5J&X-Amz-Signature=6ed88c793bacccc0a312e40c6b83816752296083c5aa75eccf9b4b34b70888ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRSW3CAR%2F20260211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260211T194625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF7Zxs%2F%2BekffaIFw9vNeNIjlG9wdnBtQIkIAAMtHGu5%2FAiEAwGgUzVlymip%2F72TwC47xHBi43ZcVLvgtIYoDs92zuDEqiAQIxP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHy68MZaija9BT9z4ircA6n5zerBjoUQy%2FqEFAbEMEN4g2G2pvPotDUpyy1z1MRVKsLQm0K2urB7%2Fp1TrO%2BIq%2BtJVdRBn4aauk%2Fc%2BrWoRbapB42ajaGipdiN7sJQV6l3UskJ712GKVg9cBqeAkD8IXXekZ%2BqnkEgbxe7Mb9frznr19bV29QHjeRRyMsFiPVhSxIwN2sHeUgc0dtUsWyJWLYbTysP2vC9sGyWpA08sVXlxUql2XPqpUFLKba0QR4U2O2JR4cZVk0PT7jpzrPYgfS%2FBdC2rZlOGwV84rcYKNhammun09aFahr7bIHH71y8pjuT0p8%2FkXlNu%2B%2FHVzbqquMOYc7aUtCurNp4Qhbr4sE%2B%2B4JtJ96WA9OAmcGzs9vNiIsSzeGOQoMwJUQrOQqNwgrZEowU4J6Ql1droLJOIH5DsKJ5UhBB6HXRrjgxopD7KwjfFhs%2F%2FP8St2W5s4skORsHRf0HIvCZghLMIGWNaA4W2lR%2BGR3ZdyRwel5y4Vg2OrnCoJoPwXFWs0ODteNFccPse2jtr9WEgbVcMUVOONyLTeVBWvywXEwz0Ye8E0O00UhqlZ7%2B5OuNYY%2FjalIHVzq6WrqNq6fXB0Nn0pPYm0RvG6em8XVUzlTtQsVx9SmHKMjbFA8ssn6Ft7%2BcMLeWs8wGOqUBSFRypVeROxNDd7YUKRIbL8NeZ5dgSRrddWqg52AFMQI%2FDU%2BkEr776BTHLIwaT12gsToipBRutzGtzIIMaXxIutzlvLKnLPg3Cc9EqZvKzTM2XunhKIBHD7PPsjBifHwPkaBCKxg16kI3wwGnwvYKPzmKa2sRCV1ZbkjKvCXtbpVLUPjtjeQmI31E%2B44V%2BMTHgUmAb5VagXUjKi8jDX1ATD3TeUDg&X-Amz-Signature=0ac8527c965340306aba10cb51afdaaedb2fed2bdd042e91c22be1d4487fbbcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

