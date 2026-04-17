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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLPLPFKB%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHMVCqJi72r3o2zxrMHfcYioHsI%2FD6%2B%2Byki6O4g6yAI7AiBid1MGKFDck0I%2Fg4r6BT746KYULOb5uqPm2HIIDjB%2FbiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMd8DPL6%2BsKANssLdIKtwDrf9aqVyFPYj9%2B1x4TlwFyGtnsbnEuL%2Fk6t2sOLMOhtzQ0t4ZI3xkBDlBELEnDywr%2FNIb6R26%2Fv4PYSV2uWcUPIzpsS%2BGYgl7uLAjsxmjV%2F812L8FA0LGo%2F7H2VJbIF3RgUFr2IrWuDfa2MaZ7V4%2B5uvGkCWRMyjhYC9AmKd4asx61xBLNRjtHe5olgBN3YOUzMB9fbtFB%2Bdrv4WBOsSoZgD1n0drtOJHvpmxKFTy7sRBbQmKYIJjUICdbcjSQyJI%2FS67MPkl%2BJSXsqhEwSzfMnUndrJMEW3%2Bvjqf2QxtTtPKlVfqm5mvigVtChO3FueyZeC2nRRp7X%2FNy6VzRc%2F9ldhYyFS477nkWRNP7ael%2BLASXJh0Rpi9ssqwhdROjOyT3VbkVg2hxKm5C%2Bg%2BR6oWwL8KlwRrEKyMeXeOonmGFR%2BeZq4VsFIIi3YzG8nlHnjvww9P7aDdEwfCp3tRV8%2BvvtnLR8jOe5Jix%2FCPhVdjijACyqa0r556QKEu%2FTmE1c91KfQor3EbyTbU%2Fsn9COLt7AphnQR19kyZyZKYAwY2HupT2ycZZUglFJpNrOo1CZxliMUGgVoxRlAuIWC86t2uMVFwnivs9t6hm1GxeG%2BbyiIC6w%2BNv5zqU2CuN1Aw5sCFzwY6pgHaX5vWi2mxlwB0zD5qtrpFyqQDc%2BVUXQJ3jTzPlfbMrDuv0DFXo0D%2BsYcvZTNaGCxPYUMCPRkNqI7p%2FnugLJm2eREGlEr6KpntDOgu5DIUjCpV3Apww2JwAewqFTFjrdaEy6C86D%2BaD4u0o9ObmzotnDNh9DPPZKK28X7B8QB023zZZCC6moYOK8s779hWhGAee06SSuOhtKGT5FlBPX6jGHQ%2BtnTm&X-Amz-Signature=f1f4fd3e386333ee0b47ea8d68f2cbdc40d8ccf0102cc8293439104290166e91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLPLPFKB%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHMVCqJi72r3o2zxrMHfcYioHsI%2FD6%2B%2Byki6O4g6yAI7AiBid1MGKFDck0I%2Fg4r6BT746KYULOb5uqPm2HIIDjB%2FbiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMd8DPL6%2BsKANssLdIKtwDrf9aqVyFPYj9%2B1x4TlwFyGtnsbnEuL%2Fk6t2sOLMOhtzQ0t4ZI3xkBDlBELEnDywr%2FNIb6R26%2Fv4PYSV2uWcUPIzpsS%2BGYgl7uLAjsxmjV%2F812L8FA0LGo%2F7H2VJbIF3RgUFr2IrWuDfa2MaZ7V4%2B5uvGkCWRMyjhYC9AmKd4asx61xBLNRjtHe5olgBN3YOUzMB9fbtFB%2Bdrv4WBOsSoZgD1n0drtOJHvpmxKFTy7sRBbQmKYIJjUICdbcjSQyJI%2FS67MPkl%2BJSXsqhEwSzfMnUndrJMEW3%2Bvjqf2QxtTtPKlVfqm5mvigVtChO3FueyZeC2nRRp7X%2FNy6VzRc%2F9ldhYyFS477nkWRNP7ael%2BLASXJh0Rpi9ssqwhdROjOyT3VbkVg2hxKm5C%2Bg%2BR6oWwL8KlwRrEKyMeXeOonmGFR%2BeZq4VsFIIi3YzG8nlHnjvww9P7aDdEwfCp3tRV8%2BvvtnLR8jOe5Jix%2FCPhVdjijACyqa0r556QKEu%2FTmE1c91KfQor3EbyTbU%2Fsn9COLt7AphnQR19kyZyZKYAwY2HupT2ycZZUglFJpNrOo1CZxliMUGgVoxRlAuIWC86t2uMVFwnivs9t6hm1GxeG%2BbyiIC6w%2BNv5zqU2CuN1Aw5sCFzwY6pgHaX5vWi2mxlwB0zD5qtrpFyqQDc%2BVUXQJ3jTzPlfbMrDuv0DFXo0D%2BsYcvZTNaGCxPYUMCPRkNqI7p%2FnugLJm2eREGlEr6KpntDOgu5DIUjCpV3Apww2JwAewqFTFjrdaEy6C86D%2BaD4u0o9ObmzotnDNh9DPPZKK28X7B8QB023zZZCC6moYOK8s779hWhGAee06SSuOhtKGT5FlBPX6jGHQ%2BtnTm&X-Amz-Signature=f1f4fd3e386333ee0b47ea8d68f2cbdc40d8ccf0102cc8293439104290166e91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USJDM7ZH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoF7KEml%2FKfUPftZCwbBoBcKAzipn3Qpt%2BkltRvMMjSAIgRevSipudQjzIK%2F0yJwg06IWy0Oa3lzAr4TOc39HrnSMqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMj2w7l3UJv8xB9QSrcA4Ihfdis48MOf1KHteMcnys77Q%2B2mnH5dsEs7AYFN1fRMv5As6Kv9fBYnZOiI4SZj2hzBi7FXILRV%2FH2H4yjqY%2FfFTLC6qfzqaPNOb0M%2FLJNjMxI%2BfXMdLxtR6or5u49%2BPEakOHNwTFDjIjUnyW73%2Bb1CVm3skcoNPkYHGyxSAlLp7Tu%2BCVNq7TpBCtlj2tVlraos1EFnfo0WtyHvuIj1sqC7CegxdExiUOSnY2SPW1iBhH%2B8PbRoXK098yfNxEyrQbLJFYCpuf62wnIdK2xw%2BQL%2FhpazhWv%2FweIOkdND3hvI7P8NUks9Se7Jd4cCPivHj0xk0l8cK4owOExoIH8aDkVkbTo%2BvuA9VtbknNM%2BRUZLd1Fii8gs75SRNYSIeRjr0WMI3XvwAV%2B66GHBm7SWB7%2FFX%2B0b3UXjc%2BqXlWcSYTO21AtssIp%2B5pRkMU7Q%2FfycnyYFeo7Hg6bEMLZBh0%2FE0%2FJSphi2aVUZTe97noxHQqkJYwflyAAARvVUha4pqSMr4MG%2F%2FI46fqkHgv%2Fdm5yi%2BFulQE%2B0AbVZ%2FcLFM%2F5mmF7M%2BWaugpKr2TSNvoUB0qPhCvCJwc4r8qgtaQdZqkwzCGnjN81LksSHjxzQPPtbXDz2jMshGSZWOg5Ru00MLPAhc8GOqUBhwHzze2bgvfx%2FmlHiOw9DOzg76TZZf3f29HBpTaxup6RUmPtbn5esZCu6FANX3%2B1W%2Fjd7ibw6zwpW6aTTl4w6gAdOuIcwPod4tp1TIQ6JrPGx6m3XfqJGIp%2BtJp55%2BtX4zEAyKO5yZgpIGZ1cUsEQV6gRlVz%2BVmTz2MWMHLwpK%2BwhYPCiehv9Z3oYF6tDSJzrIZyBVJcJbW2gy4QcMTfu9S8%2BzN1&X-Amz-Signature=a2965dd1a5a0b39a2115678a3b201d8217e04442545217b38ddef5a51e5937f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FJRCRD5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA8O%2BUoZozLv0gMtb1PnBV79Bs4kzRGKrAOLMuIqHasKAiEAjQqDJDUzPAOYZdw3B%2BdGNBvfLr2Zsmiq9rkVzy%2FlQekqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOmyrGnt9c%2FS2MdvzCrcA%2BBz4sZ3A3GguGtbfHjDh1UojggVU1uMEpqho4QbOjHM1AQokXTfNyOgk1dJZUwIkmtscVnqXAIPmocM4U%2BqxUDxRr6F8Zx2VyjD5KWEmRYOCHZ53oTkb5nemGB5lkyhWXPH9B4Tx78In8b4D3Y7ZKTU7Ffa6SICXvCraSd0ULN0%2BybaRsyEd3ON%2F9NSO%2BRhUlzOqIIlC%2B9GSulHzge5%2F53NLngoe8Wi2IgOjKrKFRnKBl0tNmOB6uNZbXO6ghhge5C7NpWRWDawem2f6LANCQl0P8AmjN9y5GGHGSHZ4GC%2B1i0ToyhbvyVERnGObVT9hWN3qME1OE5UQJckaMn31IjdWaH3WiEWm4Vvl4VLvI2k9jqv%2Fzp%2Brvd7O%2FjmitaiyFnG1pyK3CMQZbuR22VaxHfV%2FYpCEcmMRjgWADkxJ3ZANvGsQQ1bRQ9iGiYy5dweSteVer6LCzU7L2pOXwmnkIa1FsNJh2gHgwbuJZuErvBeGnL6OF%2B3xaGBWEYdObk%2BvgFqaDbY%2FYIfA5gdfYzWAXT6OPORJt9BH6%2BPjIB9vH0Oy0t150G1BsIY95XRWwkmaCDkUsxd3leo98k40j%2FcsUZpDMOqxg2e1Ky0HB7f5WuPj2zOZT2eojaLwYxuMKbBhc8GOqUBNS1Ia3VqA48Eg5iOBx%2F6xzL1SIVc0BWtRUXBy91wTU38gR4hHv6T0Hy5vd%2FI6cG3iiVpueF6VEKoX8OD%2BLHA8XtCJ%2BJl4466SI5z7aV5j3lO%2FGg6Mx1izWcwxzk7CLNSj2GI%2BKdMeYdGucrFDTyWn17WdOWicgCMSUQCTJ1KI5fJtqIJ4qN%2BZAOF0I%2F90XbXjPyw3D%2F5Ovwf5ehC%2Bi3%2BrkJKvYOj&X-Amz-Signature=041e403731014ec9323933cf201de2d5001c63ea101a8a31c7ff21f5c706120a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FJRCRD5%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA8O%2BUoZozLv0gMtb1PnBV79Bs4kzRGKrAOLMuIqHasKAiEAjQqDJDUzPAOYZdw3B%2BdGNBvfLr2Zsmiq9rkVzy%2FlQekqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOmyrGnt9c%2FS2MdvzCrcA%2BBz4sZ3A3GguGtbfHjDh1UojggVU1uMEpqho4QbOjHM1AQokXTfNyOgk1dJZUwIkmtscVnqXAIPmocM4U%2BqxUDxRr6F8Zx2VyjD5KWEmRYOCHZ53oTkb5nemGB5lkyhWXPH9B4Tx78In8b4D3Y7ZKTU7Ffa6SICXvCraSd0ULN0%2BybaRsyEd3ON%2F9NSO%2BRhUlzOqIIlC%2B9GSulHzge5%2F53NLngoe8Wi2IgOjKrKFRnKBl0tNmOB6uNZbXO6ghhge5C7NpWRWDawem2f6LANCQl0P8AmjN9y5GGHGSHZ4GC%2B1i0ToyhbvyVERnGObVT9hWN3qME1OE5UQJckaMn31IjdWaH3WiEWm4Vvl4VLvI2k9jqv%2Fzp%2Brvd7O%2FjmitaiyFnG1pyK3CMQZbuR22VaxHfV%2FYpCEcmMRjgWADkxJ3ZANvGsQQ1bRQ9iGiYy5dweSteVer6LCzU7L2pOXwmnkIa1FsNJh2gHgwbuJZuErvBeGnL6OF%2B3xaGBWEYdObk%2BvgFqaDbY%2FYIfA5gdfYzWAXT6OPORJt9BH6%2BPjIB9vH0Oy0t150G1BsIY95XRWwkmaCDkUsxd3leo98k40j%2FcsUZpDMOqxg2e1Ky0HB7f5WuPj2zOZT2eojaLwYxuMKbBhc8GOqUBNS1Ia3VqA48Eg5iOBx%2F6xzL1SIVc0BWtRUXBy91wTU38gR4hHv6T0Hy5vd%2FI6cG3iiVpueF6VEKoX8OD%2BLHA8XtCJ%2BJl4466SI5z7aV5j3lO%2FGg6Mx1izWcwxzk7CLNSj2GI%2BKdMeYdGucrFDTyWn17WdOWicgCMSUQCTJ1KI5fJtqIJ4qN%2BZAOF0I%2F90XbXjPyw3D%2F5Ovwf5ehC%2Bi3%2BrkJKvYOj&X-Amz-Signature=655cb2716a87e855ebbb37a5871a7733329dc92307155e0a807a39fe61a12099&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RCLOMBQ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDc0KJIiwEbu0A2Sd32zAov3Ks3GpKJ7EdEyCWf4Uf5fAiAX42FEI9KILD6l%2Fgk2xZL94d%2BSARqSmC9ApNtatTU74yqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BcrRIQKBM%2FYBqCFGKtwDrY6Nt8kbxbmyzpNuvEb5RQwGpxfWorczdPprLfqdOugcLlYECWhXQfWhhLk3BAA5HYE7ce2WzQ3il6o%2FzzLFE5tGtMhgzznam4T6oW%2F6St1VaHj5h%2BQUSguTHxskyRHQaywq4K2%2Fi0wdW%2Flpok%2BM44NptASwZhgae%2Bw44zCDMT6VtwoNgDLq1X%2F7aNREW8AD4VmsleD29PKvdBpAJG%2Bry852MgBcaZIN2UatU1qrFyvUDr1mKD%2FVdFT4xWik1wU11l5XCKWoV4Gc5HKgkemXXp%2BiyjWRanrxTrUAdflHJtbrO8DiidvFxn9fZwCRhGP7LgmZIvfHyLARKhwtJllQao2xFz28m0eRSJM%2FRDcww6kvfVIo61kfQabRGqAiyS7BSEdN%2BjsjtN1DNIk8uHaM3Ne2Z1zsH5ctTkMpmyLTJf1tl4yTXie8NN4e7c7l0pHlqbsW%2BNxqwBHrZKrOYdkOfdXWSXUtWiStgKwX%2BqkgNybIDR0xjDv4nGt2aE2TK3Y2TEtxbLlFiTltZdqS%2B2R0OeiCbAmvVG6j6roLKtVWiPP%2FhxU8RAqonfMtO4wZmnpg1LLPetTTZXekBQixHtiqZBVWyap1Y0fl1nlGl3SqgQJ0xZ6UmVLcfkn37okwhcKFzwY6pgH8%2FqJHEjIt8KCxFn3xQhzScmvkvm%2FR3XUGzyEUPm5WL4UY1l3x3gxYaN%2Fd%2F0OjJImgkrzIsSxS9eM3LBpaY5VlgYLgOP%2BCdbzXuxN9FLluHAsK0a8h9IE7ztvkgJ%2B6TqCxfSLmLo%2B0jrJZbwfM0WRPcbq1KMLtD20Odwu05aLpVoolpe82POKubLyjf%2FTYex9o7LyVIIhbyjZm16Ek4A4xp5yDjtHW&X-Amz-Signature=6d2946a87542c54397cec0160d072eee3b2ba273a46444348ee3c92335e4709f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBG6LE7S%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC3i5jS5Xy5VRUGtkAVzeGDmM07EZ3NjwT9Mbfu2tXG%2BAIhAJjdmSOY8Q8EalllxRO0oBkQRMS9jdXRGVGlhKcbdWiaKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzolonXgRXjzqYwTpgq3ANvH06K2AthIPC8fPM%2FQF9vtUUaoHtpeMgm3F69L6HaLvjXliFwUOdSmNB%2BCy7W%2BEOI9CHawslEf0HGDjZ6g640ELR3ZdExx85a3M7PaSwRTXD7yW%2BCUtELR1el%2B%2B5LziZEnwadlHJMMk0fI1Yq8Rto3YC%2BfbtAzmAww20nwLUGkTv7tXhDVZ0LaNABpEZlX5RMnR1mJqK8BwdCKXepEVVfE5LWY5thiYqU7plBp8BxW1qLclsGuLKpb2OolCALdr1X7CacTUCChTkjMdpWROo9xsXuALhkxqYNDpw%2F9T7XFCmpizURAzm30yPWt0gF3n8xc6gehjo0MPKn8X0iqsWklAlC5Wxa8HSArzwkQXUdeByHoY9YcE87SMMRafe0Se6pCbN55Zpfuoh2ndubon%2FpVrlD3M%2B4185WHIZWCrhYWLxI6K%2FETgXgJPC%2FU0103G4FuO%2FCjJRXcBSuWNzk%2F5%2F0nhJkd40EHq0KctHJq0nZiql%2Ff3bRjxIsluzakG8dXvWOORHf6GwF%2Fqz8cmULTE94dUYA2KrxjnxMZ3ch8IuLaJLw7vK5ZSAsJEU8x6J%2BunH0kgGRMyAtzW4aCSegdVPj0vUrF8Ohj9pnPsImMxTQN3ryIUh956xLglzDMzCMwIXPBjqkAWAsP8CYRp9C4o%2BrriHG4%2FjCyoBkeMYKSAWd5Si46ZvGdoLPYr3%2Fc%2BK5W3n553QW0zGBjqVTUjizsPop%2FKJTp2qwlb%2BjRJwZLUKu3qeO62WH3vz5GmfRn9bixAKiY3JAO9XynRDhoS5SQY2XKePJhTeqmNIs0I3%2FKV6ACpR7Z%2BsSEeIk1ST8JW63TozCQ4mDTFGmBSmsFfRMdZDjNydHIVhjCJ4y&X-Amz-Signature=fc128aebd8b6379e56b502d941af185e89a60b19a8b4eac86f92063ec7f98042&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UYC36AQ%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDk3U7sf%2BmSvBv%2BmIRVBON9kijigvM2ohygqKqVYG2%2FOQIgePv%2Fj582U7LbRV4JxFaE4lsP4CowQKymtJlum6ORFgAqiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDOvFzBJAk7b8XMGSircA2IjFSWQImPVm6uW54pIdNy%2FaGDAjdfpUTiBQbUw4o1eu2HdTtDLzrp7CjUKGBsMP3FX82HSu%2BtLuaUCL4aDpAuRuDCxfQ5E%2F%2FicBaCSQdF6Z6YYTnflDLIRUa3TW%2B7uf1NdAkGj9HulBdG%2F2xS%2BKYdgJuwzuvv0ySS9Wc%2BAlBZVXuLJLmgavDD07tKHWh61%2Be8O2TAO6FAvb3GwCA22l9x%2BFkF4OV03fIxqoKeiXACx9ADLfDhj%2BkTjk1pxZUZZmZzQKPeCz9F4n%2B%2BDi4cy5UqWVmKC28E5W81Pi435AEx%2BxYdvMIN0JziN91jrRPpiuG3dWKa1GW5rdEELNRciYNQo1CVeHLc4Z64%2FcJI%2FBCfEBULIiEou%2FRDoP5YCQ3S307dE0%2F1ZMUhoA5xiBuP767FVeHnBnhy1MUVKkFNCi%2F%2BW9BXuZWsypLLBKDQ%2Bknu50CPwzA7SsnJchAnx8woftduJ4o0jwz0f2Q8WAVoONGcZERX8tBbBPRe%2FW1jT17LxdMp8%2FVMys%2B910asfB9qNqTLF64gau3fnUqL%2BjrjejmHOV30f6mBsHxy%2BwlaT5Rk8BKZzdj7p05coKmPPYHObGkYwr7jQhxCkGt%2BFTV9BMCdzcb%2BFwexImVk3lBbjMKbBhc8GOqUBnvG4kxmKSXu7wJIuQ7trPDKLQbGXTIGbWH9gciLd8IGUorUtV%2B7iwyVmCGDn%2FmP8I17Gd29suZshBa0yI0o%2FKwhZmQbSYMmErouS%2Be1OUxnLSHy3nD%2BdUsOIDEJe3nWCEzClwAy2JeIbqxFyiFMsel%2Ffnl3n1QMNUBjDqbjkeEkqddgS2AwYyrBPtX%2FrbGOxR5t20gg27tpzNjb0IQCeNLxwLTgM&X-Amz-Signature=0b36f9a20f9c5c46ee139dfdd5f381dff4cb5ac54cd6bb11957659006b95c9b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X3M44WU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEZxw45P8ayPEsWmSpZnM8Oh%2BrhnuSu01Vt5UD0wjCMFAiA7pMubpz%2BvdY7CqT2VCmg0ctKumxi70f%2Bp0W3LmQYkqiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYAQm9eIne2jgYnrkKtwDYJ7psAtGO1gm%2BHZDR9eg%2Fhk9mu5DhS2JU%2B%2Fv%2FP%2FgEqIigahFWpdz40BZxSjSdLzmhtBJkBeCgR7p33u9C6KOtWSxPkhXt3PC70sLQhElO1pqwYd3SQXB3KfcH4OByeNRqHc6f0GMLpml%2Fd0abpcnFDcFOaHeXCdB%2FYWyRUIMSGwuRGu8rmoTFouJYBuKxgFKXXML9S1rKfoY4eblPBdGsgpxpBZc3pDmOhNU%2BV4nMaaJvdc0wHDqxRDzgxSHI06Zr%2B89j3JtcR%2BiT8JrQUw9WURRXDtuiVRLaoulzHSStNfrmguqRgBFdqEoYFAOg60RwFGWrio%2FaBUfuNklclIvO2dL0NQ3mra2OWCaune8wVcn0PnNp5B2uQK3OUrTvwKq%2FTVeHscGOV4x15LWgupHErg3aWftmdsh7sRK1TW8RxPWYaYOZbtlnbS%2BvQX1JjSSXQSYzVWh2J5nJ6XAG2XVCCaPEzG4lwkijAJz2bPhFMWdEwHhw3kxVWyqxg0sOa9LgCzWVVJNQFA9LXc5%2BWB8sKfk5St%2F3EisRGNmApQfdIgqWvYt5HQyu2PdC%2BxO5nSdORy1NHiR0oX2Zd4SWZvLr5%2BAox0xpWbtjjdwzbD%2BOhtN7l5jZZEWCK4PZ7gw%2F8CFzwY6pgH98cZ5GBcQiZGbnDxZ50EAuY5iqzISspnRdoBokSxvBmzSNDlr6PMDishbxWiURuci5jhUY7URbBTS1PEcbH8F8amzE3iVtU%2BFtPnYBbANTi2vwaPslnGtCdWJ%2BjTJEgWKU6%2BNgLFnXztCMSsfJHhsCDAbDcqWSiBXBt17Y%2FzoTQZtB02JM29%2F6S6%2BYwyq4KaPn8S%2BTNjXJcEQb3V8k%2BIwlGFNU6dD&X-Amz-Signature=040fab74d955c0b834da0dbfbeaee0d3617121f6828c6acdde5189672e52fc87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665X3M44WU%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEZxw45P8ayPEsWmSpZnM8Oh%2BrhnuSu01Vt5UD0wjCMFAiA7pMubpz%2BvdY7CqT2VCmg0ctKumxi70f%2Bp0W3LmQYkqiqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYAQm9eIne2jgYnrkKtwDYJ7psAtGO1gm%2BHZDR9eg%2Fhk9mu5DhS2JU%2B%2Fv%2FP%2FgEqIigahFWpdz40BZxSjSdLzmhtBJkBeCgR7p33u9C6KOtWSxPkhXt3PC70sLQhElO1pqwYd3SQXB3KfcH4OByeNRqHc6f0GMLpml%2Fd0abpcnFDcFOaHeXCdB%2FYWyRUIMSGwuRGu8rmoTFouJYBuKxgFKXXML9S1rKfoY4eblPBdGsgpxpBZc3pDmOhNU%2BV4nMaaJvdc0wHDqxRDzgxSHI06Zr%2B89j3JtcR%2BiT8JrQUw9WURRXDtuiVRLaoulzHSStNfrmguqRgBFdqEoYFAOg60RwFGWrio%2FaBUfuNklclIvO2dL0NQ3mra2OWCaune8wVcn0PnNp5B2uQK3OUrTvwKq%2FTVeHscGOV4x15LWgupHErg3aWftmdsh7sRK1TW8RxPWYaYOZbtlnbS%2BvQX1JjSSXQSYzVWh2J5nJ6XAG2XVCCaPEzG4lwkijAJz2bPhFMWdEwHhw3kxVWyqxg0sOa9LgCzWVVJNQFA9LXc5%2BWB8sKfk5St%2F3EisRGNmApQfdIgqWvYt5HQyu2PdC%2BxO5nSdORy1NHiR0oX2Zd4SWZvLr5%2BAox0xpWbtjjdwzbD%2BOhtN7l5jZZEWCK4PZ7gw%2F8CFzwY6pgH98cZ5GBcQiZGbnDxZ50EAuY5iqzISspnRdoBokSxvBmzSNDlr6PMDishbxWiURuci5jhUY7URbBTS1PEcbH8F8amzE3iVtU%2BFtPnYBbANTi2vwaPslnGtCdWJ%2BjTJEgWKU6%2BNgLFnXztCMSsfJHhsCDAbDcqWSiBXBt17Y%2FzoTQZtB02JM29%2F6S6%2BYwyq4KaPn8S%2BTNjXJcEQb3V8k%2BIwlGFNU6dD&X-Amz-Signature=a9b26a8587a4982e9a618fb144380e0bd61e7eb14070f6590ce2e134ffa42380&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAISJVKT%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAVNI9VqN7Et8YSseLtZP1Tb07lFu6LSJ2bew8mRi%2BXVAiEAnZX1wMt9D%2BVPA1XwL65r05USWPDckQPdiechJZeBz%2B8qiAQIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAeLOHF4ja65WjUYWSrcA92059oI6CKYCPOn%2BmwsgYikxtMo1qbWqBskQYMQF9DOz9FzEOvs8TY3mr2ALW2BCPqyibi1Eb%2Bf9OAdXeXx0%2Fz7oNSRyyR5AYMNUXxChsnqyWjIxM5ZgfW5MbWGIyDxepmERgZbJrFsoV%2FQ3b%2FzrDedGKf3Ulhqd6DIGyq2PhOeFyj7xumYCsJhbaz7UGhLA8zIk9YSRFwzx8m9d0dOMWu%2FwumtNhc9PqoujpMb05l4SCElnvSl%2F%2B32pK9L7mRiLuNt0uSHFrea2rjKqWy0oF5J5yL%2F4v3lwzTr82%2BpaFIMMhPhVDIOqgn0pf%2BqJ7XDjAAibEuE8PIvmnxcMq8AjciiUbjHJ2yl9ShOBqMkecJrlchbkHte7kTF6gHVZzK4GMZisKM8PwDz2C4TC%2FiDn%2B6NEehru%2FVEsMvQMYs6KQXi4JuEC4FDJcp0POok9XySwsfB6Bd1CPw70Qxf0811518ZaUr2dvofq1cm7uFXsUHYFUY1Nswqoc7Thq9SJncnQ7Sq%2FN%2BYWsPjqw5ySiHkWdP9wqgSWo0czrGmnjoUV16MTStsG4Tt5kEi8AhFTJAmPM5By74RkbgVUB2roMIyNNiIbW%2BSTeuR5vMPRpmrSI%2B8fl9Kbv%2BJv%2FQbdWvqMLvAhc8GOqUB435%2BfVqQ6aGPBqG1eR9%2BljhRUzJFqmOCIBFybSyNwmh3ZE%2BK72ec1uq6hkqs1gUrEdEtAb2Ddsqa9yYbUAvSe57%2F1XYWo0PustkIZU3tmom5rrqtRqF75P%2BLTA1GzxwjOIrbeBjy%2FuGBY26WDdmkcOC9cGtIu%2FRfEfNKRhKtsuGst8YXGbUoy9h%2F4j5KKX7HeR7Jc72aIMvwI%2FXgtkiFC6XoUKoU&X-Amz-Signature=f7fa49107f724d4216887d9e299577d5d680c5fdc937c7b1fb7c39796c8f424d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYODZZC3%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNyYuHqIUYKLMqoKyy3Mjg30m9DQTEJ1xu%2BqY0YglwzQIhAJXGL6bmApP2pxD4A3KRvxdvMMmAy%2FqiRiEp98O%2BRSflKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzV%2FaIlHpgqw1KU0B4q3AME8wK1BoIE1HRy50QbiCm5lyw1Fo%2FcibTG4quY6ct86A2uGEvMJtGBGcqHRxOkoI0LcyiREE2DFI6XX9lXrpgAabx6KsF8xxH4MbWTuf4Tg5DFMnkXtyRI85guZgEv0xpiQtCsVTAskhAV5XaOQvfCYZ%2Bh0mmMW%2BKW%2B84u1OXRr84nprXkhAgqPZSUKkAglFBe9itUc%2BiKxZEkicMqmV2M73Dp8LisgYjQ1eXv%2B0iLZ%2F1bRUQCv6dbYEbrL5rzd%2BhsXtLO8B2dYSp%2FRzhl8Lrt0TWL3Pp4d9jp8agBpywu4BbH1Sos1Mjunx6YKEjIZl8SAb9dh14KW7I3AAjQzJ7DcCX6D2KakTMiRDEahQgfcWp8YiQZ1kBvz1TzOmnajzofzPzx5gwAir%2FxgUT3Ygb3mb2%2BSvUR2%2F3Qqgi1Yq1%2B3mIyAWogBGOD0OUn%2FoXOAglSNDPM6EPtJNipcaJ4KMk2Pj00eHTjruEFa2jkZ5rQ5UyfA9pw8EcI4YjJ9q0yb%2BHzbZvl6T3ESgRFsuqfuLiKLodSAoH639NZj77bUKG7pwXOuljO1ccLMFUgoPwpsYFVYn3CyOelFgvLMDAkML0jP0pK%2B3PLZy2qI8znre4HOCcaPRQozv4j3k4QxzD1wIXPBjqkAcU575u3rMK%2BUeaZeVHAHbudO0CjEc7D1XDMvGYkVEJhe1cUZfAN8OWWh5nqwvL%2FaCONrrSk74pYoqaXuiVanap%2BrA70AOvne%2FNpSDNizXVmefCH6jPcf8Qoist5b20CnAlXSQQu3EPeH4tWX6zDF18mlNCEUk6i0xTfxU5y%2F6TCbHGC3hB5doQbdKj%2FlR7fc4udzGtWEBcGQFlzZse2WYZInGqA&X-Amz-Signature=9ffa29bda71f6c5f676952653ef3ba230a8d8da2e0f2fe82889079948a290ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYODZZC3%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCNyYuHqIUYKLMqoKyy3Mjg30m9DQTEJ1xu%2BqY0YglwzQIhAJXGL6bmApP2pxD4A3KRvxdvMMmAy%2FqiRiEp98O%2BRSflKogECMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzV%2FaIlHpgqw1KU0B4q3AME8wK1BoIE1HRy50QbiCm5lyw1Fo%2FcibTG4quY6ct86A2uGEvMJtGBGcqHRxOkoI0LcyiREE2DFI6XX9lXrpgAabx6KsF8xxH4MbWTuf4Tg5DFMnkXtyRI85guZgEv0xpiQtCsVTAskhAV5XaOQvfCYZ%2Bh0mmMW%2BKW%2B84u1OXRr84nprXkhAgqPZSUKkAglFBe9itUc%2BiKxZEkicMqmV2M73Dp8LisgYjQ1eXv%2B0iLZ%2F1bRUQCv6dbYEbrL5rzd%2BhsXtLO8B2dYSp%2FRzhl8Lrt0TWL3Pp4d9jp8agBpywu4BbH1Sos1Mjunx6YKEjIZl8SAb9dh14KW7I3AAjQzJ7DcCX6D2KakTMiRDEahQgfcWp8YiQZ1kBvz1TzOmnajzofzPzx5gwAir%2FxgUT3Ygb3mb2%2BSvUR2%2F3Qqgi1Yq1%2B3mIyAWogBGOD0OUn%2FoXOAglSNDPM6EPtJNipcaJ4KMk2Pj00eHTjruEFa2jkZ5rQ5UyfA9pw8EcI4YjJ9q0yb%2BHzbZvl6T3ESgRFsuqfuLiKLodSAoH639NZj77bUKG7pwXOuljO1ccLMFUgoPwpsYFVYn3CyOelFgvLMDAkML0jP0pK%2B3PLZy2qI8znre4HOCcaPRQozv4j3k4QxzD1wIXPBjqkAcU575u3rMK%2BUeaZeVHAHbudO0CjEc7D1XDMvGYkVEJhe1cUZfAN8OWWh5nqwvL%2FaCONrrSk74pYoqaXuiVanap%2BrA70AOvne%2FNpSDNizXVmefCH6jPcf8Qoist5b20CnAlXSQQu3EPeH4tWX6zDF18mlNCEUk6i0xTfxU5y%2F6TCbHGC3hB5doQbdKj%2FlR7fc4udzGtWEBcGQFlzZse2WYZInGqA&X-Amz-Signature=9ffa29bda71f6c5f676952653ef3ba230a8d8da2e0f2fe82889079948a290ea0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZORHSMF%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T011220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGw9OImEmHdfjphd%2FrHZVL2HQbvr3oJ8WQ%2BXqbQh2XdIAiAscfUd7FVepE3Z2zwq2bqdfOvahCVsDYXUhEWavpLbpCqIBAjH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzudELPk2rOD4TRQQKtwDqLaKzTMiGmDJp613Hbz5%2BRo%2BpqO0qGkV4XbhL3Dv0NvW5pL6p9JeaKNqfXKBy7kAtKm8M1tVDet%2B9J8efRltS2esbZg642QhGkPBqF0TqfSYp8lVgobkjpjoSlTSvAiyq9seIMU1qJsu9%2F3kpSa9Ot%2FmCz24ZeruDf3msG40D2PzRwUht9Yt2C27Qwaa1SgCoVMsvT%2F8%2Fd0ajVnOhZ2v0Uy%2BBrNIhNtBR%2BPvAFpLem1xaG116VI7pbqx9NZBSrD4cB2hBUxAoLWZ7oTVFpno%2BZvzU5TsLtmb%2B6fbhl9ANHMLeGceIOXsL%2B7BDXPowYJY8lA36b7hNGnAQFjPy%2B2tu718w7e7RhUBofE%2FMv8fK4k4Kh1xeTFHTmhrAznaY5uaHurVEcGg0GBMlfrQ420ZIkgumE1Er7qty9qQ9OxQEZL%2FT6NeAh1aoiy2VSde9ykOFuFg3ieUcrtHuWTbYEBNCsEpC9zS%2FgjXWiuu%2FKivszvn7CJ%2FF%2BlqAL1jD12WnCVcEsOiMfdfxkJQ0Acnrsvhr6zZaCC3p%2BuhssjvwfyNKBPcd3OLhTtkXXqONZPIji8kqohReb7Y%2FdjG4VJisLZ7G04SzLV3talyJZbEHN1OfFjzHDwcT5yw4FTY5G4w88CFzwY6pgE9eieqPK92W2S1o1GEgnmePIT2lwqNGVT2hNUPS5jnv%2BLc3d19W0%2BQNCPD%2B3E2HXr7CQJEcHEgLx2aU7FE55E7Mgj0cnQR87NmKw3XxQsxPBdaOsLPZeDhz0L6Q0JKrwCbBWDR1hNEWKdnwCLNLP33uS3HXnyDS57MKejtP5UygjnD9MPTeiYIdyAhiwhggVsz%2FG33JfcmUEZQBlMUKknpxIEZNtDz&X-Amz-Signature=c17f8c95e2d640e8b47d09169de00067946004b61decd04d5f720d754ea68ae4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

