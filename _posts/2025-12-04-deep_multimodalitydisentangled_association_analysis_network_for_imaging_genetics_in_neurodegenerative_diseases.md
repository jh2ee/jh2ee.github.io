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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665XQOJZO%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIAdpRz3K%2FXx23J9n%2FNgP5mPgMWGklgg%2BqJKK%2B5j4Q4J%2FAiBokeElDUXYqynEFukKCe0XqA%2FQNfkgcHOeFH%2FQD11TpCqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMj6el29%2FDhOwcOL8mKtwDDmd%2F5fGZWIsAbI8Ft1CfhBTwrFkg%2F5RmLwiIF%2FUU%2FndqUxu7ktTcliNwL%2Bu%2FJ19AGhj7qgCN0UaOORM9zABaxAxsXb31hh2n0200tCpQkg0SgZh2HaCc%2BG6CC8MxBEngPGNaE%2BDHEuvZNpmlcd5vA29hSLH%2FOW83GfFJzuKKZK2HLDJKVOK8flW0uAqjyMuBbfpvokEn9cAVSL5gzTr57BxOhsiBOAgPcIZlCqMkKoY1h8T0wsbzCH74n8AWIX8%2FE%2Bd8JUFB8JIAerP001d6qYuunbw5hEolU7z2cNlhwhw%2FlhVgT97FfTDirG8JeteXO3EUSmIjjg6HgyrEqPl7uHWVrwWRUrRAQRS4BUZX5ExYJnIjzK5cDtxwFGK3LyeZy1%2BoSFcTjrIC%2BaBIJivMxC5m6okL0J2r8bRkAH6i%2Fmdvwe17ZV%2BZEmJnQBnQvcykY3AVnHEWtqggbCLBfBB7RqDANH%2FLCKxz2PfTF2lpd7BDuTbwJALg9Iw2EkkphqaltN8JFTWAl0zMbnJ1EskEVT57RroV%2FIHzBWU2ShOqruqZwkJ0V2pqrSCk9D309xeldZNsP9Y7WzXjYJX3b%2FRsgOeUEnvMjRd8THnuJQ3HDezJqsbqJ%2FPlZBTT5eIw9amczgY6pgGiRTNAWBnO4U9EJLBlaiFLCBB9vzzrJU%2BuD0ECF1itOl%2FX28yO5FXFeZIzmblD9FVQglM6BSCFdczTfZG8Mb66u3fiypB2c4ngIDHpwewCVsyRjhWlFiVAkM6sqKeMmHS1%2B2xWcuB%2FHXNbcJcRK2e7l2sODnlyvPm7Z65aDhOWKeVpTJKLfEQyEODT9fzqqL9p92F6eeL1eFYAfDtSxPTYWjEqrWwT&X-Amz-Signature=7fe19ae188ed9b3b3157d7b132c56eca9ceb65617938aab0f474af424eaac79b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665XQOJZO%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIAdpRz3K%2FXx23J9n%2FNgP5mPgMWGklgg%2BqJKK%2B5j4Q4J%2FAiBokeElDUXYqynEFukKCe0XqA%2FQNfkgcHOeFH%2FQD11TpCqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMj6el29%2FDhOwcOL8mKtwDDmd%2F5fGZWIsAbI8Ft1CfhBTwrFkg%2F5RmLwiIF%2FUU%2FndqUxu7ktTcliNwL%2Bu%2FJ19AGhj7qgCN0UaOORM9zABaxAxsXb31hh2n0200tCpQkg0SgZh2HaCc%2BG6CC8MxBEngPGNaE%2BDHEuvZNpmlcd5vA29hSLH%2FOW83GfFJzuKKZK2HLDJKVOK8flW0uAqjyMuBbfpvokEn9cAVSL5gzTr57BxOhsiBOAgPcIZlCqMkKoY1h8T0wsbzCH74n8AWIX8%2FE%2Bd8JUFB8JIAerP001d6qYuunbw5hEolU7z2cNlhwhw%2FlhVgT97FfTDirG8JeteXO3EUSmIjjg6HgyrEqPl7uHWVrwWRUrRAQRS4BUZX5ExYJnIjzK5cDtxwFGK3LyeZy1%2BoSFcTjrIC%2BaBIJivMxC5m6okL0J2r8bRkAH6i%2Fmdvwe17ZV%2BZEmJnQBnQvcykY3AVnHEWtqggbCLBfBB7RqDANH%2FLCKxz2PfTF2lpd7BDuTbwJALg9Iw2EkkphqaltN8JFTWAl0zMbnJ1EskEVT57RroV%2FIHzBWU2ShOqruqZwkJ0V2pqrSCk9D309xeldZNsP9Y7WzXjYJX3b%2FRsgOeUEnvMjRd8THnuJQ3HDezJqsbqJ%2FPlZBTT5eIw9amczgY6pgGiRTNAWBnO4U9EJLBlaiFLCBB9vzzrJU%2BuD0ECF1itOl%2FX28yO5FXFeZIzmblD9FVQglM6BSCFdczTfZG8Mb66u3fiypB2c4ngIDHpwewCVsyRjhWlFiVAkM6sqKeMmHS1%2B2xWcuB%2FHXNbcJcRK2e7l2sODnlyvPm7Z65aDhOWKeVpTJKLfEQyEODT9fzqqL9p92F6eeL1eFYAfDtSxPTYWjEqrWwT&X-Amz-Signature=7fe19ae188ed9b3b3157d7b132c56eca9ceb65617938aab0f474af424eaac79b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FF4XD4O%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDwV9IWHHnsMi6gvuREHmJ%2FTodOMiVkVH0xjLHkLSG%2FAAIgU%2F28Ad24dC102nbh0Q0k3vcvll3k9tfNm7cCazfomvcqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCv2rvgNPjUseZFmjyrcA0CbNx%2BQ6%2F9%2FpnAtPkee32qZg23yO%2F3lTnnMHvOr5VAnzEHqqn3Oqq2u%2B42jx%2F7z%2BR8CYBvFS5QbO4RLkp1DWKOVQOAn%2Fid9O0SA%2FXUMNqVzAob%2FBnDDuC7xJTJozTFT%2FbhZnrG8UnFcCAlQu97C07zZR1B3%2FCip7hhBn5GlXJTEt99ukjnXGhBAumPzGFEWbFpD8GFSbrFHKbMMbeWV0ZbD14ENl%2Bi4YIeAnWme%2B0xeuWnZup5mNIudmWz%2FHBdT4oQIYYisfejf3xR54xRyborT%2Bl%2BgOmRU1m5ZDU5uDSZuHdeCT%2FdTsiM0FhOhM8A8tdhGWiPiQxfuCgXqw82K0tBDx4DHaYxdIz%2B0o0FSiRJd0IySQAvuGt8URrVNavW0yvS%2FqRKvCbXPl1u2QGO%2B8rvvEP2D55jcsnTHIFts3umQ1NVjr%2BhU%2F048pTI8X26aDoZ7aMq96FmivFo5xKdyq5XjnVCSazZhJjHI6XfPCsmfOkPQmix%2BNVEJdLc8fnJ1ZTnImKp34K3AzIFfGYIwhQNX2qgd8xg9UVQ%2FOTxr2cfdB4YncgLtRMaaYVftjyBG6a8rmIr48j4CRwcnQj0Z%2BvJ4hA0mUednnJ%2BN4DajRQWLtwPCc1oeU3%2FdEjazMPeonM4GOqUBTLR7CamrM3HIy9grRY1qeyPgcgp8LUbPjVBZqgqf2b6IYJgSTn%2F6Ki41VoxMSK3FgentIYhS5QFj7tPFkPvBSDxIBIDMwrfUKUZLoQ%2BSC%2F3vV1Ij%2BQH4GQgHhcU%2F9shl5mHu2gQDgqPA%2FCFVK0F1eLecUprkpSc5ekxLH31ttRcbG7aMucdUVjx5xstDuEV4KNk07vM2Po4VsE0cPzACpLG2nS%2BJ&X-Amz-Signature=a931ff3779876229768b77e912d13aff04f180a205241929dc0e49122869826e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS3XHUVN%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQDWwxOyVOHMJrDOMdFxvvt7PG5yqQKAICT5Ifbpg0hDbgIhAPGc853xX%2FHU2m%2FhVXzTdhweGDtFKGCwi576ZMFeWrg2KogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx2vSnBgU8TAsXPfT4q3APFXgriHK%2BgsbpeQvcWaB0LRJDTULblGn1wgwooSk5osfm3kbByPATVVkOSDHmMl%2BSHj6ZrhbkGTAqoXsYK22HbYcDjmMudnsuIksAS%2FRa1zrsGiXtLCkF%2B7dKe4RxeaiWguUilAQYb4CvduLnmszqDZIvNOplg%2Fz%2FcBv0Ysv5ygAvO%2BVpPLeVpp%2BhLGv0jXm0PRJwGDj3DLknvHjG6P3tgFp6UhyIyur86z7aFX%2FEownn%2BEVugCJzky6OnPY0JSWHqVYPhuqx4mfyP6Jee0dRg2vBE0DDiqZN5sqVJ%2FkPkEEZdS1uKUgvyIA32RSYPYxYSMS2M2vmvBpLwAd%2FxIjcsySUgTrC273jlqAXzB4g%2BNCaV%2F5VJ6UPqgl7wtsGh2G3hCJkmjGPzQCyoLRfJ44v7AtmW54LeyrsFO6lBXMgwdt1oUGk6kABq7%2ByDlMFgagpxmmEsDcog5PJUjaDsejT5HvwTk7rKcE7UwKuh7VgWXVted6Lb3aoPCeVgzlC74AeUNgEALX2Z1RtRL%2F11JPVRISPTwOJKQbsebEvUNkrEqCn3uX%2BBbf8LM%2BqlnhwFILfNpMjg1KJTwl5GvaUdFhzZP21mxZcxMf8H2o78OftKJiZwyBhCCP%2BEWCmFETCcqZzOBjqkAe6cD7z4UJDA5Ote2Jq65xO1NatIMZjSTwi4Vcae48Egum%2BNAo4sgrBSd3ygx%2F9NiIN7ndIDDq3yBbFZRN0TpYmMr%2B790%2BdTAN8dll%2FaPNcv9jbmLn2%2FEDBu8k4zqZDNaGPZrBQIhf4GHvhPa%2By%2FlJw5pHRGqSP%2FiSIPVh1zjLYQyMXAddib79OqwTMN8%2F14S7lsTtr160MaiXcVI%2BJo43Po8oq7&X-Amz-Signature=e567e6d89e69efc9896430ef3d7c6da2c7daac97c65bee53e8ba27e2bb88fec2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS3XHUVN%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQDWwxOyVOHMJrDOMdFxvvt7PG5yqQKAICT5Ifbpg0hDbgIhAPGc853xX%2FHU2m%2FhVXzTdhweGDtFKGCwi576ZMFeWrg2KogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx2vSnBgU8TAsXPfT4q3APFXgriHK%2BgsbpeQvcWaB0LRJDTULblGn1wgwooSk5osfm3kbByPATVVkOSDHmMl%2BSHj6ZrhbkGTAqoXsYK22HbYcDjmMudnsuIksAS%2FRa1zrsGiXtLCkF%2B7dKe4RxeaiWguUilAQYb4CvduLnmszqDZIvNOplg%2Fz%2FcBv0Ysv5ygAvO%2BVpPLeVpp%2BhLGv0jXm0PRJwGDj3DLknvHjG6P3tgFp6UhyIyur86z7aFX%2FEownn%2BEVugCJzky6OnPY0JSWHqVYPhuqx4mfyP6Jee0dRg2vBE0DDiqZN5sqVJ%2FkPkEEZdS1uKUgvyIA32RSYPYxYSMS2M2vmvBpLwAd%2FxIjcsySUgTrC273jlqAXzB4g%2BNCaV%2F5VJ6UPqgl7wtsGh2G3hCJkmjGPzQCyoLRfJ44v7AtmW54LeyrsFO6lBXMgwdt1oUGk6kABq7%2ByDlMFgagpxmmEsDcog5PJUjaDsejT5HvwTk7rKcE7UwKuh7VgWXVted6Lb3aoPCeVgzlC74AeUNgEALX2Z1RtRL%2F11JPVRISPTwOJKQbsebEvUNkrEqCn3uX%2BBbf8LM%2BqlnhwFILfNpMjg1KJTwl5GvaUdFhzZP21mxZcxMf8H2o78OftKJiZwyBhCCP%2BEWCmFETCcqZzOBjqkAe6cD7z4UJDA5Ote2Jq65xO1NatIMZjSTwi4Vcae48Egum%2BNAo4sgrBSd3ygx%2F9NiIN7ndIDDq3yBbFZRN0TpYmMr%2B790%2BdTAN8dll%2FaPNcv9jbmLn2%2FEDBu8k4zqZDNaGPZrBQIhf4GHvhPa%2By%2FlJw5pHRGqSP%2FiSIPVh1zjLYQyMXAddib79OqwTMN8%2F14S7lsTtr160MaiXcVI%2BJo43Po8oq7&X-Amz-Signature=6eb168c41768f3a3f361fe03ea5b3d1d47f114bf245688a1462bbbf8d6ee6b14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BA5XW6Z%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQCHRvE7XfOely%2B%2FW%2ByT1%2FqARJlriPVFNVsb01kROWjWxAIgEuRPIgW7q9ssv8VTZnAQaodf%2BpymvqiknhRFlQHdJvYqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDADcrS8pH0Ynrt%2BZyrcA3aiHo2Uiff8wmMlIyPV6jlctb42i5bb7EUI8vQx0MgSnqdIfOwSE7MqQNH1yRKJLsOfdwN564BarKRi%2FC3q4zJWKFHKzKRJAujrXGShTLWchicCPwOJf4QMPE1HK%2FzdExB26%2BH60xzEi2erQ854jeWwmcrDsLHHMlUej07mBZt1StO8XSZ3BfHLcZPJJdl7b3RoQNydc3HscbCu9EpcCbgwUR3Am1MNhHDKmUi5bxeg7q32Xpfx0Xu5%2FXM9CS3hhdobeCo%2FGTJHseA5HRB6KPP6gjKLs7dEOymF6YKyAbgav7l2xIaAiWSGhKwSn1L7Lx27Y0PA571HyqnumOF0xRCTU4DAlMTLb3MRcpqGm%2FwTO%2BCgpDZNV3lFu57%2B6mgP4EXZcKsp0K0yDY7sjY2PNts3%2Fe30wSXoZVWmjdEthH7tzhoQ2MMUsoGHKcE%2FNebt0f5yIpNIQbFKV6Ywb2Ijxurgx1zi7FruXgnAvSqJYpjPh7uZ1L2bjcaSOQl8UnSjG1UBniqfk9CBT1vKD77%2B5jmkmNDkzeWFyWbA4LFtrcf%2B4S9ObgbzXsAxq9kKMx5y%2BycXhPyVBKlUXV1NCCOATvVQpXZgBcF7x0%2Bpn%2F24R0UO9D6yKXli1dyYuUDHMKCpnM4GOqUBM9VjcPSy3TfoTSXkjuLdKSStUmAZ8v%2BzyDpo9Jv%2Fj0y2Kvu%2Fu3lbXONgmSy2ZLaFNXIVW47Nt%2FF%2BmeFMC29Xu082cG34Eqea7oA1CzfmhxTDGu0qr3KxCvECWI3aG3HBpwE3ph46MHYVvYvIrdHISB5evimetHsDQtBtdKUhkUzbKoTBn07cHXupxlhFCpUqrHt%2BJPthD%2BTIBziwaSeQ3brOFY%2FG&X-Amz-Signature=ae27beec15106f8510d299a5dde47b1a5198b18c9e4561fc29ecc98f9f0c71f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MKOIQ3R%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDRM0WmUej0S7ddyHmiZJGJ92kjK4Ddnzl1vsgTm0f3%2FQIgE8qUDKfq0lMcXaqkxt%2Br6cOSG83g8OZDqXBnKTZWjfwqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIzNVlcDCeOAampogyrcA3KQnSwBd2Sb%2F9mDDzvggbMpizpiuP1SCh8l5QTEyKBAqnqWkPBG1sEEul%2FCmdKyx7rhrpgTeGcTiE5jqSfK8Npu0wr%2BAtb9Sws6EIf5YPjI1HC6XNzvlJhR7CECT52gS7G1ekkMlDIeTVD7MMNZIsNHWh0GyIau4TIqlDCXHHHdfMDrxvzV1fkVVWRrLaiRpqY%2BbKjZFH9iImEK5IW4oX7Sp8ZsOKacbRnpRWrOXTGoNyZMPE8JdbkbNB6pPhbK288DHdPkr1DKByqfdaKEJVWijB9bJ2gHckkYtTiy70SkIWMjPX8oooEY%2F5KguH21Y6tX7D328hdp%2F5DwgHs%2B6qm22VGGfnQNBqdZhHnoUoLRPG7232cxxSj9Wan%2Fd8%2FrzBKtT6pBlZ8ib2Qmg6bd9QhdYkNmeyhkfg08aQchfgdazfuhY%2FiUpnDDf9tAqHtGhWW3iAM6ipkn0PSkjgR%2FQhFf%2BhtBqCK2Ui50IxuIajkqvzN6FjxbCqIvQG6b%2FM6Kb4gX5XJVyT7LMFEbuszTwkhK542EkoIQgZXnX0t2ItOqCb5o5d5Z7avP1TdE3OZrV%2FCKlPLt8%2Fo%2B1R93dqlpDVXgp%2BO4893jylI1XH3OT%2B8nXG8On%2F01XmCc3AvRMK6onM4GOqUBs4qLYHn15FA7%2FqY9nrqXXP%2Bh1E7K8cLDVbdhHiXaoeuqsYjBypjBfvta6GRSgF45ItnnGVcWRkqsaIWUjPQpSBcV0eR9swqKpa%2B%2B1LjrtQAKfdrkp%2F3HeCanoK5KhbxnzInDCxPGI%2FURE8PS8uhta1zqAoA2sp%2BCQuBbXneg0Du9hnB7HstanXqwQSWJ3gnH0MOUyd9EpfZ%2BWxH5Ph6TwNCnKmxt&X-Amz-Signature=8c5baa5dd0ada60bba96ceea78730bd5db7dd63a246dbe6ba998b7ff9d2e8038&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ6E6GWU%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDgggiR2pVSDIQF5xy7yX2iu1E616ye%2FNZwTcOFmFviKgIgTtdSySegeEI2PUZteeFh%2BJdWrOMncnvqQXu3DeK5FaQqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM63v%2BhzmGSIopSTnircA36uNjg8Y8Sbf%2Bs8N%2Fvom0yZO3bUmRJ55oV5QVZKR0Mzl%2Bx6jK0D37RwFO%2FBmj6WgLympmAjuw6hn0Z0wXxOfYplZDzhkXHl0SY5f5NfuRwDZZ01aHNHvxa4Q5MqLbAPMiWzGEyJq0neW6FNEeYxcXQmewGScMiMFG35hjuybdcjlxO2TVH6S9xF6VztUcd7QntQ83EoR%2BgaPl0NFA%2Bn2nSwqL%2B5%2FNllqoyhcjMsD%2FRi%2FL0TprN3TK5RzRpsDohQ8Q%2FnR5atuby7K%2BTXkNBzFc9d2XFJVXjwGW%2FCcI5RcVvSUo4CaQuc%2F3mQtJEgNm0ni51SHr6%2F4mp%2Bm31ffzNYXOT1lq6x62QzMb2uuVILebXahWtyT25z10BKyW0YqOZGHeCCmd45IHTcB5HulNme%2BFZudrK7THpdVikY4Am7Hr%2Blw7wCnJ9M1q09DoM8u%2BRxpB7gSGNNGOFDn0rHR9qlgpuwU9mEnPbnaViIsGm0acDSYhevxEPBpnFvYCvzH2Bn%2B09y%2Bh%2FctGFw%2FOwDFWEs%2FDLbx8FAe5qNnV5lvFrg05RJPXNYeQ9F03qpP5MtuUPBxeUMNxoYnBEdqU7yqJaoddV4wQF%2BHz4EXkMVQvx9ZMu6Y%2F6TH%2BqwwxnKnHlyMIOpnM4GOqUBLYwLLv%2Fv%2Bd6fImP%2BBoeBk4uQU%2FR2m%2FkBKTjY9QPXXfz5tcOyZ0sBqqnRf%2FVbhOKSaD19sLQP8kvWZGFqzAMOJcP1EJ1RxjExQzQkP0tM1D8zY5FbVOJIuo3NRMEdWhGJxdogf9s8%2FdneaL7CYsEhh5rmnMDFU8SeJuFCeIG%2BY%2BFA3Ws5EWQeF8iraO%2BrdXdkcwHhlINSTY0NHZQ3hqQ2FI4vOu5Y&X-Amz-Signature=cdf02a0eda2c5f2a15b483fc9dae5c4fde0aed9e2426b5744e239318af2dd44c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZC26WHNM%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFGJpzti8rTuz4R0mIekwk%2B1%2FYVYgS8wRU5%2BPUyQYafRAiEA3V9J7fuP7zj4ZsJWnOfaqKycpzzcJH5r8DIPRxS3D%2BIqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBF8EWr09uTlLYi%2B2yrcAz1OQQneL452%2FlYbNpIUPiqR3PSUi%2FdJtPqhRoTruWMN0RmS2jrNtv9C3xDMF%2BVeSTnZv7iDhknLTu8b10f7U2IU9W9jxyQprg4iW86jg2vDZl97QbtezN9bhD%2FI%2FQAS1tmXL8mCL8dCIyTLHVa2g9%2F0gs4yA6DCUGNVlIPipniCsgNGKKbb2wO26H34aNpHwSSeSI7u3XhCLTivDEAiGDTnEQ4Av0gnK7OHNlMhTejEFifbWJGg%2FLeQMfL8K2hxQ8yPcJk0lWi0lYRumVkyQu%2B46LsMVyzaM4r0lHfvvFGL%2FD3vJJonCVckOtKLH4P1vU3vHMPVODu%2FdwlxiE779BFQGM4GIt9k5tBKvdOZGjltUKfBSZjixwrnxfwbtomVR3%2FPjVmaieWXGSkWqg7iOHdpPYaJLEHhLp6EKvbL9skARMBi%2BqybqktRp1quFyf0ACJlk%2FPx3RLWcj2HV7pxZTCLo35AR%2FMEJFycLS5UdJzXuIzzYecldVDf01zhOwIhPJXL9yvVpj6x6rxzP%2Bn5bHrKO4dTqZrxbsXy6gPjYHunMXGj9gLe7wLmyhjo7D58n0e%2FW97eddCOoEequjF0GZIIQaLtses3gUSak5Rq7DrIc%2BVMnsHktbBVBRNXMMGpnM4GOqUB3DDS1wWjaIH2%2BjcJipPClevFh7INSNKGztnSsRCuYA%2F1Rv0OU0YrDh%2BSssC6MTxKtO2ZWcWXYCtCGZrVjWm8t1%2FKK46OMwa2b%2F5Q2xjp24DnNYcvs7PVdu%2BLik3wrMCjOzQwxjlqCp%2FfZl5V3QVvYRPVWZOI8gxiqd%2BdNVVMZGJnvo6aY3tXIgZKNDqvNEqHzanJglhpTKhCql7YWwj3PS1fvO7T&X-Amz-Signature=912efcd44cc3a7c999e8d8e9e308a48ff15ace1ccb078306348bf2925b5df942&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZC26WHNM%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFGJpzti8rTuz4R0mIekwk%2B1%2FYVYgS8wRU5%2BPUyQYafRAiEA3V9J7fuP7zj4ZsJWnOfaqKycpzzcJH5r8DIPRxS3D%2BIqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBF8EWr09uTlLYi%2B2yrcAz1OQQneL452%2FlYbNpIUPiqR3PSUi%2FdJtPqhRoTruWMN0RmS2jrNtv9C3xDMF%2BVeSTnZv7iDhknLTu8b10f7U2IU9W9jxyQprg4iW86jg2vDZl97QbtezN9bhD%2FI%2FQAS1tmXL8mCL8dCIyTLHVa2g9%2F0gs4yA6DCUGNVlIPipniCsgNGKKbb2wO26H34aNpHwSSeSI7u3XhCLTivDEAiGDTnEQ4Av0gnK7OHNlMhTejEFifbWJGg%2FLeQMfL8K2hxQ8yPcJk0lWi0lYRumVkyQu%2B46LsMVyzaM4r0lHfvvFGL%2FD3vJJonCVckOtKLH4P1vU3vHMPVODu%2FdwlxiE779BFQGM4GIt9k5tBKvdOZGjltUKfBSZjixwrnxfwbtomVR3%2FPjVmaieWXGSkWqg7iOHdpPYaJLEHhLp6EKvbL9skARMBi%2BqybqktRp1quFyf0ACJlk%2FPx3RLWcj2HV7pxZTCLo35AR%2FMEJFycLS5UdJzXuIzzYecldVDf01zhOwIhPJXL9yvVpj6x6rxzP%2Bn5bHrKO4dTqZrxbsXy6gPjYHunMXGj9gLe7wLmyhjo7D58n0e%2FW97eddCOoEequjF0GZIIQaLtses3gUSak5Rq7DrIc%2BVMnsHktbBVBRNXMMGpnM4GOqUB3DDS1wWjaIH2%2BjcJipPClevFh7INSNKGztnSsRCuYA%2F1Rv0OU0YrDh%2BSssC6MTxKtO2ZWcWXYCtCGZrVjWm8t1%2FKK46OMwa2b%2F5Q2xjp24DnNYcvs7PVdu%2BLik3wrMCjOzQwxjlqCp%2FfZl5V3QVvYRPVWZOI8gxiqd%2BdNVVMZGJnvo6aY3tXIgZKNDqvNEqHzanJglhpTKhCql7YWwj3PS1fvO7T&X-Amz-Signature=4333a4a28ec5fd6d93a1cefd6e746b171c05f73bf8c8b5b95f6f3c93f869418c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QXRRBEAW%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIGJJZxr9FnR%2BoYi8zJuKHOJ9z23iTcMF5uSTtAcgIdgBAiEA82XJsf5JtHZbiMvvtivpP1L3wf1jKLtXKt6cnDyhHPIqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB8atU9YWR%2BljR7wBircAzk%2F457AuQqk1rm5ZiFcXxmvny7Tz6kxPJZIxbIP%2Fjp0HDkP1h5UlnS3JDD1CXuqDBDmPRQXB4dZtms4XUkOfGlmKzuLgW9X1W2imbco4PLG1p2jvY0yT9OH5solZEWtfeu7b6s9cd6%2Foaz1ei1t62lUQU%2BO2h9JkRC5I7zjOW8MsQeIksFpMMBOQ5Jo1mIDcB0GqGBMFzBCFOgqxSc6SoegtSD3i0QtCT%2F5jmX%2BUY9WhOILqSmDJRdzfrazktF0dHWReQZmY%2BOQW35LE%2Bg76rtF0oyn6aPBXSvGCIKzRxIYiH%2BLBmloyuucHgR8g3YV7ApdZF9ak09EtBLX6UAhQtgIi%2BUJrO%2Bkn3s1drDDXP0bgk4RpytZXe4HSiVF3qbBlDhH4cZg7pVowFpMP1asZLkg7mRh3TRIaQI9LdU8YuPzkXDlBeBQmg%2Fy%2F60OAS1FHACQEVmJseXg2xoTLNbzOe3DhLnii0a2hXheNyVDQKLN4sCDUsiHpdM8BcfTl6DQMy4B7yEhMqAHXn%2BOy2zrAPo8mCBwJEPX6El03tDOOwnS9co7yuGbXh9%2BRfu6CeqZBkpcoI3Bth4JY2mnCs4xweztGkK9T3raoQF1CKKXqBOGNKALzp6QItqq70kVMO6onM4GOqUBZTefCQ1lRiIxDkprv8vbcf%2FH7x88ExOxgn67YsxLKeTF5fiXpeI784Ef%2BdDtpR3Wgri6cJRvtaHME9M4nqRVVDgpK6onaEy%2FIs%2FRZ7hFekYtkRZm38UY1f5y2x3tpeBrDfOil9P0F%2FJXtsiBHLLSb8cYHXROBA4hG6E1OCKT0%2B8BoPx0x%2FSkY1Ll6YwHFkTVh1itC8mCl758aRl%2BnhNIKRgU%2BFwd&X-Amz-Signature=325b760fea0b3a05f7e0b83a883c0e13da975288158a238b653b1f924cceb186&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RB67DL7V%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQD4VT2breAsC3Y9L7OUA3Fsbzcl5z9%2FjG%2BC%2Bm9nviCRbAIhAISm7Fb%2FqREsIqfk3AEWVwj%2BQpdpyFFiHeAlu6X2rjC3KogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwwtlnyfLkRoFGGdPkq3ANnqZZ%2BD%2BhigDUNDLwuM4RNo%2F3YaXoSjzOvLwPVQfkZzzt10B5qHReABNdMQea05kFL1PBFDzZ4FPeAyvSbDTblAjsuvqmGN9CDlvdLZZHtrxCdFGFKk7qA6Z6sHDRWSDgUj1exM4gAAKSGFDAgzCIlWSkZ93MWKmmpqIGmDfQfy1HuDFMH65orHwcoxei%2FKqzsK4tIOt9YNTEHQQA1dNTZIQQzHRk98DreJsorun6bh%2FP9atlD3T7BgcBWvixjNwIWrP8jhR7HgPJ7Aayq8t%2B3irpUf1Bp0AJqAtL3JDpg4E6UldrGgXGiR4c0NBGPVnf7bbcn%2B5qSGORT16OxT%2FdWlsyndyRRgzHM0FtmlH66z93%2FN41WWYGt%2FIy82HNK5pcH9K2XIa5bFOiJwU0l8DKaJm7PdEh2sJkSZLQl62ALTgyWR3WFV3j3NRllEU6dxCCd5QCh6HYDEe4FzGZMuo133%2FOWexmvCp5L293dLFuh9fA2ZMmGsTorTyWYoBM%2FnE54diqGpvGtG8QjtrRKmUaZDSgqoJZwAUoufyHbD6axpRtjHuo0pQKGYnVSSZNvGcHJl34opj2tba1uT1MCrIhe5yLXkT87B%2B8EG1ASyh92rWMTWA%2FJ8PxxGDE9HDCwqJzOBjqkAQt%2B8wzFCETdO%2F4icdK7yScMqM%2BuAB5KKB9Gsy0tWWIx5B7t5Y24F0nMyV5vu77vwU298Z4Xg93zBG%2BQiq865NLNmbq6UKPCaApmVZFBMe87BARvlCMhvnEWG%2B7dceNGAoKynojuymUOY2OurGSe7gC8aN2mJZxvfYoTgJHWz0F9IPOS91Wg6wruMjeOMZzQBa9lN8aRY82XihIKd7HRfzBOzlOU&X-Amz-Signature=f21007670a9160bbbea2b53671d8ba0c3b0808d8509c7e067cf19953c1325690&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RB67DL7V%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQD4VT2breAsC3Y9L7OUA3Fsbzcl5z9%2FjG%2BC%2Bm9nviCRbAIhAISm7Fb%2FqREsIqfk3AEWVwj%2BQpdpyFFiHeAlu6X2rjC3KogECOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwwtlnyfLkRoFGGdPkq3ANnqZZ%2BD%2BhigDUNDLwuM4RNo%2F3YaXoSjzOvLwPVQfkZzzt10B5qHReABNdMQea05kFL1PBFDzZ4FPeAyvSbDTblAjsuvqmGN9CDlvdLZZHtrxCdFGFKk7qA6Z6sHDRWSDgUj1exM4gAAKSGFDAgzCIlWSkZ93MWKmmpqIGmDfQfy1HuDFMH65orHwcoxei%2FKqzsK4tIOt9YNTEHQQA1dNTZIQQzHRk98DreJsorun6bh%2FP9atlD3T7BgcBWvixjNwIWrP8jhR7HgPJ7Aayq8t%2B3irpUf1Bp0AJqAtL3JDpg4E6UldrGgXGiR4c0NBGPVnf7bbcn%2B5qSGORT16OxT%2FdWlsyndyRRgzHM0FtmlH66z93%2FN41WWYGt%2FIy82HNK5pcH9K2XIa5bFOiJwU0l8DKaJm7PdEh2sJkSZLQl62ALTgyWR3WFV3j3NRllEU6dxCCd5QCh6HYDEe4FzGZMuo133%2FOWexmvCp5L293dLFuh9fA2ZMmGsTorTyWYoBM%2FnE54diqGpvGtG8QjtrRKmUaZDSgqoJZwAUoufyHbD6axpRtjHuo0pQKGYnVSSZNvGcHJl34opj2tba1uT1MCrIhe5yLXkT87B%2B8EG1ASyh92rWMTWA%2FJ8PxxGDE9HDCwqJzOBjqkAQt%2B8wzFCETdO%2F4icdK7yScMqM%2BuAB5KKB9Gsy0tWWIx5B7t5Y24F0nMyV5vu77vwU298Z4Xg93zBG%2BQiq865NLNmbq6UKPCaApmVZFBMe87BARvlCMhvnEWG%2B7dceNGAoKynojuymUOY2OurGSe7gC8aN2mJZxvfYoTgJHWz0F9IPOS91Wg6wruMjeOMZzQBa9lN8aRY82XihIKd7HRfzBOzlOU&X-Amz-Signature=f21007670a9160bbbea2b53671d8ba0c3b0808d8509c7e067cf19953c1325690&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643I5EQ6A%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T005811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJGMEQCIDGLNJ4KB381SfsMTXuvjB8j%2B6M4beVmcI1nBvZBYTFdAiBGWG2QZid84OlWkvBDO8o6qeerH8T3Mqc0WC1ao4SU5yqIBAjp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBK%2BpTWmpXsX0u4S0KtwD5nQl%2FfYXUHdjHFVb7hq%2ByGdnES2GVTFkQpvfq4bP5pTGmPoo4YTEAPVox16v%2Bp18G8ZvTiO%2FDkGhtP%2FFWETeIXVfvPweQRspB%2B8iBXxkrHN2lTmlwRdRVt7vvddenA3UMmhu6%2B4KZYgjSEX%2BTHFoPU%2FurerQAHqF%2BA7CkfhlBKzlCUBWTeb3%2FEi46qsk2H7ljoh%2F%2Fx7Fm34u9EPEurKqkbb5%2BQ05sULhVkOlFdMHFkLVZ%2FaudRPxe1SVNq4%2Bep%2BP7L4Ib1ewmlJOy5awkivUFjhgQy1HCoiCeBh2y7pjxuwPAOnn7%2F7NmI0fAuxfi0owFa%2BrgmbpftQtmOcSgkImTPwnWtTJFEdahz%2BbXCCEaicJv8dryEBoC8jVih1PHks23LyrrpbiNWo4xWY16YsKzhVFrP79qXhMOs4y3QfM%2BkjDHOQh4jLO%2BIrZW5bMP2Ob7CkLWlZ3QP9aYVVzx2TAIn43vhB0c6ZhRZBTp9Lq6V3crypM2%2FwhCeW4kjJtQnY7pDHkYB5VndQA8aIkDnzaJZ90jEIwkqaHmVYihruL0yKmA%2BaaW4XWPrr9P7ajEF64KsitQ2xjR6xuBUgdJZp3VYSQ5Smhl5hREYcpLcmzjN3aMSl2MSdgAh5BjPowvqmczgY6pgH73z54OzJkBl1RXJgw3MUcwowNC2ypm53LXxaWPbidpOWU9HWgaAp6Zbe5C5L7YtZ3LobfnS2Ed%2B452yrTm9F2O%2BW5fvR7RuWPiO3RurvNE1CVtOWf4QBZbk3Kp8xC75a4KURoywNXLz0qprwecm4BwmxrhzSv02toL%2FruuzzLpTWff7aY4erKDRTxR84e9rp%2BlWt7pXBpMVKGeZlTuFl6jrzIbnrM&X-Amz-Signature=4abd55cff25daea4d0cf3de8a1addaba7a31be1b868ea923f36715cb57ee4ef8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

