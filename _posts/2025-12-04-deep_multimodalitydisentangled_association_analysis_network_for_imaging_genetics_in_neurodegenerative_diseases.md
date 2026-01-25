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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSAK7N4P%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIAMAgR6VNF38mjEX0K9703%2FumO2OdgO%2BNNcZ%2BWrH%2BdjqAiALXhIQplPEM8tBlYz1K3fTRoHEc9tho7ITwJheTe7SwCr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM8jBliEpoE4Qx2m%2FHKtwDYNxApp%2BZnqiGtxl%2FR4zVLN9nAPr2nxby3nQYPz9QQn3LLI1zZ3p4oo5myU9CBsNRSoQHNCpVxLZQFUZgmeSas%2B0%2BHs6GuUjQTUqOdQGkCkmE74n41Bv3IdtkrzUCV%2FiiZ0Kcn%2BT9%2Fsx6M743bI31yg%2F4lJkR1m3Pj1UPP%2BplIuyI4HY0ffgYYDT8CJYdbfm0x%2FFhoL9YEbB7EAa03d5w7lyetKTOi0Tf3qGMp2H6cOWLbY2Q%2B%2BKVYuzC08TBsSR39zl%2F9cjh5Yvn7Rd02MvC%2FwscW69q66ElsR1fTbupIvt1mnn1uQuLHAKRGCtZp78NTHc19rk5QbB%2FJaqQpC17bNggZUyRRCtUW1QO3YLygionCuW6jhBzIaORiUkPQpAXOx1KZLtJiIcrtR5OAe5hJ6Ln2VWKeHlIomuAL6wAqAVyi9SqpKSpDijsPlYPLSD6BzugL2t2PhkdtzgAd31WbC53uz89q3Y4Q84uWIrxJRRUDOERIZ7lGPnhLfGnCY5h0BKUIEHuoOoe%2FxX0aizBl7H5hLHQSM2TSsdCJw3DmF4eK2DMlElcaZrZyw32s3PQ5ASMcrKL3FddQMw0drQtrwHIPgjBRsp%2B9q38mrfr2rCpI1h48cTGaXMC9sYwvrrZywY6pgE0qHJlhd1z3KrtldYSTHqDQtxLP6QYucgsqe1s0CrpIS0h1BehAeBAIaKkFmFZBZuI3MizWrdCIrLuMEvKIOH17I8dBKhsdnmsxUkJbFXjdB6Q5mZ9Gmj00amIUDfk5SLxFd8YVfkAm%2FQH%2FIJE0ciFPAYTzHbqfeIipNzrBw%2BarYOrgzN%2FzKN%2F3rmw8bVXPswyko4xMySBuvkzJhpcVQ2w1X3RNT3b&X-Amz-Signature=dda4b4ec62544540f84d32213589e1aa70a0deb5af1b519f2ac486664590ecfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSAK7N4P%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIAMAgR6VNF38mjEX0K9703%2FumO2OdgO%2BNNcZ%2BWrH%2BdjqAiALXhIQplPEM8tBlYz1K3fTRoHEc9tho7ITwJheTe7SwCr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM8jBliEpoE4Qx2m%2FHKtwDYNxApp%2BZnqiGtxl%2FR4zVLN9nAPr2nxby3nQYPz9QQn3LLI1zZ3p4oo5myU9CBsNRSoQHNCpVxLZQFUZgmeSas%2B0%2BHs6GuUjQTUqOdQGkCkmE74n41Bv3IdtkrzUCV%2FiiZ0Kcn%2BT9%2Fsx6M743bI31yg%2F4lJkR1m3Pj1UPP%2BplIuyI4HY0ffgYYDT8CJYdbfm0x%2FFhoL9YEbB7EAa03d5w7lyetKTOi0Tf3qGMp2H6cOWLbY2Q%2B%2BKVYuzC08TBsSR39zl%2F9cjh5Yvn7Rd02MvC%2FwscW69q66ElsR1fTbupIvt1mnn1uQuLHAKRGCtZp78NTHc19rk5QbB%2FJaqQpC17bNggZUyRRCtUW1QO3YLygionCuW6jhBzIaORiUkPQpAXOx1KZLtJiIcrtR5OAe5hJ6Ln2VWKeHlIomuAL6wAqAVyi9SqpKSpDijsPlYPLSD6BzugL2t2PhkdtzgAd31WbC53uz89q3Y4Q84uWIrxJRRUDOERIZ7lGPnhLfGnCY5h0BKUIEHuoOoe%2FxX0aizBl7H5hLHQSM2TSsdCJw3DmF4eK2DMlElcaZrZyw32s3PQ5ASMcrKL3FddQMw0drQtrwHIPgjBRsp%2B9q38mrfr2rCpI1h48cTGaXMC9sYwvrrZywY6pgE0qHJlhd1z3KrtldYSTHqDQtxLP6QYucgsqe1s0CrpIS0h1BehAeBAIaKkFmFZBZuI3MizWrdCIrLuMEvKIOH17I8dBKhsdnmsxUkJbFXjdB6Q5mZ9Gmj00amIUDfk5SLxFd8YVfkAm%2FQH%2FIJE0ciFPAYTzHbqfeIipNzrBw%2BarYOrgzN%2FzKN%2F3rmw8bVXPswyko4xMySBuvkzJhpcVQ2w1X3RNT3b&X-Amz-Signature=dda4b4ec62544540f84d32213589e1aa70a0deb5af1b519f2ac486664590ecfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QTV5G6G%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCICY76lvXKZoOzjg%2FgUOby4%2F2RBQDYAxg%2BzG0dtNIPki8AiA%2FiGb5vqHk%2FVzSkUnrS%2Bx73VM7LyQWe23QbsUa4sU02yr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMf%2BkuKy5CzSjZjYNYKtwDuz4cJCABaisNsM2OwKyJVqN3XaUTaFf8v%2F%2BMBSzdOlv6V46%2FFFdnaRSJRTUtkPdVBTWmie%2Bwrr7iAJB2Z6YTnqTsYjjZV5LMKznrb%2FJV0oeKnKlX%2BGniMAZVIFPiofgyQDqY6Ci9IkxqORX%2FvPw8rWaHVo7y6qI7A6lpv%2FfiaySNPa0nccq%2B%2B9EZVInCr5VdM%2FiuezYU0tyqccEHxaOoYbFlyCRgOKqARwFaaxnBkmhWJgAH9LyoMvczBNfdHX82i5Ph4ciA%2B4ZbGU33eAVfWHtBQ6cY45hRrJHk85GqROkEDHMnRZAUBXJkgsKa%2BnoY14GjaClrB1uEVCLx6YDCgbGrmhKOHcoQUu1rNLYxQ9ZWbycaogk%2FWNlueKTKzxL%2BMdP%2FRDNfGW83I8ro8pqwpexzjIbZ3WwdSx77n%2BaJSQsx4Y%2FXN6E97NuEkPANJpKbpv8wPfUDWvUTc1sM1F78NeurB0x1kAxzh9LPEM7DnFs021X5PrnDuyA2Pxv%2B6cWwLDrYQT3TUUZ3toLpW%2BvAFQKkJOW5sqJpFi%2BGJJL07Jd6QuVHYFGH7ObUJGK%2BzfHLsj62bzx78nQMMbhfRPCYMzXOdWa%2FOfLNWLVbBJmmoOzav3aQWGHHae4u%2BCowmLzZywY6pgFO%2FtvyL3D7Jl2IWnZyDW7mD3s70p5beH8UXucaUiW87rFMbbx94%2FZwAvG0X%2BbUYO9Ui2%2BsoyjFUns2XLw5AlhKKRqhF4N5CO6noE%2Fv6bxQcEwNvw2mPo%2B3CMmf8GtQr7uvGzuSacDvdMd9uKDX8%2FzRlCDhTq1K%2BQGFAtT5AaG8kHv62rQHelmFE%2BPGO43OyyZYVnlBnsQQi8QX7%2B3HaQK90EqXfbTS&X-Amz-Signature=b09f1ce16adfcfef5855c990735598ccfb8d2d15140e922820d03b0aa854a0ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZCBTNVF%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCICQYuzNDBDRmNDEYmjybsL0HC9Dj3DaGyA8kJZraj6MPAiBdovaHamd6rrzuQHUPRx5hj3uzTVNHWTry5cLfWlg5QSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM3%2BhjRVaNWBJvs4KYKtwDCA94UfpMugM2%2F0fawIuvvKjvCRtaRDS6QkWaztjMfkKVFnqEoYavT2eQIF59c62iaZZT0V1NfnpyNxIHrDoE0WvsmLRqpRBYniWEeDvkt00hPHQZP%2Bgz2%2B75oarjgZBHTGIwUY9BkxyWugugdWewZsm%2B8udG8W6KbkgKjH3leJ0RMOU6bjzRXg13m349YNwmi1GWPXRFvYi%2FG8K1EgBbNczAxKWr21TlXbSK%2B8fHMkJ3e%2FAKydrvlXY84RY6ZKFMNod0v7HEvmvjZlo3%2FBKnaBjqbFNRH5RPtzqzUB3UelEgcStBq%2BEqWprBZ7JiO8XQEGatwKLIVtHhABmfV8kSBsUChu8zEJrfMVsb64HIxHyW5D3k0YkwePC4WpSKzTDVzRjMqrlZ3Z3nd3Y3l7RjPt0a9WCNXCojr4AkKiqeZIMEnY0MqnRLIbKayw0hLMWLFEcL59gDqzmDYZ41CeQb1E%2F9re9gaqy0GQAjNb%2FjpXjxQiIZUybGNMgWUPub1xZpewJ8fb%2F6CA1KYp%2BCRi0CpmEP%2FmYgN4SomZ809DLEW1iJhzQlBCNTznjz%2Fb5sS2XsBZ0fyTmsatTKOSrGkdHCdjPj7bmhq%2BxwwwhtRbKqn3AgX6%2BdBNvXkWAbRyIwobzZywY6pgHNoGyVnek7m%2Fv1TXMUpySFRd%2Fjv%2Bzm4Ok70FacHvLGCCIIFpqkA0WFzYpaLvlH4k2ttn8sr5MzfF8zjJZD6JI%2F4NnWtRt0lZorsLrmBVp2mh6lo6pNFztFihEOByNB0UrGHODHa56rDNjOVyrolNIk%2FSSB5XEX1QNYlVXbmYS0E9w8cCLp4RaGJ7cq2hVDCK9wljLYwBsFLtnYpaVvIHBQ2geXjFQb&X-Amz-Signature=788981bd80992f715927c7bad270f497f3e294c4ad5897a968fb30dc887ae764&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZCBTNVF%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCICQYuzNDBDRmNDEYmjybsL0HC9Dj3DaGyA8kJZraj6MPAiBdovaHamd6rrzuQHUPRx5hj3uzTVNHWTry5cLfWlg5QSr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM3%2BhjRVaNWBJvs4KYKtwDCA94UfpMugM2%2F0fawIuvvKjvCRtaRDS6QkWaztjMfkKVFnqEoYavT2eQIF59c62iaZZT0V1NfnpyNxIHrDoE0WvsmLRqpRBYniWEeDvkt00hPHQZP%2Bgz2%2B75oarjgZBHTGIwUY9BkxyWugugdWewZsm%2B8udG8W6KbkgKjH3leJ0RMOU6bjzRXg13m349YNwmi1GWPXRFvYi%2FG8K1EgBbNczAxKWr21TlXbSK%2B8fHMkJ3e%2FAKydrvlXY84RY6ZKFMNod0v7HEvmvjZlo3%2FBKnaBjqbFNRH5RPtzqzUB3UelEgcStBq%2BEqWprBZ7JiO8XQEGatwKLIVtHhABmfV8kSBsUChu8zEJrfMVsb64HIxHyW5D3k0YkwePC4WpSKzTDVzRjMqrlZ3Z3nd3Y3l7RjPt0a9WCNXCojr4AkKiqeZIMEnY0MqnRLIbKayw0hLMWLFEcL59gDqzmDYZ41CeQb1E%2F9re9gaqy0GQAjNb%2FjpXjxQiIZUybGNMgWUPub1xZpewJ8fb%2F6CA1KYp%2BCRi0CpmEP%2FmYgN4SomZ809DLEW1iJhzQlBCNTznjz%2Fb5sS2XsBZ0fyTmsatTKOSrGkdHCdjPj7bmhq%2BxwwwhtRbKqn3AgX6%2BdBNvXkWAbRyIwobzZywY6pgHNoGyVnek7m%2Fv1TXMUpySFRd%2Fjv%2Bzm4Ok70FacHvLGCCIIFpqkA0WFzYpaLvlH4k2ttn8sr5MzfF8zjJZD6JI%2F4NnWtRt0lZorsLrmBVp2mh6lo6pNFztFihEOByNB0UrGHODHa56rDNjOVyrolNIk%2FSSB5XEX1QNYlVXbmYS0E9w8cCLp4RaGJ7cq2hVDCK9wljLYwBsFLtnYpaVvIHBQ2geXjFQb&X-Amz-Signature=fd05a50ef94ea3dd87039f5a4ea5d5381b97cda176a726371b6973f6da086565&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KF3MBPM%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCyVmlygNOL3iNCmrU4VNy3Pbw%2Fs%2BXO%2F2Ze6ytR6iyeXgIhAJfQx5eD25FHeeZ0rNTQqdZsPUwCah3HpoZLQxuk0Y7IKv8DCCsQABoMNjM3NDIzMTgzODA1Igzbk2mp9ZQNimCZ5Noq3APev8Wz4jOxclMqBf4XVurVvJej6mwGh55OuzUC0grRC%2FR5a5I3%2Fp6dRPPb4oqIcshrcV0R%2BHCgE52Ywmtf%2BiV4hSaCgF0edcfbQ1WABX%2FMXU3WzWMAbbnOdxwSDR5yABO8EXRrUABXV4PKavrRaC90tzJmg0sxCWmbYfqc1LEK8QYmWnFCllCxw0V9ITyc2Q3N4sSXRKfgZ5GTjOSLzXX2fPZUHnftyrtF11o%2F9b1E%2Bbg7vx%2FQUVSKAeeGeBt9sODm2C7SyjG8CdAIxY0JvwiBggQgDtpMslmsgxperHuvixnQnnB1xBjedVvHdzthHWzDzc28mfbU8dsOsmT07jpnvDSNWpnd9thuWcSTmZtcaIqx8HbH756BlKRgyi8ql7UcJEWv8O7%2Fa6Bs5gL8ATXtBi4eHUqlOEu6EufzESH8L3no%2BESvZW%2F4gc0jZczkSQWTRjxy0FIdq0kkt249ox5bY5OdD3P2oEh5MQJJ9nsc15v9x9ETMnn4LFHxcFsrz7oU3%2BC2mb%2FN9KgOxThmNxsBAyisRUutMK4UiscOV1tssOdecigrwRRa7ZX3qpIsHgHHhOMGLVhnkJYO43jScZU20xqF89N0zJUNAw49nenBn7%2Br%2FGW4e4DC2j4EnzCBvNnLBjqkAeG4IZC9AMvTXFo4qgc6%2BZ6xZfSV4ol2AQJ3qawuFG3REP3VVUB%2FpS8ttvTu36crfSkNXLElFeBHlXV9eIxNwx0stfvLmVg9SCnFWsFwW3wZ2CECDUenWa7iZ5hicka3pK14cZAY2NfGIwpaJEMFCbAw6XV4uJwKNFQLsEYoKQF%2FttS%2B1h3q%2F3avjQQMgB7gIm9f%2BKwOvY65BOIlUdAXj9%2BO6woQ&X-Amz-Signature=29266d1915cad78f5bcf05c6c480f5b90dce1d65c547707d65efbb6201442248&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBC3BOR4%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIBSRfpJ3PSryRfW7lC7ULnEJMdTXXGDsaroFrq%2FMSYZzAiBccTs1fNb%2FZoGnrxJwLwomIBJt1ftNvLP%2FKl4MkbR%2Foir%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMj45A7%2BpEA3T2KTOeKtwDrkXCcfvBTzWP%2B6T%2BSCoGI950OHP%2F5Mn2xBX8UkptYsCY0Vxrz719H%2FZgn1bq%2BLoqeWY5H54FVXZ1aKWVJW%2FJYzy0BusLaYOYVSeILrpvPP4qFbypjsXX2ospYXx1JKDDdT7aonEI%2F1ZrKAsay60AkJTJu4lF0a7TMnGfXp9Aevh7MenIeNhqXsZacHmEVK0ij9gDDSuKZ6Z832REe9RzURnkNJx2ToYHe72cAch3bhb91lnLer8HH1HA8ZeX%2BupmsjqH%2F9LG9BHxZ%2By2EJaBxNFFHGt45R4xU97G4Jk5TLYNapeKQbffK%2FxiutbGDF5wuW0YcuPRSikaQyKnPGIjqjqpRWvMIVVXt9GnLUHJtFppnFy3LG3J9RzaUetBJ81yIDLMg%2FKaqfQCvv06Qu%2BKxtZbc5NLoJUSrAPy8ey4I%2FrK7t95svIy2ZHGg9kTHG5CBXGh3QqJQpj6d%2Fqn%2FpE8tM%2FyaIxtlhoFXstsDos3%2BKi2JcYqPtHamgu6m%2BwahVARlfvMkMsVd7dxYXtESpQrPH8tWrYg%2F1yt9ndn0ZH11Qc3sMZW%2FjlS61gjf8Untzqka1zACKTj2TCDGikhm3toMI9UKl1NtCe99FPGjl7qQ5Ut7DmsSeBehiK1GfUw9rvZywY6pgGYQpzkfUveWB4J1QyR96xNNYGOX5Qfg%2F%2FRzsezpsAwxI%2BIhgANd7%2Bw9BL%2BV9%2Bxsk39no4iglb%2F1MzA741hJk4zlKD%2FeSwur8IW7qiC%2F093ly%2BoH0vWKhKrw8Q3bZ6PGwpL1c7eD8xKdbToXdI6VBB0U0MqJVgrCxtKgUBAogGmcgzCvtoKVsvdSMhU4iSocPUlGqYciSuOaG65FB8%2B7oPz5R7nIiO0&X-Amz-Signature=577a7baa57df879b2bd1bff61d71a6af6a88e0c0a042f2412ed488a9410450f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7PUYEP4%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDR3S7e6p8hhsfMGMPw%2FrjuloY41h6b0QqLUf6%2B4%2FLi%2BAIgYW0X7LuYy4sILsDYRmZYFiU50l8tKlbYvNmkLKh14sIq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDIaqDlgdv47noP6egircA1F33IpCReGcyZ67eBIfnsrsyuUtSlVkkdSUAZRDGdTROoPMcaNogGaPS%2FZha1e9l0kvAtz8I7iDt26hj7uCQok9jNoA4VOMc12U%2BqmfWXvUBzzb7ZcN%2B0Mc3p%2FNBIwb80ayHlu26o9RXyXxB%2Bt6LF86GqWPklsFAHkiX6LlJ0X5pwbbo%2FNzNkjRNtKK9smzI3m6CAqSiQw4AjPZRzolDPW0nahuJ%2BxxO2O%2BXNx8a3TIATs2%2FyZBGfH7XxABVlIesPtjfKPq8rN6n8aGbFLvOe%2BFPEy1TjV05Jk7AvRC%2BVqsXNnTPW92njYbZDmUKRvDke0yInncuVMnAJBLkZik1fwJs5WRti2AmWRMfumBODtVUmcy7DXb7TMATn3D%2BBXK8Fy6Y%2FtFWf%2FtBtVvhB1bEEDhk76r9YET5M0IYddIlwYCoqlL31N8DmmVCKPwxpESvDCfh89IVXw1k%2Fcc21vvQAXtcHHfHW3AmIBTEH3hz0tCZxzozspPQKA7mkZAGkqjkFlccm30cs27Cmg2szo4boDa6xOmF7WusR4tOR8K4PEwgFCSmnXDw23t1cV0T5bEuNmzoyi%2BiXw8dgZJzjT73eeh2cGNtWFUpj2eyWB9PC5nXryh%2BDpgS2L6axIcMMC62csGOqUBSsNpIDooBzxkYFxhlvpSEuEnAkpld%2BFVYqy0mG6Jr0sXLJpuUTEqbf%2B8nJl5ViLBsDJ6C9GUqIF5fm3ctAYmVQOXX60oR84Ju8paUFp2Cm3OqK8VfJdRBcjADywDRNqyrJjPckSbLgN2wHwySgP9e4aTmouvBQ0IS7mgNrTCBngeGrbfMXl15iIXqMjviD8He6wTgBY%2FmGf15i95n%2BeJe%2BJR%2B325&X-Amz-Signature=4bde6e6d8a5728946e8fd786aaff53fb6ba8083d96fd5276cfffd39d21b1f8fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662K64FUBN%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCYxbQP7MhKdao0IDikvwx0YaC3yNeuHeWL5yUUmQoc%2BgIhAJHYtypL7F%2BiRCfHYiLQfblCnT1iL2tR1MAIygHlKUC3Kv8DCCsQABoMNjM3NDIzMTgzODA1IgzHKOi%2F0CgfWur7n%2Bsq3AMF9E8EzskEF9JtRdqGC6PQ1H0583Icx2X%2BJvtIdtkAk60HD4iQkkf4MjTS99cVVkknnxYwubMueD2snZPm1QG%2BHcTDbQrOc3r3FLTH6oEZ00ZhC%2BCncbpZOVbns2s6aj09TF45285sDZTTTX4YgUKjFQH9ZjKjusXnZbUBh0eB6hUgZI3n2tZ6JvccYiJxLMu6G6elNcJ5x2INO87f2V%2FLNTF4tKRidrH0bCGNPzFrEDZYK8BcyQLZptVLp2ABDgnPh0Aqm2eKmbc%2FWzMF9ktIfvUogyLLJDo%2F2qNY%2F%2Fg%2BkGVlUa3D1HRdX4M6KGtEjgip3OTDTfjHiuW%2BJK6ZQBjptmsmmJP%2FZyCMtJOUoCg7ok8l%2F87n1s03oAMhJmnkzIkDBplgsfdaF9fEnL4AOxESu337Loki0lVM24McXiVv4XjJ%2Fin8DeBepZFXCnLS%2BHFlWFWXbM8PW0TuIOfo4%2FxUamtcM2u0FFdK2QQE4l4hQ6d39FcBspG2ImoHrRp6QOqYkrBnaOyzACM7ROcUJVXfprEEHicROhkrl93x0U1FG7mj3hcCg5plsB%2BPE9yP4N8qoxYpxa3n2f8bpPwLZ53Rbp0It0up0qxrZQ2oS6Imhate%2BHEdeX6%2FtEeFjDClu9nLBjqkAdV3aAaR8nGdiN5wtFosxhMbdmk2W0bfIqMjAWQxiyvhgD%2B53jhW9AebITewZIHEAxI%2BwSOE4Ag24r1sUFp8X5kR1cl6OmMLKJpX4w0CCACrhUkw%2FZY5qL01e%2B4QgMbyrNwKHPY2CtwYhUQRN0MMfGGKP4LhZQSHyTOY0w12sYLflR%2FZq2AmgjcZRwWP0UGthe9BrkPbKHxuWSwZUXjtzn4E1lbw&X-Amz-Signature=076834e3e09851d84664a07e8aece39d905387542868eb43068323c8f1a272a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662K64FUBN%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQCYxbQP7MhKdao0IDikvwx0YaC3yNeuHeWL5yUUmQoc%2BgIhAJHYtypL7F%2BiRCfHYiLQfblCnT1iL2tR1MAIygHlKUC3Kv8DCCsQABoMNjM3NDIzMTgzODA1IgzHKOi%2F0CgfWur7n%2Bsq3AMF9E8EzskEF9JtRdqGC6PQ1H0583Icx2X%2BJvtIdtkAk60HD4iQkkf4MjTS99cVVkknnxYwubMueD2snZPm1QG%2BHcTDbQrOc3r3FLTH6oEZ00ZhC%2BCncbpZOVbns2s6aj09TF45285sDZTTTX4YgUKjFQH9ZjKjusXnZbUBh0eB6hUgZI3n2tZ6JvccYiJxLMu6G6elNcJ5x2INO87f2V%2FLNTF4tKRidrH0bCGNPzFrEDZYK8BcyQLZptVLp2ABDgnPh0Aqm2eKmbc%2FWzMF9ktIfvUogyLLJDo%2F2qNY%2F%2Fg%2BkGVlUa3D1HRdX4M6KGtEjgip3OTDTfjHiuW%2BJK6ZQBjptmsmmJP%2FZyCMtJOUoCg7ok8l%2F87n1s03oAMhJmnkzIkDBplgsfdaF9fEnL4AOxESu337Loki0lVM24McXiVv4XjJ%2Fin8DeBepZFXCnLS%2BHFlWFWXbM8PW0TuIOfo4%2FxUamtcM2u0FFdK2QQE4l4hQ6d39FcBspG2ImoHrRp6QOqYkrBnaOyzACM7ROcUJVXfprEEHicROhkrl93x0U1FG7mj3hcCg5plsB%2BPE9yP4N8qoxYpxa3n2f8bpPwLZ53Rbp0It0up0qxrZQ2oS6Imhate%2BHEdeX6%2FtEeFjDClu9nLBjqkAdV3aAaR8nGdiN5wtFosxhMbdmk2W0bfIqMjAWQxiyvhgD%2B53jhW9AebITewZIHEAxI%2BwSOE4Ag24r1sUFp8X5kR1cl6OmMLKJpX4w0CCACrhUkw%2FZY5qL01e%2B4QgMbyrNwKHPY2CtwYhUQRN0MMfGGKP4LhZQSHyTOY0w12sYLflR%2FZq2AmgjcZRwWP0UGthe9BrkPbKHxuWSwZUXjtzn4E1lbw&X-Amz-Signature=c937c64d492106ebdc4154674ca118b9077dce80f4d36691df7fe406cbbee959&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643QK3GUW%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCID8oY3BhEVQdzYgS3biL2jcclTSS9LhGTtnP%2FOWY4YT3AiEA%2BRXO7ceda8HIjUsYprGK2DRAoRJUL6j8k33fW2%2BKzcoq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDCBYDKbRTH9FoGDYySrcAwuMHSWMrWkefSYel5vvq5WJbp0zihOzXYGZm6vxl8mE51DxnMo19emxKlIOpH6tZmH5%2BuXEz1Fgo6I7cOB2MSy8zsBqgAomgTqvSeAc%2FAiBuQ5Y1eTKiCU0LLy3FDIoJStBYgVfZZDGQj%2FZZJ3h8BZhyxGiDNV0NHb%2B%2BOdxlKFhBFfHsXMPyCd2PClZtkEeYCNuIWTGZ4Q%2FJWia7Fh1hcrOCbXYkFsyj%2FSLBNa230Z1pzINb97DfOJ1M1CdmLy9OlrM9CZhpcoliHbeCPOihJ9hw5q1i2%2BuiH5a0virVJksdSFFPuD3L2xUC8XZtlQGRji3I4pD6ijVaqpq64DXWJsesofwCJJEkv3kA9Lk1fNcKXZdRg0WBXsEO0Ep6NxfzEbxQGn1cHesO8kCf3E8CNpPR%2FtGA7CHXhVAgaJix7hTJITDAFj%2FE4M9qnwWaxS92c9EwLvcdBwSZZc76dCjmZ8P6ARZuqDXPVV2FXsUvIvukf%2Fhr1EG%2FrQfhjeSZKSdT9flhgIKVOJtKFFgK10YS2Jc%2Bp%2B0ssZN%2F6LDhjJ5clamoRjLTNYVstpb09QFfYVAUVfRcVPFS%2BoewrEYiooYbWgkhfWW9VoeZrQ%2Bsf5fSYAutW4L5Cx4nf5S9wa2MOm72csGOqUBg0MyENaAZcMgOMU4UIKzJByuh6l%2BOOsB8Gi6qkpgOF8Dsza9NPuCz%2BBkzHB0bhuFvEHJeHmOj1H%2F%2FYQnsRnYEsAgstWQRzZ7ygFlB0TQtXrLiX%2BQeQ7e2nUekUz4fQ10BFl%2BHBQCECdaL%2Fsjfgg0m34Ei2RsKaWpu9YNeWnnOumwzmotFfC1y7jNucKa%2BkE7Ffs2ODIEPoGS3e8M8xsA41oW8Kt6&X-Amz-Signature=6adb2601e4df4a68328f9b4116ea866edf45228aec2a74441789c73d4656e0e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAHZGIXL%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIBw2zAqk4k3rznSF2tBX4TeB%2BmEiQHBtyna3Pl9hteXkAiEAyzHPMgh2RANX8rTZ%2FT9ypUK%2FyqNOh798lAtb4dRMjL0q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDNFe4DlGygHEFA9SjyrcA%2BVutaDUx7HFSJsxbRXtG6wouFMY%2F7%2Fb1yz%2FD6UtvAYlRU%2Fr9Nx1mdUKEQhOE%2FG6fpuloUDkhWFZRRm5bINY8rPCYC%2FgDGhcV%2B4c%2FsUFG0P6wmpeucT1o4%2BU%2B8ueuHfEAOspvFiSKs3vhJDKy%2Fvvw0AYNs55%2BH1bsG6jfP2NJ2vxot13MI8DvqNZ3onmKykup7n4yvc2u2Tq%2BIhUOXTkzVL%2BSF0Nqd4VjFv8uXQ9zzjS1IHR2DnqbgZQWAow3SetC8OZxzr7Qgpkc6WFamJMt%2B7%2FZ3bSjr2mmzGG9f3fyLUvTIUSOFYl9dtaG582VMYn0Jd2VEOG9AVzwGRaDyPeGgQSKoOn%2BIf4jPmiSNcECOUqyhU%2F620nFliAcc%2BU8VRKMXj%2BEMwPjzc39p8Ha%2BCKQUOr4ZXa2928T48e%2B5SeRw%2FXXOHeJap1vaMuMXuJZHoXW%2FJD7rupLRRBz7MTNsAitwDqYPmGLvN41y6N3x0urSBAVNVa2V5quFMH1TyWN0jQRk6SId8ipeR5JXVlHHj2cW1N0RSUtaKvh69ka15EMH%2FcCYaff7zax6hPStFYnBUuDPhnlxlNUyOXgbs0BfrmC5bxHrlJkJHhcU3jwdnoxzj3TIrUeaPQ96MFkMyTMKm82csGOqUBexAxPrlqEKePcms36W%2BfRd2Xu14DElZbDUHJg8LcUU5jRTAfGxRk3WOZtY13ojUwlha77pK1b5eTVuqoOzR8R4ZXDL%2BF7O%2FLjCQtQ6Pebyyzn4G%2FTwUTTDclVuxv4ySwq%2FUmdPAAxerTD48nC2DSbM0pYUVLXs2wJux0RPd2T%2B1OfFDLzMXkUKpkmCVxr9Sl2Mr%2F5tptXOb23GSG%2FH56W9WBy53E&X-Amz-Signature=a5d3cef100c18725b686f44430ac8cd6014c9ab41c62e1bd4afb3a4bbd3dc718&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAHZGIXL%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIBw2zAqk4k3rznSF2tBX4TeB%2BmEiQHBtyna3Pl9hteXkAiEAyzHPMgh2RANX8rTZ%2FT9ypUK%2FyqNOh798lAtb4dRMjL0q%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDNFe4DlGygHEFA9SjyrcA%2BVutaDUx7HFSJsxbRXtG6wouFMY%2F7%2Fb1yz%2FD6UtvAYlRU%2Fr9Nx1mdUKEQhOE%2FG6fpuloUDkhWFZRRm5bINY8rPCYC%2FgDGhcV%2B4c%2FsUFG0P6wmpeucT1o4%2BU%2B8ueuHfEAOspvFiSKs3vhJDKy%2Fvvw0AYNs55%2BH1bsG6jfP2NJ2vxot13MI8DvqNZ3onmKykup7n4yvc2u2Tq%2BIhUOXTkzVL%2BSF0Nqd4VjFv8uXQ9zzjS1IHR2DnqbgZQWAow3SetC8OZxzr7Qgpkc6WFamJMt%2B7%2FZ3bSjr2mmzGG9f3fyLUvTIUSOFYl9dtaG582VMYn0Jd2VEOG9AVzwGRaDyPeGgQSKoOn%2BIf4jPmiSNcECOUqyhU%2F620nFliAcc%2BU8VRKMXj%2BEMwPjzc39p8Ha%2BCKQUOr4ZXa2928T48e%2B5SeRw%2FXXOHeJap1vaMuMXuJZHoXW%2FJD7rupLRRBz7MTNsAitwDqYPmGLvN41y6N3x0urSBAVNVa2V5quFMH1TyWN0jQRk6SId8ipeR5JXVlHHj2cW1N0RSUtaKvh69ka15EMH%2FcCYaff7zax6hPStFYnBUuDPhnlxlNUyOXgbs0BfrmC5bxHrlJkJHhcU3jwdnoxzj3TIrUeaPQ96MFkMyTMKm82csGOqUBexAxPrlqEKePcms36W%2BfRd2Xu14DElZbDUHJg8LcUU5jRTAfGxRk3WOZtY13ojUwlha77pK1b5eTVuqoOzR8R4ZXDL%2BF7O%2FLjCQtQ6Pebyyzn4G%2FTwUTTDclVuxv4ySwq%2FUmdPAAxerTD48nC2DSbM0pYUVLXs2wJux0RPd2T%2B1OfFDLzMXkUKpkmCVxr9Sl2Mr%2F5tptXOb23GSG%2FH56W9WBy53E&X-Amz-Signature=a5d3cef100c18725b686f44430ac8cd6014c9ab41c62e1bd4afb3a4bbd3dc718&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLJF6Y7A%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T190739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQDVRdSjwSfCJexYe8I9vChlDwcFytJF8CdqtHXJ3%2B%2Fr2QIgHJ5h4QJ%2BGj4G959lD%2F3uAgOJTrecN26OgkrFPrxhqxsq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDLzEg7spjnsh7E3ZWircAz3ocMacbsUuGvlEJoctBZdsJtoORatbZxhEjnL0FncZTKyGe9AHmQF2otDlUPmPutldSO2XzQ0rNsc1FTvi%2BlkoB1sVAb8EOlG2yi2Tl%2B99y65EE%2BX2jzpg40gCD95xCjUYcx%2ByBggDQe9CbxxYHeReZQ8I4%2FhjAQCPUGBvG4QRfrrHkmR%2Fq3XKur2k8T6hwuFdJFXEhhermie%2B8ps76rRehgJaEsnqlF37iDkYiP58Xswg%2FCF6kz3hjVxorNKFKL1Cu1e4eQbm%2FLfpbRDc06i0x4%2BXexgbxpirbjKjJkauFx7ppgdeT9B2rl7JHk7x9oYyRLeZOjEadoA8n%2BzD0rIGUobrdUTSCdH2PRNZyjKr4V9%2B3v9moa6cXnkTii777I2cOjUdPRuLSI0jGUuS6i988VD60daOZ5RQMVBkAY7Mxz1k4LY1BpFEc1S61wLzqPCWuJlT97nDyHESOowutMR8erXJ9QPZQSZHbGa0j3urccS736QuitdzU%2ForHOuJHUHjq69qnv%2F9rSg1tZeui0xYLq4mp1vPPlKDWG7ZUFgievFxATVZMCcCvBRgdjtT3xPLtuSBp81uKqP2xDhLX5wzXNfAqzwkjXpy4c0S0ouNpPaM4WUHxDQ0suIeMIK72csGOqUB8U9gmpf6X4Zy%2BCzVjArCnh%2F9BDoSMXJ8%2Fb2R98jdA2GrWMb4YZKtKJSUiGEsCaQ%2FsDrz%2BlyzyCA1bVkjyKyW2SngZ5e3bpPwY8gunEYKEuRpN8hNjxmIfX63u0AaKX2QnF%2B7nuXdaBF%2B7Og67Zj5EligfNg2oZJHT%2FbIuO9qN3WaeRiwiyvjKk08MD3BapCxtScavoFDqN0koEqCdfFoW0HOLCGU&X-Amz-Signature=80948240bbdbdc5278ac1f2ffd30503172f19b8dd422bb80ae73b4c9f5ff6a82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

