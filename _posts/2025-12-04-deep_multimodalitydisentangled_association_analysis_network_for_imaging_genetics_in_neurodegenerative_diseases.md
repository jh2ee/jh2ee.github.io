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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUKU34GY%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCO0o3hpORI7vnLcqbqkB1TckJorISOd%2BMDPY16WmWGBwIgSIX85YICO1KyT%2BwxzUVWTmFDJBqgKduveE0Yw6vkLkcq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIRdDrKR0vf%2BxEG8KSrcA7Gj5Dcxo60BR3KPxOMJq298ruhQnJmzz5ACVdVnBTusj2E1DQI4lP4pZMkUgXmkMpiPPnXsXwgOO%2BmFiSusTz8U5AgVcHqsgAaDtj%2FC5tNwaBBcrB2c1ldsBzJO4MQmuV6TvoIjQvKdhuo0Spvyjd9GokU2oOrViZWIh9TtAMrh8aAPH36cJSJLRLYQBi2JusPKQuv0y7jp2rYUFu6BYbZ7DaveTvv7uFTMCa3vKBFSO0M5OkNKNpwGE4w5HmSd4AuTkssvDqseXgpk9b0YVtION7DoU00jZVv7dnuZkeU7AP5dWsehxErbJVyqk2%2F4jYOFCz%2FNh8in1QgQ5tXE65%2FEsFjhL1tJLhWzfm3eHtnLvNtgpu7IRbsaXWJqkTu%2FsxryYpyAGKi14Xzk4BzaLNaZl73Os6BAQ6t%2BWpMVwZT0gRW1V0238H5VxmcNqua5w9G07L1yUDJWnJ9ra%2BZ9rXK1SR0wJU%2FkAFpe9WEsZKMF8j9okziDsLEZ2o1x6iPn4aQlaVbz9glrWDNpODyKgLbyXFu1gChNsmDaFzbqKlDlHWLm5S4BUBBr74yuuoBFHCb5aVq%2BBk17Nul8qHNnPhRgH61%2Bwi3M5eabjZ%2BQo%2FX8mBGGMBxI6AL8U%2ByHMImitc0GOqUBuP2NES8KzjapePIUvrTRPMh8XhjeGgoYUP%2FloMgtyfEpgi8vRUhLET8o12nJ4eJ48wTMqDeo%2FArkTyINo8ZiQ%2B%2F25yf6AY59dOZ0Xoei66ejI%2Bp3Qp99w%2Bb457BsDQz2mbRyvintc8x0cvPgvNpxGJml%2FDoLLDIlYU0%2FGVKMpLb1ZvcXZq1R4hV51zMyhQyti7s%2BOMvdBy1ab4cb1eJTkhgWo3Nn&X-Amz-Signature=58cbe84e02978bff5e7c4e2727415608a10c06940f13614abe84951d0f319d58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUKU34GY%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCO0o3hpORI7vnLcqbqkB1TckJorISOd%2BMDPY16WmWGBwIgSIX85YICO1KyT%2BwxzUVWTmFDJBqgKduveE0Yw6vkLkcq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIRdDrKR0vf%2BxEG8KSrcA7Gj5Dcxo60BR3KPxOMJq298ruhQnJmzz5ACVdVnBTusj2E1DQI4lP4pZMkUgXmkMpiPPnXsXwgOO%2BmFiSusTz8U5AgVcHqsgAaDtj%2FC5tNwaBBcrB2c1ldsBzJO4MQmuV6TvoIjQvKdhuo0Spvyjd9GokU2oOrViZWIh9TtAMrh8aAPH36cJSJLRLYQBi2JusPKQuv0y7jp2rYUFu6BYbZ7DaveTvv7uFTMCa3vKBFSO0M5OkNKNpwGE4w5HmSd4AuTkssvDqseXgpk9b0YVtION7DoU00jZVv7dnuZkeU7AP5dWsehxErbJVyqk2%2F4jYOFCz%2FNh8in1QgQ5tXE65%2FEsFjhL1tJLhWzfm3eHtnLvNtgpu7IRbsaXWJqkTu%2FsxryYpyAGKi14Xzk4BzaLNaZl73Os6BAQ6t%2BWpMVwZT0gRW1V0238H5VxmcNqua5w9G07L1yUDJWnJ9ra%2BZ9rXK1SR0wJU%2FkAFpe9WEsZKMF8j9okziDsLEZ2o1x6iPn4aQlaVbz9glrWDNpODyKgLbyXFu1gChNsmDaFzbqKlDlHWLm5S4BUBBr74yuuoBFHCb5aVq%2BBk17Nul8qHNnPhRgH61%2Bwi3M5eabjZ%2BQo%2FX8mBGGMBxI6AL8U%2ByHMImitc0GOqUBuP2NES8KzjapePIUvrTRPMh8XhjeGgoYUP%2FloMgtyfEpgi8vRUhLET8o12nJ4eJ48wTMqDeo%2FArkTyINo8ZiQ%2B%2F25yf6AY59dOZ0Xoei66ejI%2Bp3Qp99w%2Bb457BsDQz2mbRyvintc8x0cvPgvNpxGJml%2FDoLLDIlYU0%2FGVKMpLb1ZvcXZq1R4hV51zMyhQyti7s%2BOMvdBy1ab4cb1eJTkhgWo3Nn&X-Amz-Signature=58cbe84e02978bff5e7c4e2727415608a10c06940f13614abe84951d0f319d58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZ36NE7U%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCq6DwGwNdfNwVKkakMCWX5%2BoiQxW6bTNT1Ia50prGlYwIhALqD9IvzRhk0oNxR8z%2F5RVUyC3HpPqhya1xwwco0ieybKv8DCBQQABoMNjM3NDIzMTgzODA1IgwoVp%2FRplgxbSElERAq3APownsHJv0R5A3beme7bbDjwZivSBNVbSFpf8SnTfbx9TQnuJWq4ljuip5vqlVclrZR%2B9XBglRA3WUqI58kesn7fVCrzaK0V7IFd6WzDmK53L87muhgkSbVfjemfXmxR6X17C7%2BSARkwWTfDuhKReREqr7kmCc8Rx6nzXrCOBdkpE6NrOklQqMZUCjpITiertACFeKPVEdaUVN0nzwetyHxHyribUKl2%2FVLQcdbHE6NXSNEW0ZkeO9sAjj%2FVsiID%2B5W4Fd1KjJ3eT59zN%2B2xxK%2Bsy9II0kE4IOAinaDWX0ubHMu7nuOcQYbdznztXU7SVz08%2B%2BoT3kiWt%2FbyTVa26WNG47%2FCsH1BTdxpc9lDSu0jOdr7nw1zN5%2FN25PH%2FJeHvy0rYFiff9f%2FCu4Qsv1UYWDIgvwC6iodp4FeRhVnueg4sZh1EH2hw1Lpf%2FhWo%2FPGCBsZtMkmb9%2FqcQFqQaAAO53s6IM7RqJiKFuR%2BFLVPyMn1rkEzE%2BuTAp90EYEL4LG3LydUXPmPp7g%2BtK%2BA0PoyP7WnMsiQjgX63RTnsMdU3zqOTJJ5bwIAkkTVVub3yL8VEMP%2BwUujmSWjNQzROc1FKYy%2Fm3iqkn%2BOk5iZaqeA06zWZv1BdgC9gtuHh5ITD1obXNBjqkAfb0owsZY9%2Beb8frHQjWvv%2BpEIRoiGxl3PMzy8gxa%2FRfGmWpzwNNYdnnhn1gRs7Z1KghLE%2BS%2FsNWzfeh%2F6q4hROK%2FK%2FJ117GG3w%2FcVrGIdQ%2BaSF%2FfoAqRNycFO7qSPdEJpbDMPkqRI28HBfJZgd9JEtAe639U1A1WbZa78k%2BabWwieD484hsXErItiku1H8wwactxotamxmcSvyTQwACYGk5CQ59&X-Amz-Signature=21313d504d23c284753a9151ef197e9af7587d30ce9009939a11186c3323d286&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652TWFFC3%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQC2uDB4R6%2Bm6aIxu79iaBSKEYo%2Ba57IFT5WsRucrjld%2FAIgOhtZRDePAWJtTGN88vYDITwXgTax58sXwbt4lYIFad8q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDCc2%2FBEUt2khyAHDfircA2NU29cFNZrBE%2BflQHKhQOG%2BuYKk5Mnv7mbGg1W0mrKP9f8m%2BIQWVu5fecVS0KVBeoXcacImyuzz%2Bp0orktn0mvFypz8iWRTr3SNekDfcHmdlKuWBZYdobIymx5FoK%2FCS6etCv7Imty4YYwF88kAMAWGg%2FR8%2BziDiq5qOSARsbvTmpzASiQcWq7mOh0QA%2FCt83Qts20hTN0S1JDN8v0aq9jCqq001hXtSf52JRmnyzivH0b0iMB8m2S8XqP%2BpJ2piKopK0UgKfvYkz24nfF4v7Wi0fCGspxepZPuy8zk99lipFT%2FY%2FzEZwpyveKsNY74Xrjz5JswG1q83ICy%2FZBfHR3%2Fwtd8%2Ff00equEIY%2F0%2FUk%2B2cT1H1RKj1Pa%2BooZaPkPTPlVhFYNvjv3htA2V3nDC5sCmoT1lJUnyFfXWOMv4wrfUC2HiNU0Vvxkww7eAD4sRmkhpTAqOlnVrKZ6vvBivB8gZOYpHkNp3ue8O0YswEEPqVPlOnO6O4lVlWJEI%2Far0Ilpmdmysf4%2FKMbvi%2BwR0Y7u4WBzDGujT3HmwgM5rGGUWvQ1cfFPw26S7Qeo9NpzYapTMeeav%2BeO6sTB75rHjFNEXbRW3MZ8dPxpwAIX7AakslbEfS72tNvt%2BTzlMPahtc0GOqUB%2Ba6qF9Wdmc3WjOt4N77f2yjGozpC6ZWGC2X2txa2QFiIzgkyviyHNDQEYzdRFF2zotkJb%2FkYhXKSAcx10m5%2Bs%2B2rUKJfsaumboYC5nlE6u4G76gBFVCUSwZlTsMxeFg5WPdddPtyfN3C%2FxqB%2FwzCkHaqgB5B5%2FjwX6bu2Si%2Bdtlm90sQYBGQ3IjiJFmyq0koQyl7YYBA8F8QmonsSSSpO0QAeJ3d&X-Amz-Signature=73981ee34dbcf5ec806f3ff1c4f09d6259496791afcf28d439aa40306130b1b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652TWFFC3%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQC2uDB4R6%2Bm6aIxu79iaBSKEYo%2Ba57IFT5WsRucrjld%2FAIgOhtZRDePAWJtTGN88vYDITwXgTax58sXwbt4lYIFad8q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDCc2%2FBEUt2khyAHDfircA2NU29cFNZrBE%2BflQHKhQOG%2BuYKk5Mnv7mbGg1W0mrKP9f8m%2BIQWVu5fecVS0KVBeoXcacImyuzz%2Bp0orktn0mvFypz8iWRTr3SNekDfcHmdlKuWBZYdobIymx5FoK%2FCS6etCv7Imty4YYwF88kAMAWGg%2FR8%2BziDiq5qOSARsbvTmpzASiQcWq7mOh0QA%2FCt83Qts20hTN0S1JDN8v0aq9jCqq001hXtSf52JRmnyzivH0b0iMB8m2S8XqP%2BpJ2piKopK0UgKfvYkz24nfF4v7Wi0fCGspxepZPuy8zk99lipFT%2FY%2FzEZwpyveKsNY74Xrjz5JswG1q83ICy%2FZBfHR3%2Fwtd8%2Ff00equEIY%2F0%2FUk%2B2cT1H1RKj1Pa%2BooZaPkPTPlVhFYNvjv3htA2V3nDC5sCmoT1lJUnyFfXWOMv4wrfUC2HiNU0Vvxkww7eAD4sRmkhpTAqOlnVrKZ6vvBivB8gZOYpHkNp3ue8O0YswEEPqVPlOnO6O4lVlWJEI%2Far0Ilpmdmysf4%2FKMbvi%2BwR0Y7u4WBzDGujT3HmwgM5rGGUWvQ1cfFPw26S7Qeo9NpzYapTMeeav%2BeO6sTB75rHjFNEXbRW3MZ8dPxpwAIX7AakslbEfS72tNvt%2BTzlMPahtc0GOqUB%2Ba6qF9Wdmc3WjOt4N77f2yjGozpC6ZWGC2X2txa2QFiIzgkyviyHNDQEYzdRFF2zotkJb%2FkYhXKSAcx10m5%2Bs%2B2rUKJfsaumboYC5nlE6u4G76gBFVCUSwZlTsMxeFg5WPdddPtyfN3C%2FxqB%2FwzCkHaqgB5B5%2FjwX6bu2Si%2Bdtlm90sQYBGQ3IjiJFmyq0koQyl7YYBA8F8QmonsSSSpO0QAeJ3d&X-Amz-Signature=ddef214db970b360fade416837f43c772affa555f203ce76f405022b968830fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDMVKKGI%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIHweytOrrEfnyUMSjkdZlIwzzflqdcYMgooe7lcjEmbCAiEAptSwOrSLnoXAaXFVQaCShkc1RH47RkGW9MiLIqrNsLoq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDM4Qsbq9%2BDga%2FckQSCrcA5zdn4skq%2BLlngMyz8K99JycktYME7Of3qgE%2FPB9LT0kDaW5s8bcm3W60qiwdiCFJkQs9wdRr6QOm2%2FGiBDT2fbD%2F91GAZO6ZsDyIP1Vl4scAitCI8TQS4lVBgjasdHLiCmhukROCKxJAekqsRLmn849zMjfoc%2FnAVM%2BeQYkOt2cJovKR7t7uszJe1%2BHOB6tc8%2B9WKMozL4Wn6oFpo7mqe2q8DVkBUqNGWwq35MN4j1JzBu0ELazGru4lJqZddMBd60P4xfrWyjDUMjM%2BtqfAc%2B4HfLqDB4ntufdkQHDyed8sfAuyEqupCGES2aiEK7gRgCwOqYvKodl9Ggy%2Fhcr9TQiS5LK%2FeZEX0THLyc8KX%2FY6AAnFWRtAoqoyun7Rzvdjmba2rt9Yqrv6oMjQFdRSN2pKCaCUMwS%2FEWAWAs5qxjYLDAw0YFFkRmYR0By1JvKHvt9STWu2IL7iYlEt4swQPCn3aJr3tD3eSTtWFODesH4kcO4S%2FcIiBp6aButv1ajPT5ev1NPehNhVdfwBx5%2Fhlew4Q5jMAZQXMUtpmU4G%2FoEij4ffWTWyRGJChjdMu0OLDA%2FeH1A8nJXTwHzzPlsBQrHO3on7rpfLbvkuEElR7ePQG%2F6xPda%2BqCkZGqDMJiitc0GOqUBMyBPMzViDnjB30L9azRW3huNropiN24iv27%2B75ArJDKCCEF11eeqcGpYykr7nXDxDxx7BEkG0cAfZ47uXpeOoiUEPNxgIEQR4eBCIISfA3o2sopvfM9FIuHQt6iNhwtNVJ3n9zN%2FtCgijAgDGhOL7yreCBNTp1kiKvCePXTSmziwBryvkVsXtNKJz4K%2Bi5gCr7OI7Hi%2BdG%2BkAL1kK2EiF5XJM3bI&X-Amz-Signature=7eb6d4bfbafe2a6e0c1ddab877b63e8319901dd69e7b2724db7260938931c6d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHCECLZH%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDv9RmiD%2FdLMK%2Fl7exn2RUNlg082q8k%2FdaAoShKsfzY5wIgO2%2F2DW8NKyNojloLv1KkDR7oT70GoqWUQZ3nHLxhDKAq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDDLdQNHo9m6BqgrLzircA06w%2FFNfu3BeruIPycGR%2BTovUXj4cjYFyU%2BvpjaZxrWdWM6wWPqhgZVtwBUD9Q0swj3%2BUoAeA8jGx8kVC5qBz4Z%2B5QqLCX9wQr1kLS4E%2FfF4bVOfCY0pu6hN8TjC%2B%2FYhB9diegDIOynacAvilopFEzf8F5IJo3N3%2BV3MDKoihKIaVDC1JKHfgaxScF2qV4dwCrPPVKcNO6svEOJKOj1MivCFmHWBT0erCuiEBPXW4lc%2BDApJm582oZ7MzFV0JSOhqtDMzimQitTewl5xxQATCrtCTHa%2FzWXN3jVJ6%2FiDbOgWQCXqgBqTvTyQWn1Ss5kWYNK7x1nVLFpECThLKiW4%2BHC4VpzTclu2iBXTSYaPo%2BOCu5guOKwfWFgj2lHvk3D98CDELM%2FgSuYhvcOchhL5sVp5ee6Y4zGiHw7RMiv4qoYT1KK7QEPqM%2BdYn82Cl%2BC58jOOfK0OkaRE1Dca0vxBtawSEqZBdHcJjL4Ckt0uqxhnmIdihFYH4rPZzqVano9sJPHVPsKJLVgVkSIe7kFhvK4ZL2FpR%2FDkecLol7i%2BfWWMcOTo4mD7p7UbI2X4h8pL4vRkthiNCQzJFSoyLGojqM1OkpP33WIFxXW11l7dbpxcAZp7DvqgJcfF7KvtMImitc0GOqUBJ9%2BgKAHXru1A55cby8%2FXVdeG0x1rdHCf4NhmxWMhP799GXr0H0s5wpa3I4uM%2BZQsjoZsKPRqgNLMYB%2F3YHx56aYqNfdPQweMdOmU5kEGp%2FVqpgVwUKSiUd%2BT8VBdL1EGyU496OUMoAWZlHhCqv9G0z7JHy%2FwCXenj%2BfJwRxsUEVnH8rQjk9MmTN%2BClf9DCLI2U%2FDqVY24rHY5KBbiO4wf7XJx6%2F1&X-Amz-Signature=89e01efbb0efc324b23f67aa927b34f7f925aa934706b82d5549b91cb7fe3cfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSEYUNLO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDdBPcxqlqDtex4Wh08ZBgm7Ndn2ug6B8jKO8rheByNyQIhAOVrA6Sqs8u%2BklRfrCPgMgZ4URXaBMe4uYvHwIgCPxdtKv8DCBQQABoMNjM3NDIzMTgzODA1IgxSisGpC6eJ7vnHt1Eq3AOydrvEtkHo0qnlxUNhhXiVp20PVNrlvIrIrRk6JTRoq9DiEjbR2QINcCNnv%2F1qlHDG6W0KoCJOxB9USzoSCJcCDfcqkmkPZIbq8VWDLuYVXp%2BsjyhFtg9AAgL4ymnQmxL%2Bwz84FnUTaQTcx1AbQE%2BBElyEgeqVEwY3gs2Ui4crsarJHs6zcZuyiP6KHAD5JLlpbaaZHkaOltv5jOoSS5D07tJr2tuFJdKZu7SCeO2clmEfBdSspa2BPUxYMNCEUZNBpBpoTKbza5v1xw%2BYlCHrww8k7SY8co9pKFseCfXV50TKiLfklV2YXbTiVgksavAM4XqL0suwdBWb8CoTEbOm3ShedPK4i%2B80R%2FjVJYTiVWmeMAgZg%2F%2FT11Wen%2F26iQ95ul2pCcDk9UNbV9qovhhyCQlI0N9g8hAcybcTV1YypVL86Wyhst583RdSTZxu2dst6wI9Fwd%2BgkN37QlpI9BeEJyx084khO%2Fo3DvXzYLBFD3RasK2zOMnfzcT88Pt98ubiY7HfmnyyqrviDiwOPblHXF8in4WNaE74PCoOuux%2FeCWWY3fs8zyNUeiPOSl0bHm5LK%2BIqENmsxpbjQFmcj7COWj%2F8Lj9JghytAVA7voAsZ9Q8yLAW544iDn9zD6orXNBjqkAQoaHT2dAZvT74siAqXDDgdkuHCztsg0MOLO%2FWQI1K36161KQvQZ%2FBhwJ24ek0Xa7w1pxY10FYwMuKAEfZetTqXhYw639YzbCLIZrxrHxctcTz7nkB6lTkkUf3j3wj8DdoR5B20eM4Ppp357x2rZzb6%2FWJK%2BZSLu8jQNp9OHzLdfwiP7sPwKO0Y28oYS4LEcOTCVcymC1OgIiXDUGN3ylKj8Sbzg&X-Amz-Signature=2f08dab7365c130fe36a9853718e6f74384d259b724912e7cb7d9a7fba484564&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTNV3Q7D%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHbv%2FZlhKw4njavvSX27ztcwMR8hybU1XwX9XuSWSCFrAiAhM7cbUdIM5XGlNEYVQ5hVlTXGRVp%2BSVnhOxgR28Cbqyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMwEWjhLfM91qkcGyTKtwD7R%2BwmLcT%2FFenro6RgbbHULfQgpFzfr6YgyiMEp%2BZgcfVGxVCXBnt0FYUcQmTj%2BVKcS3V9r%2FkmMuO7PoRa5O3EHzrtV6unnVSQNbAj%2FILTQPQv7Z0Wr2BF598pDRs0ZuoBh99Ep8ySa97CADKNaT5VQtKrcRAULN8iNRemNgJvmdGG%2BDtqRWLN%2FLqo8UhdoKjXSgqXYJJDtVxbLVxuluAWoA8qodC2uEoEBvwIFuQ1yhhC5BMwKJkIvXM6FB28iILpuLtxxyBFHmw0DibSrkMQe8OQoAEDJslxe6P250%2BkhbYsVdRaSnUeTOBc%2F6jtHuqGMSTmYmWT8uEGVPurzTWu6ikkba6ZB2yLiQa%2BZie%2FrCsa3xm%2BTHIxMDOcivMHOQgsyM2reMM4o%2FhXYE1VhjFFVsVo2vApmjD3FS0KmzwD6kcdzrzByZErWjk5w0oEUMPdAA064Aczk3lpt2AAmlHKpnx6RSslhQMe8G9UVaFNnsjv6mRt%2FzVNf3GeInKdNSOQjierwWgTTk8LLKGfZSEUvnak4xdFcIo6HDSReJNiZzUBsD06%2BPjJXGVLQrcahEmj555rgXpR1U1CQuSOADO0P9S5FM%2Fi9ZnE4%2Fey00ZYd20D2s3LX4j5pMTvacwyaK1zQY6pgGB2gOjJX7PMsB9%2F0RVxRYaxavNmGXTdVGlb1Am44JqaHWtPuLFDs%2BUmw8kC2dmAtrYIkgcXE4eIjaL7OLglJGgOYIjyDJFZlJnDUz1dQKijBd1NPmX%2FZIaiXnSp7mxeEUg96CzzAe%2FNRQE9eFrDqLr9lcH28hH3Ik5Y0MOZcOy6YwtXLJ3A6Yn%2FXew%2Fd4QJnxgnXC%2B%2F4lE9gRibihdZE%2FS9%2FQRtI8Q&X-Amz-Signature=bbe6b4eb73f26db68f3a709786ff5d6953342ddc5b72c518298a9c2265dfbfc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTNV3Q7D%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIHbv%2FZlhKw4njavvSX27ztcwMR8hybU1XwX9XuSWSCFrAiAhM7cbUdIM5XGlNEYVQ5hVlTXGRVp%2BSVnhOxgR28Cbqyr%2FAwgTEAAaDDYzNzQyMzE4MzgwNSIMwEWjhLfM91qkcGyTKtwD7R%2BwmLcT%2FFenro6RgbbHULfQgpFzfr6YgyiMEp%2BZgcfVGxVCXBnt0FYUcQmTj%2BVKcS3V9r%2FkmMuO7PoRa5O3EHzrtV6unnVSQNbAj%2FILTQPQv7Z0Wr2BF598pDRs0ZuoBh99Ep8ySa97CADKNaT5VQtKrcRAULN8iNRemNgJvmdGG%2BDtqRWLN%2FLqo8UhdoKjXSgqXYJJDtVxbLVxuluAWoA8qodC2uEoEBvwIFuQ1yhhC5BMwKJkIvXM6FB28iILpuLtxxyBFHmw0DibSrkMQe8OQoAEDJslxe6P250%2BkhbYsVdRaSnUeTOBc%2F6jtHuqGMSTmYmWT8uEGVPurzTWu6ikkba6ZB2yLiQa%2BZie%2FrCsa3xm%2BTHIxMDOcivMHOQgsyM2reMM4o%2FhXYE1VhjFFVsVo2vApmjD3FS0KmzwD6kcdzrzByZErWjk5w0oEUMPdAA064Aczk3lpt2AAmlHKpnx6RSslhQMe8G9UVaFNnsjv6mRt%2FzVNf3GeInKdNSOQjierwWgTTk8LLKGfZSEUvnak4xdFcIo6HDSReJNiZzUBsD06%2BPjJXGVLQrcahEmj555rgXpR1U1CQuSOADO0P9S5FM%2Fi9ZnE4%2Fey00ZYd20D2s3LX4j5pMTvacwyaK1zQY6pgGB2gOjJX7PMsB9%2F0RVxRYaxavNmGXTdVGlb1Am44JqaHWtPuLFDs%2BUmw8kC2dmAtrYIkgcXE4eIjaL7OLglJGgOYIjyDJFZlJnDUz1dQKijBd1NPmX%2FZIaiXnSp7mxeEUg96CzzAe%2FNRQE9eFrDqLr9lcH28hH3Ik5Y0MOZcOy6YwtXLJ3A6Yn%2FXew%2Fd4QJnxgnXC%2B%2F4lE9gRibihdZE%2FS9%2FQRtI8Q&X-Amz-Signature=8032cabbb04efc867641827b70ac334b86061d39f55c2a634f2ca524b70fcd46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXP2TKY2%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQD%2BhhrUsLo9mKcy%2BvEd%2BQJv1%2FQRQwTnQ5hLQjtkchSIRgIhAIS07bMzgOuvNNwJnahO9aaEEPz9K0pgQBnfQg1lKdt4Kv8DCBQQABoMNjM3NDIzMTgzODA1IgyNJ5GPjPO4ykN06BMq3APLVfR2Jnj0ChcWvhLJyfwvkbZjovXLgc9%2FLY8SwLm7pDOm6%2BxZzuGG3Et4hs7cjShn0ZoAGW8g91IfiCmGdB6koHRUu%2FjNEZM39Gpoz1s%2BD%2F%2FCbYoROfclFgVpazjK2MtweHDhFrAtj5Fj%2FY%2F9HGtyeQb566NDXxDpoLR2GscSwummcfwRMOB7l9p1Wb5ksqrtdIoQ8xZHk7K2zC7dAG2sNwfNw9Un9xDPNCqr4dddt%2BeFDapHh0VTjPTOkdMxP0cUQ1ClO2pPg7p6Pu8vFoOrZ3sCQoEl2%2BTlhgHq6XUao2YwCVIJyUtvnZTia8pkm0EL%2F5EyEnGhwwtSSD9fTpxk2rJSm4rzXn%2FCVK89MK0DMweyOzwMzPzSnFyOMCMkUKaxK1FWq8DWkoeoFbGqNIo3cKI7as3yT9AHi0rki28KCW0dRTSX%2FLiA0GnjTB%2BM9XEAVYuutVHnr8eiqAamIrh8bIx9ROVjPX4fFehaKUIhlunsRGl%2Bby1LWRGDvGWx0C5fB47Umn4B4KymOeB5syFkskWXvPomLMvSfKge4IOZsx6EmJm4cVmHMaBvVOPzbW6hASgeKRiatyAI%2Bs4dY43Lp3RmmBSujRacc%2F52Xh3PGw%2FSiiXBkijmrTl1MjC6orXNBjqkAaDaEiSoe947HumpNY0lLAN6ukyGyUF0KvixOQ%2B3KsO6eaIqg%2FsDReSz6XTzepsK8yNNK49XuGb2LZTA%2BGuahZKR8gYMxe67dRTSQgY%2BVTOraQfQ613HMwjkr71dmBQJ52VdRd8TZEyfjLyO7ZsG9ejgOFOSEq6F28JOoB1KLyJOApyL4jdPqSPuYsrCeckdDX4X%2F%2BS2kbVZggDGATCQ5kA6u87r&X-Amz-Signature=1b6c7506988769752f65286dcce16c9ae0cc4dd6e1a7df1fdd5ecf89911696a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHWCYPTZ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIBfrwuHFrV61qoaZRv2QaD94Ij8ufCbovnkbvuBa2XYVAiEAn2Y4GVNfLjyJAx4ArCgZTZwDO2eau7mh%2Fnl4JAXaAagq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDAt6NPEyxWz%2F%2F24NQSrcAxFo7efiD3yd3OGzz4EYXEbwm5QQ8%2Bl%2Bkf4yKmsP5IbCWVSHQIBJm7QQOw8kv%2FMH8FZgAdxOAQ%2BJdnO2Zkmmlddvu3Y5mg5n1mL4OOpkc2QaQmcQ%2F8x2u8PjqeJK6klCW87UTJS9rLw9AszeOEyMQrAoIAH1P9BwVTL2fLMZbMnoqa7NeexoFtazr7EXKEoadRn93cyKJ2bxVy5v7ugVRTPF%2BD2v0f19qwlys08j73Q89ooYVEGke9GiwgS68gs3g8AzjNAJMONVo8P2R9wxMZID61DIpBmYNFOuiL49gsAFEEYs6MRkWsQ7tSeY3UimCVzY9nAXhxYPsG%2B32CdtLOVSSG0mZXZUTRNmp28g4CWK5tgx%2BISdmuZ32Ciz6lFjbpSUdA3ni0LtuT6kbnN0mdd1s4pwEtNySt8NMULdpUH0HEGgXIzpl4cBKQE29uM1lyoC0a8dbGyRKRIaQri0M68ew6lsJLIjU6SWc1he0OVS9nRlwTpWzfzQvVsx6PlG985llUuCmlIA9klscoSFSb0jDjBB41y9oGtwWpnu8IkvSj%2FMZLfhDmPWG4QU0CTojCXiVuM%2BvFrHdFfByuvsYJCxbUu4Jq3Va3pAoiqKkhLOwTly7SAD%2B7rWKOeDMI2itc0GOqUBD05OqFcKV%2FDo%2FiZPi6faYWXmKV2ScQRSElpXN2NhjFTawJxQ9yF22L9MW%2BmpRQIvUqd82QQIcZ7R9mKACz%2BbcgD6%2BU2i6I8Ct%2B2yLGew%2BS1zciC5%2BY1MFu3LwVAS92%2BjlKI%2BsDGzXFumze%2FMwYbhRUsL9fbDHo2G0WA5u0PvBpHLlG%2BIGsK%2B6pMEwoU8HMed%2FfjdxoYwd5gcsbJHPUGd3lalxht0&X-Amz-Signature=a668ca97c7af0c3498eeb29d6c23a067056db1e5a9d0b48c1764f98a6ceadaf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHWCYPTZ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIBfrwuHFrV61qoaZRv2QaD94Ij8ufCbovnkbvuBa2XYVAiEAn2Y4GVNfLjyJAx4ArCgZTZwDO2eau7mh%2Fnl4JAXaAagq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDAt6NPEyxWz%2F%2F24NQSrcAxFo7efiD3yd3OGzz4EYXEbwm5QQ8%2Bl%2Bkf4yKmsP5IbCWVSHQIBJm7QQOw8kv%2FMH8FZgAdxOAQ%2BJdnO2Zkmmlddvu3Y5mg5n1mL4OOpkc2QaQmcQ%2F8x2u8PjqeJK6klCW87UTJS9rLw9AszeOEyMQrAoIAH1P9BwVTL2fLMZbMnoqa7NeexoFtazr7EXKEoadRn93cyKJ2bxVy5v7ugVRTPF%2BD2v0f19qwlys08j73Q89ooYVEGke9GiwgS68gs3g8AzjNAJMONVo8P2R9wxMZID61DIpBmYNFOuiL49gsAFEEYs6MRkWsQ7tSeY3UimCVzY9nAXhxYPsG%2B32CdtLOVSSG0mZXZUTRNmp28g4CWK5tgx%2BISdmuZ32Ciz6lFjbpSUdA3ni0LtuT6kbnN0mdd1s4pwEtNySt8NMULdpUH0HEGgXIzpl4cBKQE29uM1lyoC0a8dbGyRKRIaQri0M68ew6lsJLIjU6SWc1he0OVS9nRlwTpWzfzQvVsx6PlG985llUuCmlIA9klscoSFSb0jDjBB41y9oGtwWpnu8IkvSj%2FMZLfhDmPWG4QU0CTojCXiVuM%2BvFrHdFfByuvsYJCxbUu4Jq3Va3pAoiqKkhLOwTly7SAD%2B7rWKOeDMI2itc0GOqUBD05OqFcKV%2FDo%2FiZPi6faYWXmKV2ScQRSElpXN2NhjFTawJxQ9yF22L9MW%2BmpRQIvUqd82QQIcZ7R9mKACz%2BbcgD6%2BU2i6I8Ct%2B2yLGew%2BS1zciC5%2BY1MFu3LwVAS92%2BjlKI%2BsDGzXFumze%2FMwYbhRUsL9fbDHo2G0WA5u0PvBpHLlG%2BIGsK%2B6pMEwoU8HMed%2FfjdxoYwd5gcsbJHPUGd3lalxht0&X-Amz-Signature=a668ca97c7af0c3498eeb29d6c23a067056db1e5a9d0b48c1764f98a6ceadaf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEWCXVRK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T151142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDbbJVVjEKKKYnp%2BeoqAXu0nbb2iHG9bimmWBwOKv5cqgIhAKq66Q0dowlZUAQoofWnq6M%2B2lERXQtJqdqFtKx9mU4rKv8DCBQQABoMNjM3NDIzMTgzODA1Igx%2BuY6ow2kFgRyU91Mq3AMrV2wzXTJuORNf4MfL%2B4LRGVg561H3ZfqxRG2jIk1AURGCyL8OQA4nnXQxLj%2BvcWeht4CC0Agsaq7qVjv4TU367madXG%2FGkfUkMjTbK1gpLn7CPeE29VBWM9z%2Fn38orgMpXYK8JrLn7pCjl8xhTWnkhXsz0AEXGdqj9y0dIxq3YRKENX2X4XhRN2gBIrcsj9M8iehtM0zP40jxl1xGCArjGB3XCVo37S4Tx%2FnAHixb%2FD7LvpEqkWWi4c2ruqlBFnL78H13fI7OaoMzjxHSs%2FSKpEa9PquV%2FKFMeyANA9zzjF8Y7XE8rywUbOES4MoniTaNCcwbI9zYmDePs9HwFT2i5GSWl9d%2FieZmfg11AQNGEWxDQjAAqp%2FMEUGgT0mRK3xnBs4g1HVdI305Eh7dS9Att4lbMYxqX1HFx0gxcMd3WdN1D94mfwIgOpu1FZ4DegeSl73cNbNicxBCLJYVCBloNLJ8p1RGxyPuaLUBbaBC5OdWkvg2PrVCMfxc6Fmi2ftNwHHn9jlKrALp929qiF3Qp4umZz3cRR5andSAbMfiPWZWqJYgbN7GJ%2FS7BywnyS3RARSv%2B8c50i25QyDAfBK4xidYLk6ssiAutfMgEtyp9U1RR1nn%2BIL5qQWFzjCYorXNBjqkAcYOsQ2gdBH5aL9gQvYySlqX%2F85HJQYqPvXRXcDzeT6IPNanrO3SvRtcyCaM1petryZEi0Y1kau8JBSjwbK%2BRW064pgUiYVyL5Y10RGCGah6sAaBt2PT%2BdXCCgQtun0Qe01I8%2BClTnCxUGv7%2BORGk16Yjx4df902EH9UmqR6lfRnKLvBvY9tZ%2F1VybwgcWHqSBs3pB%2BVqgUU6fiKzdD7YorLmIdT&X-Amz-Signature=8e0003a0d62a56417f5d5cf0c46d03c396ddd594793f893f5e478b18fa3209ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

