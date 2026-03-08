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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOAM6RIN%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDl4NzD3t%2FPdIZUBC%2BBP2tPNodXjXJv7RR57%2FXkceGbBgIhAOlRZdgPs3wbViQrF0dgIUdHVRKQTsmUMMjSH1YJpgxxKv8DCBQQABoMNjM3NDIzMTgzODA1IgwoaLdCzYbuhKCMwSUq3APBjMhH3yvh989ILUmK55hSziAqCT99SRzICBoDN958EOetcxxLLCt7wtf8%2BaOSr%2BMeWu14VbL6VHLQMhc3TjN3GUuXBTVnnh63gLWX%2BgQJZrjYCvwDymAU6t7w27qdMvovdMXET539JKsBTanrZq%2BZdAtgZ4cmpjdzTksy2sP8jagDwAWfYnza1u34lQspq8Ume7v5NdeyVbNC%2BoSG8yMvG%2Fa78x9uqtqyXh7yr6bvPmZZhVW1PSayTv0sLYGNG%2F76rCkIvFfiPUEtVlBF63y0SAP%2F8nyBKWN3rsK3F3WWvKqoxFn5Z2QHUOZvVAyH8hEHFmMPGlb9DGkRKgYclZuGs7nKTlV4SqeuDWLwqDE4UmXZZIUsFHtjGYYwov8sdWrhkjlkpMIMu9XO7yY9ie0N%2B%2BM3bQwyF1nxK%2BNUuh45nCQ%2FDBzopQQwxNI4GqfRyWGiDsnhS6eCa6THZN0fOAB94cj7UalDQVWI1uwzhxUU%2BWLq60VVJ2tg7aD7i92goQKXVzKZH3r9ZcR0EVo2RqhlQToSTf4Ir0pYkbPdyv6k5RuoJQ9PPYpWUcBp8aOSb8ekKOMSGdjsH8rZvAusRYbCgvwKMfEm1h5aeUTBpsogXNmui%2FoPrDExrQEDZDCWorXNBjqkAfG6w2Z0zloDfk%2BSKWpK7CQFmUt3%2Fmiv4rwysUYTmGdnMAjJ4hOBljvTqnIJvJWKwn3E3Ai3qhJ1tKBVhJuxGYCa%2FGogRVKOGr1JuODP3shhwc%2FcynzSCUWRH7k8Rsq%2FYahLGBKYDhXCAIxaifX9y1bkwQbnakEUE9VA5mpsngvi7B6bz7qWSBWfcaXjMuTq7ui64erkTg1ecHUH4OsCItuszPKU&X-Amz-Signature=023537852c3b3f5cb89beba1c8302a9dfd30b68a4695e24542923f4aed5d1112&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOAM6RIN%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDl4NzD3t%2FPdIZUBC%2BBP2tPNodXjXJv7RR57%2FXkceGbBgIhAOlRZdgPs3wbViQrF0dgIUdHVRKQTsmUMMjSH1YJpgxxKv8DCBQQABoMNjM3NDIzMTgzODA1IgwoaLdCzYbuhKCMwSUq3APBjMhH3yvh989ILUmK55hSziAqCT99SRzICBoDN958EOetcxxLLCt7wtf8%2BaOSr%2BMeWu14VbL6VHLQMhc3TjN3GUuXBTVnnh63gLWX%2BgQJZrjYCvwDymAU6t7w27qdMvovdMXET539JKsBTanrZq%2BZdAtgZ4cmpjdzTksy2sP8jagDwAWfYnza1u34lQspq8Ume7v5NdeyVbNC%2BoSG8yMvG%2Fa78x9uqtqyXh7yr6bvPmZZhVW1PSayTv0sLYGNG%2F76rCkIvFfiPUEtVlBF63y0SAP%2F8nyBKWN3rsK3F3WWvKqoxFn5Z2QHUOZvVAyH8hEHFmMPGlb9DGkRKgYclZuGs7nKTlV4SqeuDWLwqDE4UmXZZIUsFHtjGYYwov8sdWrhkjlkpMIMu9XO7yY9ie0N%2B%2BM3bQwyF1nxK%2BNUuh45nCQ%2FDBzopQQwxNI4GqfRyWGiDsnhS6eCa6THZN0fOAB94cj7UalDQVWI1uwzhxUU%2BWLq60VVJ2tg7aD7i92goQKXVzKZH3r9ZcR0EVo2RqhlQToSTf4Ir0pYkbPdyv6k5RuoJQ9PPYpWUcBp8aOSb8ekKOMSGdjsH8rZvAusRYbCgvwKMfEm1h5aeUTBpsogXNmui%2FoPrDExrQEDZDCWorXNBjqkAfG6w2Z0zloDfk%2BSKWpK7CQFmUt3%2Fmiv4rwysUYTmGdnMAjJ4hOBljvTqnIJvJWKwn3E3Ai3qhJ1tKBVhJuxGYCa%2FGogRVKOGr1JuODP3shhwc%2FcynzSCUWRH7k8Rsq%2FYahLGBKYDhXCAIxaifX9y1bkwQbnakEUE9VA5mpsngvi7B6bz7qWSBWfcaXjMuTq7ui64erkTg1ecHUH4OsCItuszPKU&X-Amz-Signature=023537852c3b3f5cb89beba1c8302a9dfd30b68a4695e24542923f4aed5d1112&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCK6Y5OW%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCqdKOw7rc6KeO4aCFb9iO1FtMoxLBFfVLWc2W7n0bdSAIgB6fLktqMMR625KF90HgDRhNL8eraRXik3%2B5DUn0H2Ukq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDFEAELrMXnVKgSjZ4CrcA%2Bl4AMQQZKMbabVUQ4QnfcWMNEd2l9%2F2M%2BrYFrikPK6qE6sGS12re2u6K308yuVPbIa0MxOFx%2FTOqpMgGY6VqMS2uXEZFDUYmT3Y8vQsWzUrd0gRDNWfwnZzFJRl1A8zw3SJq88NqtS2btMV43c5wCTBRnsdfLD7pLXo1uOEyL1A9lmOn%2F9azTkkNmM8EsKORBSlk9wE%2B6b1YuJJNwiaPp%2B6NWu0gCLrW10C3duri%2FiwgCh%2FHodYsbkkMbnlct%2FvQuTT0OXJ8c5A3Sh8ITvmN5bonIRx66Ci9zdSzJsGiqq2qitvobt52df6FBwUH7OaYxcburP6AcQAnnIabJJgtTzGDgkjKo%2F5IcT%2F%2BHus2CmpcrGwpOepNFdMifD5vH2KdO87ZtqmknjpRvAiOsLog6a%2BoYj7lQqs84EPgxGWF53UzVf7bmLo5WqtC3opqzBj4i79RKcXlWkmwqZZLTDjTJra%2Bz8Y7Qpf2yj%2B%2FeBH3su6IHZKUjUbSiuuTM2okZoO3TSkFKZLbUg2NHsBN5CAWzFyh6ErmZ1CF509sPapC2%2FaaLIf8AUUVpcN3GAOUjQd0xYGxqXcpdNJQCoxOrGrKR1VC7if4BU8RfUtiPAkXxlO0wS6FSTBA6fTVo30MLaitc0GOqUBe8EAZ7fmsc02Q0BxBkSky5nSCPm%2B6ZmoCwbgUfS9kHAhsYG7Ihz%2BT%2Bc7rGockHN79n6rGbIbl39buyOgkxFo8sq3LhkFtYaPNamkDUJlueQwDX3vxeTTV4YbTgNdhs2IF3KnrPEg99HXIhwl6n9WRO31mZLQWbpm4uczGw8f3PHo6HPXLFZ37hTd%2Fnl41SIWZ8UTEBxomQMiiZT5IJiSQMgseQwy&X-Amz-Signature=5ffd5dcdedd49de49f3d281565504459fd9f5fba402dae641ab9059028a5e5a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCNNDACP%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCh5U5Y81onN7js49T57ugA0hXdmjr9MtCvq48A6tC80AIgPObyIcVTz6Ft1an6aYpAytl3RqGy0cynfIlJ8Qt3odAq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDAXDNXyHljO0MS7zFircA7gf9syEPqFBQXioeQ3ENy2DJwgTsWGUqJruwih3HnmSaz2DQ%2Fh1TgP%2B%2BSpx6UBf5WV79RlH1N35PrxCnCc%2Bd%2BP8kZQz0ERE4439xrB4NbTdgLomcN3LbO4guU4BgaH4D4qaqozMcDTj1r8Mql0XVcJFoPK3M%2Bt0ACRtYoGeKTQ6enZfkVm%2B35UUrai5KbXPNpfqkZvbId6yvQ5Liuu%2BDpq70%2BxvsVt%2FxbI5h3MaMe7QA4YAEEe5XLZuGqFLMIz%2FLRIpFdbjUJin7%2BZ%2F2bDnjkSGpStBtSU%2F%2FiCeMh%2BhVXwQD8o95fd%2BECsBzsYwnE4aVZTI0VZnz72WnfnWSzPL8LsY18L8ffiMz6o2nRb3z6xVl2yAMNngAD%2BAz1LPfOo8dhgo738msuqa6CsrYkK5d0vVWigM6EVzvrxavK7HuHCr%2FlTWJ6G5IuTejQTHmKfuHOfzW16HqlgqDp4WBMIMS1aJ435RZp2jQ4pUhueVArkz9o%2Fhn1yt8vZ6WgDQPuYL2owxV3wWXMGB1aAIJ%2BuSt7KqAlK5zh6IZfbKg0cajF53N1zQtlyWWe%2FcR7rluoe8SrkEdLoU5lRncX2zq5wDgy1LWQgwoZeh8hHyM%2BGvNoLzVdoNNGGnAZ7sDl%2B4MP6htc0GOqUB7LWLUgCzY1WDZ6qfweeKyfJz7B%2B2nnTO7xCpTHpihzHpMsCZMjXtQ3pIFCMhtKehKCCFVd%2BT8aNZgLfsYX1cTvw%2BAy4nvSGDZgaJtg9ilaVO0Abopvrrot7vonykA3JSlPR31GshjnTNvUX7YBa4ifwYauaU4li%2Bhiti6VQ2tmNdcJiNgDJGdTUYupbCpiLKXGd85qd4XyIesutjJzYC6l5OaYP%2F&X-Amz-Signature=2bfe4db7707132cb066f4f21e4a1bfc3ec05a0a5276bc936e8cd796df9480438&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCNNDACP%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCh5U5Y81onN7js49T57ugA0hXdmjr9MtCvq48A6tC80AIgPObyIcVTz6Ft1an6aYpAytl3RqGy0cynfIlJ8Qt3odAq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDAXDNXyHljO0MS7zFircA7gf9syEPqFBQXioeQ3ENy2DJwgTsWGUqJruwih3HnmSaz2DQ%2Fh1TgP%2B%2BSpx6UBf5WV79RlH1N35PrxCnCc%2Bd%2BP8kZQz0ERE4439xrB4NbTdgLomcN3LbO4guU4BgaH4D4qaqozMcDTj1r8Mql0XVcJFoPK3M%2Bt0ACRtYoGeKTQ6enZfkVm%2B35UUrai5KbXPNpfqkZvbId6yvQ5Liuu%2BDpq70%2BxvsVt%2FxbI5h3MaMe7QA4YAEEe5XLZuGqFLMIz%2FLRIpFdbjUJin7%2BZ%2F2bDnjkSGpStBtSU%2F%2FiCeMh%2BhVXwQD8o95fd%2BECsBzsYwnE4aVZTI0VZnz72WnfnWSzPL8LsY18L8ffiMz6o2nRb3z6xVl2yAMNngAD%2BAz1LPfOo8dhgo738msuqa6CsrYkK5d0vVWigM6EVzvrxavK7HuHCr%2FlTWJ6G5IuTejQTHmKfuHOfzW16HqlgqDp4WBMIMS1aJ435RZp2jQ4pUhueVArkz9o%2Fhn1yt8vZ6WgDQPuYL2owxV3wWXMGB1aAIJ%2BuSt7KqAlK5zh6IZfbKg0cajF53N1zQtlyWWe%2FcR7rluoe8SrkEdLoU5lRncX2zq5wDgy1LWQgwoZeh8hHyM%2BGvNoLzVdoNNGGnAZ7sDl%2B4MP6htc0GOqUB7LWLUgCzY1WDZ6qfweeKyfJz7B%2B2nnTO7xCpTHpihzHpMsCZMjXtQ3pIFCMhtKehKCCFVd%2BT8aNZgLfsYX1cTvw%2BAy4nvSGDZgaJtg9ilaVO0Abopvrrot7vonykA3JSlPR31GshjnTNvUX7YBa4ifwYauaU4li%2Bhiti6VQ2tmNdcJiNgDJGdTUYupbCpiLKXGd85qd4XyIesutjJzYC6l5OaYP%2F&X-Amz-Signature=db6c15d04cb69d5602c0a0dcf95899f5e3f2ee1bd4e15f7d6016e01f56cb38cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627O22JHH%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDLz3nUbho1cLaTnF1RUWYezzCmwyqIypkKY3z2Lo06fAIhAOMiXW9rlJiQSjSIF%2FqWWRAn7zzWSjzu0KUl6HYGQ0m6Kv8DCBQQABoMNjM3NDIzMTgzODA1IgwUqgOqug06j7Cyp8kq3APMqdhM5c2kbz6CU%2FsA3TE0qzzdrjoVaibfeN%2BM8NUgMT57Lk4E%2BlMrIeKPv4okYpaiwbiUlT9HfrX0eElXzkIZ4%2FyR86H5nGFO8kf2RhZOtg6rv5jplpkHDszDBWVMPhD%2B7F4NKod1xXuSQNgh3BU56BIp5ZtmSvTihpxgIWwCAW1cWUOWvUPRljvFxTFMng1%2B4B1CoCuY%2B0VPPI4%2F8pXgDF6EvLBn%2Fvar%2FU%2Fl5ZPC%2Bosw73B8HnpecShmjrEblNGTrAoOr2jJZbUHP82Gaq2%2Bu8T0EimLcm5Kez9vOjB06F3lAkshlXNIdniqVX%2F3QA8%2FQ7gd1rw9lm5lK6L%2ByV%2FXCuk%2FqxrsZJwiY%2FV1KhUS8CJhw2NltwW%2BUG%2FOSwRfbLkToXgXfz5fZyWXik5TXkBrcaAJLobFqFc9PhJKynutYy65tQ3bDCH35fvohNG6TbDDaaDGAxevm5uv9Ov5F6TVbqAp5py3qj9STOjKoYEsgpwjTkb1hqNpPmtowBYrqmqZqunw9mmdE88gPVnM2LByMIhB%2BttzY0t684rUoSZwzrdNsc4pHlbDbEQjfHVavzPxq4eEll4Yy%2BaDuVh1%2F0VmXyyw3hsAhRhTqNpREilzlfwRlZg9t%2BevTKUZ6DCKorXNBjqkAYUMe2Eu5P%2Bpl6XUSqoBzKvtukJjFLVNMi6aF4Q6CaImOQsZuESF%2B26W5lGDcki8yE32GStLx3C97mDVA0sd9gYhY%2FoD7rN4VX%2B%2BouTiMT4nesfz64CGBdcncblsiBDW6nuWHHcsThKU9HZmwGoyizqbItXZpnPrnfp7Nv%2BJ1ZyXy%2By%2FLSgW%2B5mgCu7xToalLOn8XxGuK5sOUHmcscEVTyAHUBVt&X-Amz-Signature=c659c4df5174e12e371413082f59b5c8aa06fee71a4762b10f5511a2e65b5774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2ZGV5LD%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCyKGAaN%2FuzWdNL3ETzQfbDDWX3rGMy2dfD%2BkLYR%2BPxbQIhAIlAt6RQ9z4x%2Bv%2B2cyLEEe2AeS%2BjWO0k8ZOff6UPgV%2B0Kv8DCBQQABoMNjM3NDIzMTgzODA1Igz0I5Td2Hi1ZLjkwYEq3AOBXBCEBb%2F2FIN5DDdo0nqjqCWvIr2Ke6InQyfQKk7E8Qo8b5oaY3ZRUCs28mKlJDvq04fUniA9OFeWFJdDahlFMEbanlzDJouzS4n0S16FRX5ueaXvbMe3KYdanWHPRu78zl%2BnHchIN2Ofg0CayHmIA5MvQUq5snl8mJs8iXtvuK7VzhyWlYMtP0FRfRYe1CJ2%2F5SysFccRCv75adUTIdwGERsrhr4iYq9xpjRumLZiLIngfv0qMF40htMbl1gOyl74fr2R2lwLm1mw7NXlqTxG%2Fy3SehNe%2BHShC0NXuL08%2FWGrbieyAYX5YkVHa8JmiiZ9KC9WARUtoyL0vfpqNAdm0iozUFgn58kG932BRDNtxCLobT5wYKMUmydUyQSB2B0eg2Re9q%2B9hxBZmORgQlFPVFlDDijk3WS9UvmiH21GeeqptQNPAMCVcJjQj4A4RLNHs0U2enNJZqEigtKvMw5jklXazice05b%2B76SLVGDekGTC44GeD0LS1thOPa38GQGroCHR0oAZ2WbEmXEpxGwUX3pzkX%2BviRgzj7qgIsCyvarCDUqElwtCXcV4M2ezrJBiRfQHwhsZdEGKX%2FjkfcgcL6jyztntLwtiZj95HXlfXNSYVGLf5wxLJXHxTD2orXNBjqkASj3n9UkWtMBB%2FzrcxjR8w23fRK6kvJm%2B8PW4FyxQAUm%2FvjF5eIZ8jrhFduWKGqZGTkiYkPyIAuu1h1YrlnSDjUMV1LkJAqgD37DOC54UrXHp8qz5bwTOvIp2Dzg7pz%2B86seQUQVlVFshz1L0rHxz8GgGXP6s0cfroHvpzsF2JrmcCHCC6cHFMSShAZ0zrg5WmmjoYWYkLTW3aBzeSKOin%2FsrQzU&X-Amz-Signature=02ed1629083c0ee29bb8c2770a53fee61ec341bc0961d358acdca902e612914f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GUOK5JV%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCICRnWLzNdbXr9IbWq6z23oZA5E5rT%2F0Ner7CH5VxF5KUAiBZ0hxc2Ng%2BxNWY5AEmjakThmv42RiMkL6gzdBWZg91Eyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMcZYaoA5o92i1gDkpKtwDVDHGPLHe5a1QBnVaZz2nDadYYNt3y3%2F2kEZdsOQBISbdwZowTDXIBWGOeVQQPGS9IwnT2ZpFnZGD8uQw8yyK11ATYu8WGgiS3F%2FRxjEyKT6wWg3hsE74H3%2FTVeKN3lINIYCj1UgEoVrVT0VCvTWMSzxBSF5H0szRiGM4ePfss4CRxg6bdDmmoT7XruBl%2FwGHNvUymUDmfrD20hm2tXt%2BWiGIhd28gK3%2FJPYVnJG4us%2BT7HgSI%2BjxFn4WjOmCSW9PsD%2Bdou83G5OjUIJWNaXp479v9PMPzZGqJZ1ed%2BjC5BHEJZyVd%2FJFtwGmrSHa15un5cCD605%2B6%2BVhsmbBrcnSNikFUCI0shV1LV5FYekgh09jOHyKkxkZG%2B4qZTRiee9RIeL3L%2BVR1zmmazkOWQK1fYU8Hbrw8qcQThjw4recjFKeAe0uwSiWXbOGgS21wkMZ3KzA6jW9SeySv182hlZKJFaoUzl%2FIbHN42E3LNNItyjweUhFjUCrjEgLmevSx69NvxUgNXxyd1Dzh4q%2FV9XZtemi2dZwvPLUNCIzICXAyBlwiL6sspOYjeQW6uE41htL0Jo5u8H2oMvFAt7Jn0BQ5%2BptpKYrX2MGj8YsvMqA1d2dWQU3v%2BZufUi%2BzBwwrqK1zQY6pgE1PP2XPSKCylNSG%2BCID3AWvra0QZXwk6yIpbuja3MIWPVev5SdW%2BLnHH6Qm0blhDIXK2h5Sfxn%2F6Ox70ZfpMe8hgDA1N47n5Kp75D4cLPC35LoWL7BFlICN4B%2BkbNi0JN6TSffn24hmd98EALILvpjYDLMkW7y2qnyRngNXzqOAySwuGSr1Evc2sf8k1Kc%2FPUWExnmMA2Ix%2BiZ4%2B7XpQneGA%2B0xFd9&X-Amz-Signature=7fc28dafaeae71d24ca5393b3c9b689df2e7e73dbcb6a95216c8b4476f43d06f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622UALZAU%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIASsFUNNxQAgm0JhIzTuEhYAPFRF41Mv%2FyvvftS0O1%2FBAiEA4c4Gwlv9AeGKH4gV7mff%2Bu%2BjyqumRFJ1fgBRfIzxnT4q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDBZxKrzLd%2FQMas%2BaxSrcA%2B1DVIjbPx6%2FTeYXETvMYhSdzH8WZ183FJdjY3y%2FBOw0Awm57YREx36IyAYsXEr%2BPbU1SACy5KFtihKDZ82Wm3kZT6XQglZqzuNz7QoxyIjYVjhL9FLt66MthsoDdi%2FPyB0SeTUkRW0%2Fxghd94ZKAT1yll%2FdGWkC7sHRw5i9r8NqQzs9C272e9KKIS2M0Fa8KJ2wAfDQYMvLHP1KP7MHdkKuQF25FYjdq4OUlBV0n2Cnk6ji7VJDMq7BK2XTz%2BLxvKfTw7%2B8pWm8ZupuM7mpW%2Fzd9ClRKEPGuAc%2Fftj%2FiurW8RotU2HqvT5EC74Z7ppAlC0T5AKjST%2BtLtrQHx%2FlWf%2BwU0eISLiSIwIsKmWDEhf4BJjcNU0eM8096SUYT8JUdJDC1blHcSu2D054cRP8Jv7%2Fwpnmq4TDmg06zqdXGQoe3dxpEkW6DUVboSjn2rySkqmfY3BLs%2FwKNO2DzG5FjX9kR8YDs7OnJoQlewTuzuoKtaKuoOTajEOzOlLrSkXPUDr1e9d2E%2ByZMrk78ENkWQiZtFvr7HPUBrUEXVqwLWPbIhFM%2BMfFk94gch9kwaa5%2FaQk3xbDdG3Ot3PyutBsDlLOWpaw2duZ890TCPcELMzjhIIfd1WwgDZzxZXWMLCitc0GOqUBIPHAZKfA5B6VioBIKMShn1nTrfiCn%2FzLtBMj1EciZk7aofblpJF3CwZSZHl15OpwtyfiHVJ05OfFSTgXl3EzgwzxX6PAtp430fI7IQ%2FPib%2BJTRFLKN3ZyrgSDVOARGl65h2pPQGnzhE75qnITtsyg1prHk4yJ1PqyWKn9Ff6Y0nRYOVkQyWYEPhjU2ddfZIJVgwe4nKo13AuzknwRqLsf1Eqlpa7&X-Amz-Signature=6b5961ed859c9fb6253c717ace7d98ab3a906356c54f799576d7a8f724414678&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622UALZAU%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIASsFUNNxQAgm0JhIzTuEhYAPFRF41Mv%2FyvvftS0O1%2FBAiEA4c4Gwlv9AeGKH4gV7mff%2Bu%2BjyqumRFJ1fgBRfIzxnT4q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDBZxKrzLd%2FQMas%2BaxSrcA%2B1DVIjbPx6%2FTeYXETvMYhSdzH8WZ183FJdjY3y%2FBOw0Awm57YREx36IyAYsXEr%2BPbU1SACy5KFtihKDZ82Wm3kZT6XQglZqzuNz7QoxyIjYVjhL9FLt66MthsoDdi%2FPyB0SeTUkRW0%2Fxghd94ZKAT1yll%2FdGWkC7sHRw5i9r8NqQzs9C272e9KKIS2M0Fa8KJ2wAfDQYMvLHP1KP7MHdkKuQF25FYjdq4OUlBV0n2Cnk6ji7VJDMq7BK2XTz%2BLxvKfTw7%2B8pWm8ZupuM7mpW%2Fzd9ClRKEPGuAc%2Fftj%2FiurW8RotU2HqvT5EC74Z7ppAlC0T5AKjST%2BtLtrQHx%2FlWf%2BwU0eISLiSIwIsKmWDEhf4BJjcNU0eM8096SUYT8JUdJDC1blHcSu2D054cRP8Jv7%2Fwpnmq4TDmg06zqdXGQoe3dxpEkW6DUVboSjn2rySkqmfY3BLs%2FwKNO2DzG5FjX9kR8YDs7OnJoQlewTuzuoKtaKuoOTajEOzOlLrSkXPUDr1e9d2E%2ByZMrk78ENkWQiZtFvr7HPUBrUEXVqwLWPbIhFM%2BMfFk94gch9kwaa5%2FaQk3xbDdG3Ot3PyutBsDlLOWpaw2duZ890TCPcELMzjhIIfd1WwgDZzxZXWMLCitc0GOqUBIPHAZKfA5B6VioBIKMShn1nTrfiCn%2FzLtBMj1EciZk7aofblpJF3CwZSZHl15OpwtyfiHVJ05OfFSTgXl3EzgwzxX6PAtp430fI7IQ%2FPib%2BJTRFLKN3ZyrgSDVOARGl65h2pPQGnzhE75qnITtsyg1prHk4yJ1PqyWKn9Ff6Y0nRYOVkQyWYEPhjU2ddfZIJVgwe4nKo13AuzknwRqLsf1Eqlpa7&X-Amz-Signature=a9f685f3813b4e0fde57ca42c46f37c23448f8c5f15042d4a5f4ba022ff98648&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS7GZV5Z%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDcpF5PRAr0Vf%2BRhf92Kh0%2FY%2Fxp9anjMBRQCAb6Tpqf9QIgdCkUHqfTJu5mDgbNFw5B5s3fiB6d8yg25J%2BB1nBZPSYq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDOT5M9gzah00XbqnRSrcA4uwPLLO%2FyFFpyP08KPsQjww2R6K0Y4dwVTJRO%2BAkdG87QEcw28fvETru09waB2%2B0uGZ6LGfnS8Gf%2FomvceXamaCiLOI7rq4rzo1p5EvwI1TukJHHL5TdGJrtZ8RWeZk7yvhDZBsRonbXJy2UA7Fvpuc4dXegnJ6vEn%2FcDIiwUeWDjWY%2FHAM4uH0FODs%2ByEtU7czv0HTvVdt78nt7IirbDyFhnMhJ8DBZuQsS3BMLKB3utyHvp%2BxbTfuAKUZKLXjzGZVDACqLWefvkOXjZeyWxeRXaNLqVYru4hP795JNIDNiww97X4WzE1xG240WT4vEhbna1B2081a5TdkrGCVabpfxCSPhCqMMTGYqiwoJkamdIIoHlielGeEJArbBZFQDlWRKq5FnkR14Eft8br3ckynjod0Y49svcjPwOSvCXLCD2MYMyrZ4HYWlebtw1PV1zoY8kPFAGoXxM%2FO74xNNVUh02t2D%2BHT%2B2SRoV0S0S6NzGxjdujoKsZf3pDp71OjgzCgninARCM6CthGRJSzCbnay62lD1eMzI3IsJU19OFv%2BvGfoEM771anDCWDUjNSoIyyxStx8jpKqxB4Ca5pysWZLCttASwp8D0F81XkCjbRaPPRIl437TtpDMwZMJ2itc0GOqUBjwjQGnjBQ4VQorxAruYSzTWBQ9MNclCmpgKfRi0sUljZ%2BrShuMvudmCHNmm4M6WY1AWv1mGv4QvVTjsL23Pai5yshJ4DuUCctcl3C9ktoSgt5MDgTv9eeV9kVg5ZttJacSaqsU0sQfwi9nmRHAdiXquXSATf%2Fde6I4as7tUpwwViO4sr5Gja%2FDj3OuynFFjsVF%2BjRxIKIu%2FYwwTkjQQDRDabg8Md&X-Amz-Signature=2d09036172534e0963892c8338af5176dc04ccfd40af9e545a6508fe2aeb14c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VU5A2VE%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQC65en3yO8FGvAHRt6Jt1MkttbyfYEhpyXYuFyQ2zca9gIhAMPqmXnGOaHIdI1fXBSiDVELX9mdtJKA4xnZeWaHfpVGKv8DCBQQABoMNjM3NDIzMTgzODA1IgzyXFKPKTr28Myv9MMq3ANNcv%2BIL%2FdKT9WQw3%2F9ZjCDSWbLwidyHdHDypHDHVm30HHPwejAzz7HiA9Xr9sYqF7qfVetEpQcDGpSe%2F1Qr5VBAGo5KZxO9HX%2BsxjWA5EchZr%2BfTfa9GEdAH50hjlHe4ZfpUpSYsQqHdn8MIVbj57HyYA73c7tFHmrSHoeKfcVw4%2BoFutJNfIundKyBUh8nK%2BjjF3fljWomWg5AcQAXLQCiMZKXIv3Aip%2B3EUQ1DPh3TLLQ6ntEOoqMo7KVY0sdw9NEkbUmCEeZzRnk0VZ%2BNAB6fefnCH%2BcD5YbJLHHmUZmn0GVA68twZ%2FRwec9NaZFwUD8EvdC71GPHY2t3qqb6nHem9oamxP0PVQHx0HlIJXVnjHSomxbwMntxSY7UdOtt%2F56eCbNAhlWo7EcvrFPbTEWD43pr%2B9VxYwhbIJ3Yn8nDrOYaEWCMkx85Jc2iiUb%2FQjR%2BMek1Iio%2BVlTOP36uJtOJ9dHdhuvQvM5JikIIbLA2OcjzYgHxd7cz0iK2bRw4uwxfEDyFjdggZoxAfAhPS2h7P4wyqxpkEI9VtmNcjvGaJXekR%2Bwa1L9DmoyRCxAdrVNkZULHxFu6WcVgKhL7XED7fSJfPaPGtTdbgvILKCvpFMPNM%2BiR3UEFklfDCDorXNBjqkAZqP4mjUpkl1nIG4iaGXItjxe8GOowSwY1zXcwxJ7D6d%2Bljik1S5Rcdw3LyxxQevduDffWyZfS7fgpf6MYhWp4Xyh0rHvVF%2B%2BncMgJiLuP%2F%2BPzJRvT1wOq3JCBAzIhrv6YivdD7svaQ7hYAPpRB8hUASk4kqaHLLsM810fXXZISzhSmpsWtauXrYkZby6Z%2Fc%2FtLqySlHkD6gMi6SLy3t7dOYNDcE&X-Amz-Signature=b98f147ecfbc508871350c43ee7ba98dcd193fd51ee9ed345a6ea5cf65009d1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VU5A2VE%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQC65en3yO8FGvAHRt6Jt1MkttbyfYEhpyXYuFyQ2zca9gIhAMPqmXnGOaHIdI1fXBSiDVELX9mdtJKA4xnZeWaHfpVGKv8DCBQQABoMNjM3NDIzMTgzODA1IgzyXFKPKTr28Myv9MMq3ANNcv%2BIL%2FdKT9WQw3%2F9ZjCDSWbLwidyHdHDypHDHVm30HHPwejAzz7HiA9Xr9sYqF7qfVetEpQcDGpSe%2F1Qr5VBAGo5KZxO9HX%2BsxjWA5EchZr%2BfTfa9GEdAH50hjlHe4ZfpUpSYsQqHdn8MIVbj57HyYA73c7tFHmrSHoeKfcVw4%2BoFutJNfIundKyBUh8nK%2BjjF3fljWomWg5AcQAXLQCiMZKXIv3Aip%2B3EUQ1DPh3TLLQ6ntEOoqMo7KVY0sdw9NEkbUmCEeZzRnk0VZ%2BNAB6fefnCH%2BcD5YbJLHHmUZmn0GVA68twZ%2FRwec9NaZFwUD8EvdC71GPHY2t3qqb6nHem9oamxP0PVQHx0HlIJXVnjHSomxbwMntxSY7UdOtt%2F56eCbNAhlWo7EcvrFPbTEWD43pr%2B9VxYwhbIJ3Yn8nDrOYaEWCMkx85Jc2iiUb%2FQjR%2BMek1Iio%2BVlTOP36uJtOJ9dHdhuvQvM5JikIIbLA2OcjzYgHxd7cz0iK2bRw4uwxfEDyFjdggZoxAfAhPS2h7P4wyqxpkEI9VtmNcjvGaJXekR%2Bwa1L9DmoyRCxAdrVNkZULHxFu6WcVgKhL7XED7fSJfPaPGtTdbgvILKCvpFMPNM%2BiR3UEFklfDCDorXNBjqkAZqP4mjUpkl1nIG4iaGXItjxe8GOowSwY1zXcwxJ7D6d%2Bljik1S5Rcdw3LyxxQevduDffWyZfS7fgpf6MYhWp4Xyh0rHvVF%2B%2BncMgJiLuP%2F%2BPzJRvT1wOq3JCBAzIhrv6YivdD7svaQ7hYAPpRB8hUASk4kqaHLLsM810fXXZISzhSmpsWtauXrYkZby6Z%2Fc%2FtLqySlHkD6gMi6SLy3t7dOYNDcE&X-Amz-Signature=b98f147ecfbc508871350c43ee7ba98dcd193fd51ee9ed345a6ea5cf65009d1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAFT6HWS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T133151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCICtgR6kwT0WVpPtn34F2ZCSOdQ3h9qdqYoOlg4kkpoG%2BAiEAmtrk0EW5ZpgfZ3tzoB%2FPxl1317iXp51XyYDqAe%2B9LfMq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDCj29DjaQYAyC%2BC2tCrcA07JjM58FcU9kT0sF8Kymr4QhHMDsM1B%2BDMDgtSD1Hc2XmbjuGFBMq29fGb3KRhCqqEKvmRHsRHQAii%2FIYkuaCov91uJ%2FEVhpcwSUVzsi2P%2FwfGymjO4xIESmYMcWXGzHQ6%2BG%2B2ysOzoWNp4igPZQXex8e5C89zWc%2FM%2FTKnaqFa2zH0SCJ02TMT%2Ff9cIEQEnBp9i5iNfg452cL3mkbwwz6Q%2BftkUwgPZ2J%2FgF8%2FbwRH00NvCR7ULFfklB9HOgQ2K9VEUhEuUyoptlgDVt9GzSEpvhayy%2F1Cy5e3T3zyFhNjNamjJtN%2Bf1j7vDkjXj7RjJuWKmX4Nunr%2FfAak3DPuz38rErtfgYVHluf4Avf44K1QDguOtaoB9viRUIDSmCmO7dIQ0427io9aZ%2FjJCci3pB7jyajUXAY71M3fuOUCEeV0%2FxfpZhXA9P0ZFs0sEEVOttv8vNFlsgtETL4efTP4OBmyfANwNU8fRmQgdb%2B5zLS1BQ407UcodPpMehvy2eXdbzjBLtXPbzyvZHzFaDY4ZOl4DG0YYSRfrw7uvqST0JuqjYKamk9YycuhPoWLRkl8%2BZXRv9uV1a0UtOpRcUloG%2FwseGCl0pILA%2BDdwok75TR8Iq55prlpJy8eFKWjMPahtc0GOqUBzVDBmrkiabIQ2aYRe384eAowerHIZrO3HycgL1Q9hX1EbMdbEaftzQpJOWQyJX%2FePdwSOd7DysjJKPh8bhCTQfuauLyHrEpz1zfVZse6dEn16KmaWSUf4Tznx56Ap%2Fh72YlB6jmsgyhzaXheVyqCCQXkTOa%2Bg8Dl4Yg%2FRKS2MJqTyQrD4OsMpNUXyiVVxRFL9JRmRDw3SVLb7uq%2Bn5VAuWT4wM%2By&X-Amz-Signature=29964e181c484ab1e62d10a7a74381bd554310ab045a21e24e8c17d643911114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

