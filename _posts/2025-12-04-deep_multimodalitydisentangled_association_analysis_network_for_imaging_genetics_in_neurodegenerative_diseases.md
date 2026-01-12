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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WICLQOCJ%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICwm9ThEo7gmEasVkibJvIKCBsdwUWIsO5FijIUqWsCtAiEAtOqb%2FrOT5buHaE02LjgSmuLfTA%2FP4EI00OudT9cUpGUqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAlGrnoxhbOcAHlENyrcA1FHpAkNIBp9RWrEitrZKYGo9nKf46bzMFwzw22hbjaGbosa9LkqBfwIBUIlXbkgLyIioXBGvK%2F31Y4URlGWdGPcVWeGJ418QVIHlznAbH7z7UrVal4BVovzar4e5kge26gMz9Lrl8zlUUbp43HTo8L0JcZZ1LuJBFOKRLvmEN6I6aU8zlMH7dyYqNfLjFYQSFFiw1Ce%2BfGPYhS94ZE8kFjXoL8Uf5mrZUim0qvfK8VtEIJchDrPFTC7rASf8I8aIhHgXrb%2FMdObPmCS9v2HZfbH6mGZ%2F92NQRFlA6RgnhMuxA1UNj44uPZuCT0HiWPFAOmM6eJEkk1drB2%2BX4QXVftz19wvYq0F3bSLGRkLlzYvzOcMXXtTAwk9AWx9Ztr9CToa1c%2BgvUACTIIZV6tx%2FlG4doo6t1LAAeK49ONwktDiaJat7hddim45o0vJhhkYMpDHh7IbhIJUW5llUimYv0MUWKNCA3SOKWQWTd3ntG%2Fph3PP271Vd4vGol%2FjCOra2eqllpPxpd%2BK8sr3ZrsnHOwYL%2FWW1qxO2vITsNgjbHi3siR%2BsZEm1CkQwsm3H7mBLVXXkaOwdqdrIGpQflqnMpW3So%2BFBbU4fkFNbh7SOgkhwUMfbzdkWlbkOouZMPjGk8sGOqUBnzclZcyM%2FQyXoEZ%2FLC%2FXusIraqOv%2FDhOMWaFhV8itNr40a3oBzPASBQtsO1%2FNBzRAmrprfAV1hOINLL22DuF6fw0inau41lTSQjxwJk2OdMDABne6QlkVquKaXs%2FVprXWqsmcSpLgwvi4A4U4dOp%2Bn%2FhmOjQpnS0BbONFuavjMd%2FP0fXuY1nXDfpSu9X89DphsFCaHHxi%2F9U7qFkuMSPn1mwTLz%2F&X-Amz-Signature=0090f67095809e97d0e96806a52d0be19d56a4fb0c96847dd74b529c25fc1889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WICLQOCJ%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICwm9ThEo7gmEasVkibJvIKCBsdwUWIsO5FijIUqWsCtAiEAtOqb%2FrOT5buHaE02LjgSmuLfTA%2FP4EI00OudT9cUpGUqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAlGrnoxhbOcAHlENyrcA1FHpAkNIBp9RWrEitrZKYGo9nKf46bzMFwzw22hbjaGbosa9LkqBfwIBUIlXbkgLyIioXBGvK%2F31Y4URlGWdGPcVWeGJ418QVIHlznAbH7z7UrVal4BVovzar4e5kge26gMz9Lrl8zlUUbp43HTo8L0JcZZ1LuJBFOKRLvmEN6I6aU8zlMH7dyYqNfLjFYQSFFiw1Ce%2BfGPYhS94ZE8kFjXoL8Uf5mrZUim0qvfK8VtEIJchDrPFTC7rASf8I8aIhHgXrb%2FMdObPmCS9v2HZfbH6mGZ%2F92NQRFlA6RgnhMuxA1UNj44uPZuCT0HiWPFAOmM6eJEkk1drB2%2BX4QXVftz19wvYq0F3bSLGRkLlzYvzOcMXXtTAwk9AWx9Ztr9CToa1c%2BgvUACTIIZV6tx%2FlG4doo6t1LAAeK49ONwktDiaJat7hddim45o0vJhhkYMpDHh7IbhIJUW5llUimYv0MUWKNCA3SOKWQWTd3ntG%2Fph3PP271Vd4vGol%2FjCOra2eqllpPxpd%2BK8sr3ZrsnHOwYL%2FWW1qxO2vITsNgjbHi3siR%2BsZEm1CkQwsm3H7mBLVXXkaOwdqdrIGpQflqnMpW3So%2BFBbU4fkFNbh7SOgkhwUMfbzdkWlbkOouZMPjGk8sGOqUBnzclZcyM%2FQyXoEZ%2FLC%2FXusIraqOv%2FDhOMWaFhV8itNr40a3oBzPASBQtsO1%2FNBzRAmrprfAV1hOINLL22DuF6fw0inau41lTSQjxwJk2OdMDABne6QlkVquKaXs%2FVprXWqsmcSpLgwvi4A4U4dOp%2Bn%2FhmOjQpnS0BbONFuavjMd%2FP0fXuY1nXDfpSu9X89DphsFCaHHxi%2F9U7qFkuMSPn1mwTLz%2F&X-Amz-Signature=0090f67095809e97d0e96806a52d0be19d56a4fb0c96847dd74b529c25fc1889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664OBI6GVB%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQDLQJZojlWqWKUwqJUkT5krWVNmcUBG%2B%2BcqX3JU4oCXLwIgZ7TL0jBLQbEJY9%2F6Z0t%2F0kJtGiOuW93CTeGbx15IyxIqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH8hAhREG7aDOWeIVyrcA2zRkmxrjHAbs6aQlw0R0MTSdISoWwWOLRb8sNT1wEzNtfmyyK6OVZryUWDbbw6Aj47iEWyiDcNiJqdNAZcvX95yJPaYLc3cKzAuS4vPTc6d5GnNfT6wJ0WNZQ%2B8MUAQyqPqsPsMcG04mMB2fx44F25BvrmlCBNOFYtADUC378OY7jPl7BF%2BqQRsWRVLOVHdXwBNYWLFnxDnaAk4Gt1oBTXfaA0YoofeyQASgLDj%2FL17iLqwM510VKD2RwC%2FJIM33E9%2BlJFQ3jdfyUbymU7snjn8mMecX95j3KEZ0b3sS3BOkozx40Ksyaue%2FQ9D2BvgXaTGmYRGbit5BN5pWs8VXSVmuC1Zd7qj9IKzScWcJMFGiUSlFx9z0l0jCEJn%2B58gPF1mVM07lvHLNZnxpHzRX2qLfBJv1gQmb37F6%2FgsVTSO4ImRgmI8lVvwjoJeoPTY8ZNeb9mc%2FB6pMVW9xcnDIwOtXKTqb0k3fH7ECOpBIdn5uzYqAmfioLp5sjrn%2F4hdLr9y8envc4AKn3Yew2erWZkKAXQCdzMkF9Vc51yD%2B%2FnVa0oVErNbo310F3sPDqVri%2B5wIu0Q0S9MB12x7BO4AEe6TSLR51H0w9g%2Fk9qfwtZoYMwIzjsqNOpkoHz8MPrGk8sGOqUBXHX3lgReRxouT47yqx6TcYnk%2FGL0ikn58ekZMSc%2F%2F4izN6hnxItlcBQ4yFRR6S5v4HtQSzQ9P2WpQMo%2BO8d%2Bmwu3zDO5Wn%2BCcJc0zRLkQugz35mfQJKdn8VK6xQvKPGvEDpQzDaLo6%2FdY6ibrATrcWg3H9qt9P87P5HDMPxs2ufy6LTGyT3hf2bqotZIssY7gFG4aEqBjV%2BA6SXXFD7nK2GnbBxX&X-Amz-Signature=9c1342f06264a091358fad063bd813cd07259d5b7817e8cda015c0a31988b4d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DUK4VF5%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICrKLCs7BqoQc0OfNEJtBIvFaJt0Ce4tGqBQVA6t3BBdAiEAzM3AqTUsnvdgXHNpYE2dn9R%2F9fWHaMD8uj12mAs%2FwYQqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIDPHQZl%2BbvCujtfdSrcA6eiM05wZzu4S%2BNYmORuAzkvUT5xOH4KIn66bcN%2BzGkFw1M2mCOWQoo1qfJ1NOozi75pM0UvDWbP4zy4kex4UU8CndDjltxoP3cBZHArK49vT5fd5i46eNvyx5fBVnJY7WvAnfT%2FK4MetULlBDLjAq5aNj9MfZKPiEiL3%2BWcs8b9Tu%2BhM7QIRkPoRxJLnEtxAMGshsi4x6x9oo8xRSORUnbt%2BTcXOP52gr9Sk2KdxDpdNx2MHOrqJCdlyJm2NzAkm9VMlEtRSa8DMhfQ9leCSveELcfsAloHZ5LnU0Nzj8AZS1fRcYPs36HVGM6Z8Yw%2FW5L7CgSloabXTfd2n%2FRwIPjirr%2FU9kWeCrH5fCawToB589Mn7h8BbFCQuMoOven3Y7pgQNtp2%2Fm75vpUvackAoNgCRhseSvJNt55q09x%2FlatJ%2FnkKlFW1XZBl%2F7qnZXs8NkL5vXgeyFzkpGkHaw2jt42KnW3IPs4kZuUNZ7DB9bP8Q7NkNUDCoVNqduXa1yzZ7S9tt9wDInXF56kS6%2FR1qauSvSrtds8Nii%2BIL9WkxbkRvZKBxJkAduuhOOZEwmuUi8g4COBo19spHLwqO3hbemj0vWxp%2F7eMZCHSk0zvGqnuU5gYGJgQcVvD5gkMKTHk8sGOqUBhszqXj0q0I6vyaLbErkue4QVxEqXdGXrTMy0B97skOOUcikcMKgIVrXNZBg%2Flzp5bMctSnRhvBJC88sHrgPLwnM3cxileXq0anLWelc0KePA88ePhDwPeK7UtSQbFWdm%2BrHVkVbQKNWbft3xgZjNvzCjgNOI39xfStBz%2FI6rreXqMWYO4HVSTPuKFXjirSXtXBKkSdE8%2BihxdnzHTyKxQQi7IRUb&X-Amz-Signature=9138a674bf6291055ba5954e64c4af89c62e2773118fe32dcea9a06c92456452&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DUK4VF5%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCICrKLCs7BqoQc0OfNEJtBIvFaJt0Ce4tGqBQVA6t3BBdAiEAzM3AqTUsnvdgXHNpYE2dn9R%2F9fWHaMD8uj12mAs%2FwYQqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIDPHQZl%2BbvCujtfdSrcA6eiM05wZzu4S%2BNYmORuAzkvUT5xOH4KIn66bcN%2BzGkFw1M2mCOWQoo1qfJ1NOozi75pM0UvDWbP4zy4kex4UU8CndDjltxoP3cBZHArK49vT5fd5i46eNvyx5fBVnJY7WvAnfT%2FK4MetULlBDLjAq5aNj9MfZKPiEiL3%2BWcs8b9Tu%2BhM7QIRkPoRxJLnEtxAMGshsi4x6x9oo8xRSORUnbt%2BTcXOP52gr9Sk2KdxDpdNx2MHOrqJCdlyJm2NzAkm9VMlEtRSa8DMhfQ9leCSveELcfsAloHZ5LnU0Nzj8AZS1fRcYPs36HVGM6Z8Yw%2FW5L7CgSloabXTfd2n%2FRwIPjirr%2FU9kWeCrH5fCawToB589Mn7h8BbFCQuMoOven3Y7pgQNtp2%2Fm75vpUvackAoNgCRhseSvJNt55q09x%2FlatJ%2FnkKlFW1XZBl%2F7qnZXs8NkL5vXgeyFzkpGkHaw2jt42KnW3IPs4kZuUNZ7DB9bP8Q7NkNUDCoVNqduXa1yzZ7S9tt9wDInXF56kS6%2FR1qauSvSrtds8Nii%2BIL9WkxbkRvZKBxJkAduuhOOZEwmuUi8g4COBo19spHLwqO3hbemj0vWxp%2F7eMZCHSk0zvGqnuU5gYGJgQcVvD5gkMKTHk8sGOqUBhszqXj0q0I6vyaLbErkue4QVxEqXdGXrTMy0B97skOOUcikcMKgIVrXNZBg%2Flzp5bMctSnRhvBJC88sHrgPLwnM3cxileXq0anLWelc0KePA88ePhDwPeK7UtSQbFWdm%2BrHVkVbQKNWbft3xgZjNvzCjgNOI39xfStBz%2FI6rreXqMWYO4HVSTPuKFXjirSXtXBKkSdE8%2BihxdnzHTyKxQQi7IRUb&X-Amz-Signature=c3997472642de00a48133b564ed80ad1ef3bc4518e6bee0738d0cc3f0bcf2ff5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGC7VCKE%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIADcbCwXYK950sihgnZMBt1vn%2FTxIczgsTA45jJyD8bmAiEAkgif2F9kQS8HnGhiXbsHtIFpBjTZ%2BJziTEyc1yqFXgQqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIVnMHl4dsAVjYrvpSrcAxMJAR188Q7Qs42tJ1NR2BmSdTaSxg9RFfPhq%2FTn3YTJG%2BSfidl49pJqPcTLZQI%2BxtUYcMVgYgtI6HU1KimVt34qsU6hP2lgPaldK9zuaP4AWWfGNZePYJlT3K%2FkhMEYylmBDxWlqKbW6HFtw7gcAArpXcJl1dn0Dm2tsuYuKpbKWyzQ6mVPjaBohsRqJSs%2B4g0ZgH51LYQYfPComR%2FcQQqKG6TysXS5jr8R99ouORKKf8Opkd8QpzQcc7hxnFBD3M4kNsEgxAkCjc3azX0xRcRNeWgpHjiPTxofBP03MdpYvaeJsy9QVc3YFi3XT2cAOl6scoyf8OATYqX7pbB9nET4GGi4Uk2GydPBkZjyVSTL%2BNmAvrnAHoCKkppLrsvravbUbN%2BdFQTbZiqrIE5Hj%2FKcToxDpl16oazprCI%2FfIWKYWOMENnftKjY36WpzOAFGdpI62gKEvGqzPwNxOqdN7jUdFUkRFq7poHREkAQqcqqJ1mibskGcRwx4hDgn02n6xZ%2B9OmprZA7%2FDqFBbbxCYI9F7tc%2FY1bzrVz%2BKZao1gEeImQ7eWOXM7Z3yoHHGZyosGDVEVzn2nrcZ3pka1vXqYyy1%2BHKi9eLL3NbjDkNfK1iu6UJ5WqHEZuUNtsMILHk8sGOqUBxD9aWA1m6P4ENB9VkdKAPy54whZ5QDseNuJdeW0NvMiwQdEwte%2Bd%2FEoTu3xlKXdCsawQw8J3uYDJCyvXgGCcYYaeLD4Col%2BYOif%2B4uuQF7%2BoHj5UEi7Y3kh2FIpbn9ZtzbDkuS4KlwIyYiNAdumw31AzHzXCUWprUQ%2BMRqvcKtXo8Pgg1dyR0MpRmnpS6yho6dLR1woRo7Eb%2BlKUG7JK73C08%2Fu7&X-Amz-Signature=d823c891d789a65719d2807dfb6a30f9f01f4dbe37d8cc20303d37bfffef7d74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7BEA336%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDJpsya0CdeC4saU5O6FRLccq5EJDUSWEoOulWWH42kJgIhAOb2535sEQIpsdLb4F%2FZhsDa02KSF7JFLyDpAogXP47wKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwKdvkOufhbv2FA%2FoEq3ANHuEl1bWeZ0IlhbTnMhLbDUTJHRgfbkFU1DLl%2Fc87SjYbLmjy%2BdwNAAqkXzog9eG3Kbb3JPlkAWSquznL64sG5AqMqsSWCEZn%2FnoMA1%2F9OGtE8MrXnVO1r0tn9QW1g725p0jyL1mGtD9ga6BaTHchhdi4nhgfztFK6MUZWfNPdCEwre4aUlJhLcRb2ZsrqaTKdCGLhvMDGCaEETulimsmRG82kDe9n7u6jiP3NsZG1YB%2FA6KgpsKm1pZ6FPuI9PVOmvChjMoNJdBRDIcN5%2F8HtbOPmNdAiaEk1xa%2BiSn4PM%2FFWRUZcwpWE8KQ%2BFEDjlaHpy3igDQeqQEBv7hpOVKguTlpJFImlvBTXJV8MKmntkx6s3WjbjHkBMlFc4wb34WzABMBM8wZluJi7R%2FqKLzqDEZIUoja0%2BoCTSbCb8zJ4iJBXKVUDQj461OLMH2xbfGALKgmA2ycMg5yEPzIXu4QKNzQqQX%2FZ58skfl7EJhokYXIK89kvEpR4WiYbQA8A8hryQxHY4AFw88Rkb0DTgd%2B7m8wSHnnytTeY32sFLDhifWqweCeW0qGlMS8cDXMVfAa7RmaVpikk8wK%2Fu8vE3jJDO6MXDw4tt1kGkfcLlSJJM1ZEzRvdbFHv5oQA9jCLx5PLBjqkAZw3N9B7RJg9IwaJALSk%2Bil5PkKtcZuWhPUQrrVWPVFIHX80iPTdbpWm41HxlIGijJ287FYzTVn78sTNbG0rSbiDNsC7%2BTC6Z4zUHL6lkdoTNj8MY2w7KujCuhl6PXh3U%2BZTkkBO1eD3FNASK3lpwAhI%2BIyHWjupSl5tZFh0k2rwEbM2gKqQ4t7I%2FsMU5K5s9zpSx10%2F08tBW6KNx9bo6WoTwslq&X-Amz-Signature=5b297d3e4810aa3eeb5b0aa84fb5903c371eed768c8dc2a072b5fb10c4e1bd1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI62YVHL%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQCMLxwAr2F6Cxg7HR%2F%2FLPrPhS8IajtJb%2FSQPReLgBFtkgIgZ80pmQ%2FkUTTtWhr2K45k6%2F14GgElrAWlLErkh4qu%2FskqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO8yKSN5UBfmKNM5JyrcA8IWNqWUGAi6eEoC87ZBBxUvUfkXAWazsXoOYzToXWNFSGnrMgo63O8XVzqmM2ishlpfk7XufSTDih9KX1mKvG65CUkqxeoxd2bXvnFb9kVhzc0mxe5hC7tj9HUkGx1YMe%2FTR8A%2B4oIuFVaQGE4FyRSxJBTKZZOveUX5hKf%2FzDXnKwAAC7TAJxlOI6SqlEI27f%2BTKXoJyobYsPXNwCWHe5nOBbuU0%2BCJYcmEZE0KPNde6LK7kwpv76FyJsCMbx%2Fj6aUxNTBSefJxY3a9k8AEfRiTpD7SEiZCYwyCw0xHRWmwNHuMRdk8uIoEqRPm6J%2F8Nih1tvk0ZZ7VV%2BzqGGpBfvVSqeUIOdeLH48tUmu%2BdfRiut6Sytm9On%2FTAJTS22BIYRY1CisItSZFtYRwf%2Bv0wNl%2Bc18Une8qLTImC9DJ120MvcvGsP%2BnpeKsCUwKrjJdZls0OjPFIVTtvg5qiVpKFOJAPC3H5LeT82Hmgjq0l6f%2FPeodms6xvHqYgeZlJdQnB7klRoeryg0XmPSKWZPpADYIbde%2FBwYRsmgqGW%2BOxp11ueyj164SyONu4ECesINiDPFDrXybQuwncyG1myJy8%2Fbwm7%2BM9pOHqWm9kM0LCMLaFqmfvizechyhEWu7MPjHk8sGOqUB0aZfDedq2vOUzei3Ma6rbkqSWONyu192gKP7NvuXd2xCE0Il3UlHGXMVkd0dZhHzZ%2B5fKYSoXGBAQ2rIvJgYaSEM2HnRq3FswMLzGakZecXnDK4iCCdqFHeu5GBnH5P930SVQpHM71iGQPDH9suzkI%2Fw9bRq3xgfLo9WoPm%2F8%2BzUpH%2FJWSn%2FpUuUCSeSWRAItAJQmuSYTtSn%2BHvO%2BlXf8cb1axKb&X-Amz-Signature=fed50bb71083fa41c7a57a9b6c6beec8fe1dfa46110a652aa522dfa83159ace0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ2746HJ%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIBQJnwFCnAU4t4fAkXvvfdYsVdetWgKBVSGp7akpHIKDAiALf7qdTVxeJO855E1id5%2FqGAfLOojZh3q0QgpO89cqVCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FJIpehhGZbMyEBW7KtwDaLbb1OCtBG8LShoUY0EoS7zMMoWM7SWW9X6FRuCj72DBhPGinzDFlhFSs06CuhkxF%2BYxFqEQg8vfGFrj76owoz9V%2FYl5VNdXo3BBFabXO75Ru6FUv%2FXykRBmka8plI%2BT3RWOYAEI8xnEsuEx%2BPng939HAC8JWPEAVpYu3WTU%2F%2FFdTbz0LQtc34meawg8QC1PRLDw8zYlicaRe7KTLG9WMY2UrUMECleYd7AGO8RyKl%2BSQi3RSCbPlWhxhBV9HTqDgmmR9xurh%2BBGOwY0%2Fbdjsz3q%2BlwBEYd9dVw6sy5MfTovCjfxG3TlbjUZU5bczQOz1lTmANqdiFSo9fBxaf2PVQKFt9%2FHd8I3LojU8g5Ap2fQ9j0CGXsgwqzGZj3w3b%2Ff2R6RDkJ%2BkHfw6aR9k%2BYTEg%2BJcv2ipkUIjDGql87c5pJ2eJAcdMRgkgnDmDQLHJ79O0bUed6FCa0lNdZJ2Ucel5JAg1Tky5PWGD4U0OdOmaqN40tALuzE9hcmrps0RKzU2o9si2rj90rnT727fXclFVFj3gdMA%2FZswnlB%2By6DC%2FoAS35iOQVAjgbyt%2B5VX9ow3p57rwmKjMQhtGcu%2BmGCmMiSOGP5Ju1ADWSkMqq%2Bc24sDSJYlci32D1QaVEwlceTywY6pgHBmeMDEsmtmR7SMaQojx1SgI7Mx0o71QFYV06tLdQ4hm4rXf7bpnDXlon3j3%2BrNGZVo0XTd7KVlkg63ris3ZP%2BSbO5eL0tw2vXXVASzBvoPPQ6cMFORyOHHXPZjmsSXKz%2F9DcUT7wlDpcxi5T89kqdwwSwDT5p1cHVxLrtbvWsQ9Sx3K3472kZ6GHFnBKDNg11sTBw6WSaszgiR0nn5Z6aGhqFmsFu&X-Amz-Signature=8c2b1c23de42d6f765ea84c423ad5e15ad13ede0da18f1e59d87c343cb720be0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZ2746HJ%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIBQJnwFCnAU4t4fAkXvvfdYsVdetWgKBVSGp7akpHIKDAiALf7qdTVxeJO855E1id5%2FqGAfLOojZh3q0QgpO89cqVCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FJIpehhGZbMyEBW7KtwDaLbb1OCtBG8LShoUY0EoS7zMMoWM7SWW9X6FRuCj72DBhPGinzDFlhFSs06CuhkxF%2BYxFqEQg8vfGFrj76owoz9V%2FYl5VNdXo3BBFabXO75Ru6FUv%2FXykRBmka8plI%2BT3RWOYAEI8xnEsuEx%2BPng939HAC8JWPEAVpYu3WTU%2F%2FFdTbz0LQtc34meawg8QC1PRLDw8zYlicaRe7KTLG9WMY2UrUMECleYd7AGO8RyKl%2BSQi3RSCbPlWhxhBV9HTqDgmmR9xurh%2BBGOwY0%2Fbdjsz3q%2BlwBEYd9dVw6sy5MfTovCjfxG3TlbjUZU5bczQOz1lTmANqdiFSo9fBxaf2PVQKFt9%2FHd8I3LojU8g5Ap2fQ9j0CGXsgwqzGZj3w3b%2Ff2R6RDkJ%2BkHfw6aR9k%2BYTEg%2BJcv2ipkUIjDGql87c5pJ2eJAcdMRgkgnDmDQLHJ79O0bUed6FCa0lNdZJ2Ucel5JAg1Tky5PWGD4U0OdOmaqN40tALuzE9hcmrps0RKzU2o9si2rj90rnT727fXclFVFj3gdMA%2FZswnlB%2By6DC%2FoAS35iOQVAjgbyt%2B5VX9ow3p57rwmKjMQhtGcu%2BmGCmMiSOGP5Ju1ADWSkMqq%2Bc24sDSJYlci32D1QaVEwlceTywY6pgHBmeMDEsmtmR7SMaQojx1SgI7Mx0o71QFYV06tLdQ4hm4rXf7bpnDXlon3j3%2BrNGZVo0XTd7KVlkg63ris3ZP%2BSbO5eL0tw2vXXVASzBvoPPQ6cMFORyOHHXPZjmsSXKz%2F9DcUT7wlDpcxi5T89kqdwwSwDT5p1cHVxLrtbvWsQ9Sx3K3472kZ6GHFnBKDNg11sTBw6WSaszgiR0nn5Z6aGhqFmsFu&X-Amz-Signature=c15b33500a3b32ee3962e3cad6c7968c4827df48a89178101092f1ddddfa3ca0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IAE4HYO%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDeYGaYz53dJ7jLUPxdZIIVtAeHRK%2Bj5TQTmBCwQZEBmQIhAIKpLHXrvWk5Pd1yeKkGY7Za9BLwcMRbteyyUwdlcV5xKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxBZF6112t56Wdun0Uq3AN4kiRLYCXkuiib7QOxK72VFH%2BhSJ5yrzr%2Bq2SrQdQR%2BHZeEYB3FopIEmLeClk%2FHDcPst%2Bb5c7JHsKqEHWzzVeCGDnxfkMDBxSUtRvrG0D6qlnSBIEhBsOyTWAopmIfX4HqFkZGcdkV7%2BX2jbvXSvEQNY7eHYNuFUgqyya7OgpSQT6ua3x84c0v%2B%2FtFq6nnVDVpVCFTj3khsdxFyDSOKxA5AnQ7NAKWZKFSMsiMnfYULI%2BTjVlHDgg5evKAmb0oNrUBoHf2%2FJX%2BeXPS1rRbVYGNSDNM2ll86y%2BU0LI1y%2FpjrAQZUn8LIWc%2FfW5IAj953m5YyuK3O7ueniLq04kzCdoZVFEz1DlTeJPcM%2BXfF6Pu0JNRauF35aoqFc9sXO20Onr43EggNiX9LaNjDcN24LkAaOdN11eWKLb70L8VyMX%2FjKcXu18lvUmeRgLcCuAzUrqfMthxW9rFlAFClPvzY4wHvIbPvCT2Ib8dutfDuOt%2FYTZ9etG22lk1PrAcYz7vZhI%2F47bFeSaK06iyklFa1AWvV%2Fh41wLDFa1ZDxyceG4cJHxd1Hd9ECaZcpia2NoGWZnzC%2BZctl%2BVQ%2FwfHOgSCFmoHuAstaP8jiViuhqTSjyTdcGGSW3eCHPRkyTNczDtx5PLBjqkAfj8VDfLm55Ds8v%2BRs70fxyNMBBzb0A5w2HImgvecwtKw8YyUE1bwfX51M8uPU0JyyEHl0LTGEWmzDnYb2PLWOYjHLS6%2Fp5wBQyMXYFhxEVgWyL0Vyh7HHfttUqC2pUUaJmqxwIdKqgA%2FT%2FxfLYqrS6oyQaVhyOb4R1%2BaxSme0KHdVwO%2BYx1Za4A18E32R5nuRTshsvvk8DTHwxbK03DeKQqjGEm&X-Amz-Signature=ae36b1309f1a170ec800989b609910fb4d6f4ae29fe46fbfd275c89a8e5b35be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKFSBT4Z%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDyN1Zba6l5sPy4MN1OiVP0EI%2BdO7rdY77Aa%2FzEHuO07wIhAOwq3RK7aZgJNoQL%2BK%2BSJ7dtk%2FjvAXPVW9JyLDNeWHNDKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgznXFO0AO59woSxv5Mq3AOUPTD3LHdwgWWJqd8ga6%2Fnz9q7LVgfi8N%2BzstMjAvmf8uzKxoXO3Bd%2FlrA3eNJ5GfxiucJ9vXRYXB90HJPO76GWvCXK8AdbcI%2BxoYCeY%2FniMxPELvXUFoEoLWsCPq2vcLd98D1xQYuSR%2FxZkbhxBkEllkUlIwMkomObDHQ3Q3cO%2BH3CIcOXwL%2Fyrz9Zb0YUHLzUV1tOqArv7tb%2FuTGDEwnGcs0Q3ePa7y0tPIl9mFND9orfYNFrCqKz66gKAxyGozbYa6G8w%2FluHyE8oQra3B6W4bgEMNg7LGPr5sgyFc89xDtL5LOf9IhJeZ4Ajg4NT7PFqTOpeYOl8kaGU%2FfT%2Flji9RDccRpvLnOnthXjnPMnhW93yaWUm%2Fqzj7jjlnR1vaNpyB3IqWwMkSdCyRalGSIGRO0GDAWJTChMcCWqsptPQORtDkW3ROQyhe5Tgd2dLX8pf48vqvQJ%2B54m0b4X5XvG40eiZD3Ao4FfnpRlafLTcU6qtmupsNfcRpZBNzCCSJsfnbq0TM7%2BdPL%2FbeWdxIYAwBLz0QxDBUbI59nH5vvoq0yvlavhFvOcIho49h4GNRPoXwEkKTZCHrjDxHK6n0q0va3yxBigzRNQbXaNXZu48CPIFbnLbA%2FzjjJTTCmyJPLBjqkAbBGZiimPv1idmCf830DW3GYFO7oEros%2BJ7KltCZvLXGecrI6O5fb1oRJr8SFnib%2F4ozg%2FJ02cM4qep0gRLyxa%2Fzr%2BtqvViythKJjfnnxKnW3cYgUk3w%2F6ACQCKxfItftvhDg3gp1m9OeRWpeuPTCoBk6EjUQbLeG7Jz9iXfToQ1HQDVhHCug8RCyDR8fXhFMAcABENK7yrvlAhVObcTWP%2BwU1Tl&X-Amz-Signature=ecc54d4fb628071338c72480264badd8e2ebe19ebf3dd005c8f6f9e290345add&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKFSBT4Z%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDyN1Zba6l5sPy4MN1OiVP0EI%2BdO7rdY77Aa%2FzEHuO07wIhAOwq3RK7aZgJNoQL%2BK%2BSJ7dtk%2FjvAXPVW9JyLDNeWHNDKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgznXFO0AO59woSxv5Mq3AOUPTD3LHdwgWWJqd8ga6%2Fnz9q7LVgfi8N%2BzstMjAvmf8uzKxoXO3Bd%2FlrA3eNJ5GfxiucJ9vXRYXB90HJPO76GWvCXK8AdbcI%2BxoYCeY%2FniMxPELvXUFoEoLWsCPq2vcLd98D1xQYuSR%2FxZkbhxBkEllkUlIwMkomObDHQ3Q3cO%2BH3CIcOXwL%2Fyrz9Zb0YUHLzUV1tOqArv7tb%2FuTGDEwnGcs0Q3ePa7y0tPIl9mFND9orfYNFrCqKz66gKAxyGozbYa6G8w%2FluHyE8oQra3B6W4bgEMNg7LGPr5sgyFc89xDtL5LOf9IhJeZ4Ajg4NT7PFqTOpeYOl8kaGU%2FfT%2Flji9RDccRpvLnOnthXjnPMnhW93yaWUm%2Fqzj7jjlnR1vaNpyB3IqWwMkSdCyRalGSIGRO0GDAWJTChMcCWqsptPQORtDkW3ROQyhe5Tgd2dLX8pf48vqvQJ%2B54m0b4X5XvG40eiZD3Ao4FfnpRlafLTcU6qtmupsNfcRpZBNzCCSJsfnbq0TM7%2BdPL%2FbeWdxIYAwBLz0QxDBUbI59nH5vvoq0yvlavhFvOcIho49h4GNRPoXwEkKTZCHrjDxHK6n0q0va3yxBigzRNQbXaNXZu48CPIFbnLbA%2FzjjJTTCmyJPLBjqkAbBGZiimPv1idmCf830DW3GYFO7oEros%2BJ7KltCZvLXGecrI6O5fb1oRJr8SFnib%2F4ozg%2FJ02cM4qep0gRLyxa%2Fzr%2BtqvViythKJjfnnxKnW3cYgUk3w%2F6ACQCKxfItftvhDg3gp1m9OeRWpeuPTCoBk6EjUQbLeG7Jz9iXfToQ1HQDVhHCug8RCyDR8fXhFMAcABENK7yrvlAhVObcTWP%2BwU1Tl&X-Amz-Signature=ecc54d4fb628071338c72480264badd8e2ebe19ebf3dd005c8f6f9e290345add&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKAQYHZ2%2F20260112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260112T121922Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIFEG%2FbFzIDjP2H3y4GfwCAUt11akDKCwHBgLcPl%2BnwWpAiEAlWQTmYP68Nr7UA%2F5ik6aR1Lrfw%2FAPqDA5ewQ4duT3GsqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGhSp2ZlYdF%2BGJLW3yrcA8qKUtMZd6xz47rj%2F0TJKSnEB46n94iMThT6pmrTF0SXxPRFDaj4a84p2h6xj4nCnwLYJNDe9FSDg9UV3nmSrj6x24hDI8rWlso9XKMeHmos2p2ZCukTOjTFAFYlbNZd7tVGg7FMDGZVWjIiNDItKGWpRMMRjh63IZxZd6SgcNXMRI8gW2y%2BpoMluKuTL8EtqaWx2kJGmJY5NoDQcDYU%2BjEqNFD5LGdCofAIzWbcK6CdmFYDaaf4%2Fjpocdk1SOb%2Bw8fluWw9JMrx2c2a8nm2%2BS%2F8o72qqMfUaCwUjLbYcJ33XVoJ3%2BGigkaedVTDD%2FK6dmzFD6LM6aXI%2FUvwkGbKDeDary71Wj58zoANo5PWZxSvgY2GkdfLT8I2SIM3IMzEnl%2Fo0p73VOt1JID38DQwCu3S8U5eVJ1rGK0kZDYuU2rot06m4n0MN3FwwQdZLKpMqX6pu30r90rmZoWY3rU6oN83i%2FtjMxF6v89qNygOJTdGShoJ5FRpAtiqQCbq%2ByPh8sHYRben%2BioIizBgg5ceuVkJqr5B1ANsmQOzbjd19t844yJWqnoIMV6jZRkf9wErnxZKR5ZWv%2Bo3rdnWFg7CYtGh%2BRWeEYsRgsWOGHiUBMkpTZozzHXGXN0rgv8bMK7Hk8sGOqUBk4R1gQZ%2BBDcn9h4Bav7j7VyrYrqjuQHUZBDpl1xMjWjg4snFi4heHcTVbmeGpkJWrkjerVVZocvZWSsMVBqrRNmR2waxl2078oibGrK0%2Bm1Xuqvbsdz662a3NtSQ3lwrk1Lw2OBQIv%2B0AdNiI6eT3%2F2IHh0FlR4sC24D2UOmJpqrc0pdk3r3k5BMhBYzSc0IB6pLEqi6ffkJfBgO%2F4JLyhzG35QH&X-Amz-Signature=4fbb70bfb9ced3175dc93028a00fce513eed1ac406c25fb7e0d670c46a63e989&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

