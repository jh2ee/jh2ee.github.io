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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJUBJ3Y2%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZF5hWq9QhHMbCktMt70r8pNbeLCIU%2BMqdUsW4nAYnpwIhALHx7KSVwt8%2FtDLFbBuKHu2h4wQrDdVkWhLLgmZZZBYFKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy3BBWo9W6attXyCjsq3ANslt%2BVxw%2BtWsoQS%2BVeLiphkAZBnOsqhnsxf%2BXYlfXffhjV2s%2FOe3yyX82HjsGd%2Bnvj7qCJPh6aMuvh0a%2B09t3wLeZ23z7uW2pC6tPhyrygqJmWrjFiU6CpIeQGkEdP58VxJjvMZKiEA1WBmXRvkqFaYC197qMcLbCtmokeYE1ZUfz8Ynv6MGFG0MYzs3XSjN9m%2BdXoApQjfZkv8OBNZiUD3aqyUa2sL5qz1AtXlqEI%2FpCoi7WKsr7TUlIEqDBjiEkiEANSuSEr2idihrJuIJM3wu7rz3dqfJIPTEQMiy1eNfbrSCQ%2FJXuelRW3cryv44dxaR%2BUj%2BsQN0SlnQDgP9I4uM4cBvcn6NWkKzqdgNaMc7q2sAND9SCUR0nKBuZNUQ5KPmMkWFSj%2FGoi0hpx%2Fgrsgpg4tNmh0sr0Gil9guz8803YNiVFQMW5%2BO54PTcS9R76m9XifvvOIjZlzGzJvUviAzuoR5DBblqWb0kbM2BJFiDXDs9wiXUtUk2RqCzCMY9oCjaQG7CMc60yRHdTiiH%2BIgRpzbe1i7sc8rLR5Bm9qBpXmZmBcxLn%2BvVE9J5oh6%2FrCDCMFcdBpobILtYJd3DQ0CDKBsZiHHxW4BPxFNzw9eTKpUKQkelbXSAH3TDBkoDPBjqkAbuZzY1%2FPOSSFB0tSi0I4A78uxTeklJagH0B4%2FNlATnnAF4OUX%2Bg%2Bl%2B9gpLGuT3OU9%2Bu1UMeoM73AWqtHc6y%2FrvB0ftxHr13361qSuD3%2FzkwBNGafwwswsFHLqkYyGaa0t%2BnGOagk5YRZrCW3fE0ySNTMK5yByxqZ5OaTrk7PZkt136GZjdg4mRAolLwcjwNzWRi256YosC3nbUuaqT90sf9Hkzh&X-Amz-Signature=eafe2983c6eab7c72d3be7d34ab4c0cd30ad4f7ce00d956c73512fd7ec436155&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJUBJ3Y2%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZF5hWq9QhHMbCktMt70r8pNbeLCIU%2BMqdUsW4nAYnpwIhALHx7KSVwt8%2FtDLFbBuKHu2h4wQrDdVkWhLLgmZZZBYFKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy3BBWo9W6attXyCjsq3ANslt%2BVxw%2BtWsoQS%2BVeLiphkAZBnOsqhnsxf%2BXYlfXffhjV2s%2FOe3yyX82HjsGd%2Bnvj7qCJPh6aMuvh0a%2B09t3wLeZ23z7uW2pC6tPhyrygqJmWrjFiU6CpIeQGkEdP58VxJjvMZKiEA1WBmXRvkqFaYC197qMcLbCtmokeYE1ZUfz8Ynv6MGFG0MYzs3XSjN9m%2BdXoApQjfZkv8OBNZiUD3aqyUa2sL5qz1AtXlqEI%2FpCoi7WKsr7TUlIEqDBjiEkiEANSuSEr2idihrJuIJM3wu7rz3dqfJIPTEQMiy1eNfbrSCQ%2FJXuelRW3cryv44dxaR%2BUj%2BsQN0SlnQDgP9I4uM4cBvcn6NWkKzqdgNaMc7q2sAND9SCUR0nKBuZNUQ5KPmMkWFSj%2FGoi0hpx%2Fgrsgpg4tNmh0sr0Gil9guz8803YNiVFQMW5%2BO54PTcS9R76m9XifvvOIjZlzGzJvUviAzuoR5DBblqWb0kbM2BJFiDXDs9wiXUtUk2RqCzCMY9oCjaQG7CMc60yRHdTiiH%2BIgRpzbe1i7sc8rLR5Bm9qBpXmZmBcxLn%2BvVE9J5oh6%2FrCDCMFcdBpobILtYJd3DQ0CDKBsZiHHxW4BPxFNzw9eTKpUKQkelbXSAH3TDBkoDPBjqkAbuZzY1%2FPOSSFB0tSi0I4A78uxTeklJagH0B4%2FNlATnnAF4OUX%2Bg%2Bl%2B9gpLGuT3OU9%2Bu1UMeoM73AWqtHc6y%2FrvB0ftxHr13361qSuD3%2FzkwBNGafwwswsFHLqkYyGaa0t%2BnGOagk5YRZrCW3fE0ySNTMK5yByxqZ5OaTrk7PZkt136GZjdg4mRAolLwcjwNzWRi256YosC3nbUuaqT90sf9Hkzh&X-Amz-Signature=eafe2983c6eab7c72d3be7d34ab4c0cd30ad4f7ce00d956c73512fd7ec436155&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466573SL4LH%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNRi7mQACIMmLHt8TbsqE7EI7Tk9tCJ15fjY7OaJMhawIgNm%2FANH18tAxfxhrztJ6kM9eT1%2Fqqy8rOzwxWs5TTuxYqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGsU6211KlMjlFTVlSrcA9EoUJaNU6CYVfLCCwhOIkTa4VZaggLe6g%2BPnJ%2F4KKJ%2BmwaOL4sHK9pomBvTBsMGndUOPXFz4yqfd8E2pw6HXjNd8Y6EcprXDngL0M1J8xqeAHvJZJxWncKY54NNYG%2BWx4Tk0nEYYKdCQ09lJJAxfiS6vVp4eN8GFceiF5W0VZpOwmaETauiY7H%2BysT9%2FloNTc8l2LNXnlv%2BNqwt87urkokRtoUwMVLDVnWwnK3R3NlX%2B%2FCTA8KtPXTWE3lTcivPGlIQJae9APmjuA1vOizqehUsHfTNAv%2B6XSHJQpoOC4%2BIyNHjGuyqSk7aNHRliZigAy0l5p4jGq55HRNsv9xz7UkXjc3cfguXTGcZ7cpx6AX%2B%2FqWBRPzyp5tEn6qd%2B5z1YU%2FMJr%2Fvaz%2BbpTeF53Zj5G1J7JE8t6e2%2BtXFQlwkbnAzWM7BIxnbKPbgeRYLPwmNgEdVUkV7N1XFAE4VKeTbiQZLYdLQOR%2BHPlB6Ye9hEXj%2FVkyB9%2FDvSuxSXDnZdUC9Bx8gpn9Cm%2FJqdMn85v4Jzck7o75MGB42nBG%2BDXPWWoQtJoYQ352aGDShCLUkvjYRDnASJXQYqxS%2Faz5OTBNBjvNMqIeMNalan08WTeacQaMV35g%2FQRydYLYq%2BESuMLKUgM8GOqUBPDZFk%2BqiIP0O0eEvgVnw0PpJR02U4XGPdDSEKg2lsqHmQL3yGUZc2o86DzIovdbaJ0s5b1ek1RjHN1oj%2F173HcZwv3WiMTS%2BR012ZX%2F1LX0BcoRiwo0tS21PnDCFsy7FmQ2LzBQ3LOu8RQ5PHCRrvEKWkY478g5vpvBPHsaPFR8KPj3lPZjEXN%2BsfYb5GVaeh0saLialS3FPY%2BSazFGh2XMsPYOh&X-Amz-Signature=982614fd9d3da462bd54a0ab0770b17cd38689ce62c04138d7aac1e6a57b4806&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRL3KJXF%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICqM%2FXMMchTRTl0hPgndaMYxlYqImlBuqEwBXk3NBEwtAiB67XIzbUNJKZbHh7QCFR%2FfhzzubGPIV4vK%2FkHdNlx3RSqIBAiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMU2qt%2B6WKzFGHFDtFKtwDavnF%2FYMjSiQtwUvMM18uai95dwyVC0Tox%2FSInIhyt6gLVVrhdx2b%2BdPC9wO5BO3%2F%2BH%2Fp1gb5JcJHL7C%2Ba3E9ZaZ%2B8yuh2NBaSWEEvuybWkoap9PZysz87dGwcfyXiL5qN8spaK5ZHlv9drw6j0I40y0wP8ahRQXDvAulkSlLU3yLOztRESJJi%2FSSOJGw%2BX%2BfslCGYnyxJ79KVVwpklb7XtjDYqXL3ej8M1i1OWV2RnVjX2rEUogIu5B03b8SJ6HVvN09DsZJeHdJ5QtmmcD9CL5s5DDFdbLFgW4PuiZDPcUwJMjoOR3avEOB5%2FOKnWnEXvu17wG9%2FFqDLzdi1tgbN%2FEzooHwvwTnucMsQLtvVFS89217AgFT30O34%2BVjFPr8lYCzHGxXukebLNoSHaPwZD8SgBCV6QGVRBcQPsR0IG1HXlM7mnjlQuNcE5y%2BKLjNlIYvWu7j07iusaklBD48bxaGBWSLiG8GxezqcjDnovz4ZV0JQSOWuinweqCNQ%2F04hORk%2FXMSJrzPwdzEowjwXJzFMIJx12IqUdReuP7BYzF8AiXYJSmdAN7ytrdxXPSOCe8FCtPL2Rwo6ryrSVY9%2BzB3%2FmRYhiNu2vnw63M2PIXXHHc9xCctAYdIi40w1ZOAzwY6pgHLMe%2B0lQDr8vhQNt7ilu9TRCoQg%2Fuwd1cYnL91B3ccv71YX1UF7vDTD53Fhq2tc%2FNDs93TqqRoYLwglyRyLRFEL2VP6ANlxoaX%2BCuvDdHQz2cyawi%2FuNeVekr28a9O%2B8om09bcZb5j04dW%2Bm0u%2Fb7yXeeyr1jW2pMEc%2F5rttNJnNWELjn2Xs%2BmfejKWUyAmk%2Fg2KHVVkrcD5zHSY3oCtz231hJJ0ZS&X-Amz-Signature=4d63cf4700862d559aaeea3c1ec54a2cf6f506a2e65935523d37406aafee018e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRL3KJXF%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICqM%2FXMMchTRTl0hPgndaMYxlYqImlBuqEwBXk3NBEwtAiB67XIzbUNJKZbHh7QCFR%2FfhzzubGPIV4vK%2FkHdNlx3RSqIBAiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMU2qt%2B6WKzFGHFDtFKtwDavnF%2FYMjSiQtwUvMM18uai95dwyVC0Tox%2FSInIhyt6gLVVrhdx2b%2BdPC9wO5BO3%2F%2BH%2Fp1gb5JcJHL7C%2Ba3E9ZaZ%2B8yuh2NBaSWEEvuybWkoap9PZysz87dGwcfyXiL5qN8spaK5ZHlv9drw6j0I40y0wP8ahRQXDvAulkSlLU3yLOztRESJJi%2FSSOJGw%2BX%2BfslCGYnyxJ79KVVwpklb7XtjDYqXL3ej8M1i1OWV2RnVjX2rEUogIu5B03b8SJ6HVvN09DsZJeHdJ5QtmmcD9CL5s5DDFdbLFgW4PuiZDPcUwJMjoOR3avEOB5%2FOKnWnEXvu17wG9%2FFqDLzdi1tgbN%2FEzooHwvwTnucMsQLtvVFS89217AgFT30O34%2BVjFPr8lYCzHGxXukebLNoSHaPwZD8SgBCV6QGVRBcQPsR0IG1HXlM7mnjlQuNcE5y%2BKLjNlIYvWu7j07iusaklBD48bxaGBWSLiG8GxezqcjDnovz4ZV0JQSOWuinweqCNQ%2F04hORk%2FXMSJrzPwdzEowjwXJzFMIJx12IqUdReuP7BYzF8AiXYJSmdAN7ytrdxXPSOCe8FCtPL2Rwo6ryrSVY9%2BzB3%2FmRYhiNu2vnw63M2PIXXHHc9xCctAYdIi40w1ZOAzwY6pgHLMe%2B0lQDr8vhQNt7ilu9TRCoQg%2Fuwd1cYnL91B3ccv71YX1UF7vDTD53Fhq2tc%2FNDs93TqqRoYLwglyRyLRFEL2VP6ANlxoaX%2BCuvDdHQz2cyawi%2FuNeVekr28a9O%2B8om09bcZb5j04dW%2Bm0u%2Fb7yXeeyr1jW2pMEc%2F5rttNJnNWELjn2Xs%2BmfejKWUyAmk%2Fg2KHVVkrcD5zHSY3oCtz231hJJ0ZS&X-Amz-Signature=f37a3e72193f1f7541e4faa0afe12d710cde3fac8954eb5a39cf61fa2b1f89a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZYXOTON%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC5ldz4OVOkCsrBRzIV%2BvhHRxrc5mOkdmy24I0sBt0W4QIhAOHR5JYjTF777CihCN332jV2F3DEEcusyKZek3Sk2V1YKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxkoHNnYrWif1esmTgq3AP5m4AD10Q8kXl%2BoxlUgk5ZhhBZM6jTG2gW%2FtSxtaU%2FMh12PteyT8jHoQI9w9vwbUxzogszMXk51S87PgqPVGAQBEgZFesFsr7Bb9taALLC6vDT0N6r56J48nnLpvtJe%2BRSx5yN%2FlaZE59hRp1IASFg5%2FYte1TVeNE2yEKNcMmK13h4nP1JCB%2Fl%2BoTIdNmbvfFgm4eImRIgFoQkKdLnK0sMsoLNu4pjVzLuAaJ2C2Si9K%2Fnd8LtDXjId7Li7zt59KDR03g5dIY5uNYoCEl%2FgsRVkz7XFgZynO37dwGpMlsRRsDjHQB9t4dSQ9GR6coKAH%2Bqy4oBk9cfPYjJ8w2eFQOjYVdlrTGUjeGCLD088aSOrug5kZf3E5ycjBFPLtSSx5%2BOH18v1RBrol%2BIg%2F7mbgFtIuhKdU4qkZUIKyTX4jZ16tT032E4WuLqs5AzEjofxfLahG5gTsR5o9cH7Pkc5fR5DtWh6rV%2B%2FxE1moNZV%2BRPRU82faEZHLLd7dVJIPJiqdAbU137%2BEeJC6M8s9rOtE9gdM6OagI3CskdDvnSuQmnnfICp1AMUT%2B5H3JVCMHYsi02vJQRES0CLb8kP7%2BPfd6RCK9Z%2B%2Bq8yzLrzZ6RojiKDzU8sTcGdZe8X6UyUTDZkYDPBjqkAaktAg2TdV%2BumDSc006rF5eDgmMf2p2L198uO4vYUi53hZL%2BBjEgbam8yvalzeZz13wrweK5TggNvzFHnDkcBOT8u0gfBLTfDzSZAI7yGcQPlkkzSSkNzAKy5heONDJ2RiCQkmQi8VnWl6P3NRnPHuP25M34KcHzBLrJuvpEIwaS4mJ%2BmccMOYNQ5UL9JQtL12LSH%2BNLqH97cY1kL6xmoMcVMjIW&X-Amz-Signature=722c175ff8c5756df707c2f180613c7a8b41c4d802a76e204ebab935dc152d35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCC3UC43%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCANt9RFQEQ6uFg2LnLaLnCLApiByS%2F%2Bn3HpiNEoCDdAQIhAKIpB%2F%2F%2FkYzoLJx9tl1q9RWTKeWiwP6KPTmR%2Bm4UDPBWKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxLRatkROAn6KMUIt0q3ANxltH7zP0RFxmLVtnpHIT5SdzaVBY%2BuOpojXQLt8HEzvKN9JLgMoTMnOX%2BZdoefpOWEGuyt41fUnvRvfbBx7AZlUKxB%2FDYRi1Et32sndjgQpr7TWFTWSYKVopCXUFhYnS9ShnFmjI41%2BAIDT7SDK2NN2o%2Fc0fwI%2BcpABJdpMZB4Bs05iXzRxX4dRPXtLUutHuE8wrxnr%2F5Qirth8ZC5ZWf%2BA9jNesZwOQKpwbuHMYjV74L9BatiUgAK%2FpnIwtBfsKscD5WP%2FSeNaSU4Q3hbkBe0PA8Cfn%2FDGTbbQgxmvWo%2FZPzqu6EqRkzIcjz%2Fne6vynZYi9Uaph4Bto0QXUdq5u5uMg2LLm%2B9KjHoyGSEaAkh5%2B4QfPnstL9topbPLq0HGJEiy6Rf4qjIrv0wg5G2OQ2x08KMXMLXGgF9WhW3PSkia%2BgPjO%2FQWNKQT8PcodSVEAcVZtyAyIcbq9UhQM0pIQOUibyZ2sqkeCGzKPI7R%2FDzEbP9vr7WDvZTd8LsXC%2Fq4Ta3EkLufFrAgimdftp8s3nWUwnKEgwtSslgQAzgJlfHoe8PaijYGYQ%2FY8t%2F7BaATHmAeF7K%2BORFgiKf2Y%2BL%2F%2BOkFlgTWSTpAo7I64TIni9unnT%2BfsVyUBKrkfZ3zCFlIDPBjqkAUYK%2BckigRHAzAgXnWOSTnJHWZhxDQSjZNrb5YJ5k6ab4qmdt9xB9J5L8bRFs2I9pHgUm4STbkSEHxRN1DG3jQH7fukBvdHTD1EDoMDLZI%2Ba1yCzLBpnDvoRV%2BM3PPZnHjpoRHdg%2FbXxJLo9OEnc8QNHZXOe9kIuWKjJS68xp2nlH7np0eYTabVbj5W15zPrrC9aBOqfUmXcCUxpta6j10EMoQY0&X-Amz-Signature=29b631fae7640300dd9aaba8cf34c1dbbf2f38e6c7ccfdcfd13b0605f3b1eda1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCKCXMV6%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223023Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDHXITIV%2FuP%2FMv9gcDgTZaOJD3SMDHA0kdUb%2F4Kj6nDjQIhALqwJaMTApfEs017igtprMzz08fT1RKqWpl43thFY9cWKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3%2BBwiq1qZ47OAZ7cq3AP8cItbnAqWqWW1byk5jZgBDy9laHzLRUfYzjGfWt2%2FPp0%2FEkolP7VBsb6uMVEtKgsOqKe9CAbUIkoqXQFQB5WJelyQ5Oro3tSB6RlA6%2F9xE2NJ0Iyziuwbni8cJSZN0u4WboGYN2acMwtlWNTCNQ5jEFoK2OQzVbxFVUsEXy1S84qwUyM56Ed22t5v2T8x1RvInnRJctkPyZ8%2FGZW1WXko4v7f5WCHVq9VAkKpbxgLQQ%2FpcigejlUvIK2%2FlQ9vNcNfbVpRueGqnHSw3pn1DF8s9TciyMptvjTmeV7mVuI7RM7ASKCBQTNQ5iuQDpamQbTIkE%2FnMFeXG8PwDXoU82TkzQvJPYC%2BUFoL75lt%2FDKiziiRHRBe%2BWvIHvBQIG%2FWPE6khxsGKpC3FVqzXgMvPephH6tisfMppsdJsxKKfrnIF8ChwlpcbgmclN8yQZp04N54KV6ZVIpzXrwxoFxpIF3K2EqzomA2sMrOKt92XqDNl1cM8qI%2FczriFv0EP1eUAI8%2Bk8komsNc%2BWZ5sd%2FDwjqiULydFVnlZX9rOVDYDSU9coQ9R%2Fl6%2FebU1B3wh8piysaGcGxgfmda4c%2FpQTFYqM8TIQxyM1NwLbVm4lRUhkfwQB81sCZz2W%2BcXWs2HDCJkoDPBjqkAWdY0bbM5lMd4OJuoikWaKfQMcssg77BJt76tRd%2BBm7vsvt4KH9FWsS%2BbNR4aKmuCSKCPXK%2F%2FUB7a7cPS3lKQVMNKPBKKBQPb4Ja7S29QG9ISdItUXOjVEAkcgJyYQNeOAbrdRvPOd18kvlBx5dWlZE%2B685V1Dd27f1Xp6YtigtgEb6GmX8RKzaaWeZHB5JQPeNg0yXTohhbVgUb0ZeRKvowhqCr&X-Amz-Signature=a5245c1d2676b4a787212655692108b2499929fbb64673d0b04d69aff637e29c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TWVFUM5%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC9d%2B%2BpOzZxRCEpYM7R3jSdP9lsLSpqsFN5AEf8NiBXUAIhANPhfZ9hxUxW%2BBqeC4nJm%2FsOZuxgLFFWfBhoFjfiBjChKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwREHhuew7PzqAIrnwq3AMlcsNv5nvlvrQX4FAe9dhnjRwxsW9itbFM0syCOEve8YNPGaiiZNO%2Brd1Ffgao2tNxWYrH9Kn6ZoM8hLMvqQ%2BF9zMw68AaDdAzYz4dEBLW8w6DtjlEKd7y4W%2F0O4KBTS3PEX5u6b%2BGjWmTw11d4iZFB%2FbLCBpAhXxYiUr7TD2DJE4hbLDjPNqqpWMyRigFCNAdN7O0RawfwbhcXNamxJ9GxrH7YDFcecmE7YP8kRn9fgWmKHUE4tQCK4Qg5Js%2FhfWHEGzBwyg3%2B2ZvFh%2BZlnOzmUu%2BY7ysxowWVCqhXtWEX%2F6pUTndQeNPeSSeZz0dFqnmQ6Jr9f7vN1xMkX%2BZzJAAwpqRSeyDV37apuYVfpr6WhQvfeHAV3svYO5e55YyYRL3KVmqGnmudmhWUi259dFnRGq2nuSY6Gs791RHYqj0ei9N%2FnrxTGpJdKAmU9LxzE%2FXsnGpX4BmXSJKdsudThH8Ywk1X16HbR9FQZHaekCjhAXuSNUuep7gBx6Pxr7XMG4Jp3KJ%2B%2BKXyYHc7kHcZzDVz6NeKT7YbLCEUKTI0lzbotjLlHE4YcmVashz%2BwwO3exWDgkAdX4U9GiwV2pFy1zwd2csGFb9IKjZ7ljThUl5uw3QKL236LXnIP8dyDCulIDPBjqkAXF3ErGscJCgpoNlycs6LOXC7RhwzQMV7dz26Al2ZiaTFAJ1fHq7St%2BAA%2FNsnBAOVEQNMr8RodoiqqqqzjpSu%2BVKrx0f5TnIlVXmD5GTek%2Bxa7A7kQmN9HL9GIKfwagAuOwz0wQSLKboz9U8T8oranV8%2FJP1Yg2N3XzrjBI1la%2BPjHA4aDSFsyYLjYEoe3dRuy8bcPNxUDPVyGLbkx9nHFixgAqs&X-Amz-Signature=eff53bcd3dbdb6c9ab0fb8638539c7df87a2ef5f3b5b1c108bacd909e87ee6a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TWVFUM5%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC9d%2B%2BpOzZxRCEpYM7R3jSdP9lsLSpqsFN5AEf8NiBXUAIhANPhfZ9hxUxW%2BBqeC4nJm%2FsOZuxgLFFWfBhoFjfiBjChKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwREHhuew7PzqAIrnwq3AMlcsNv5nvlvrQX4FAe9dhnjRwxsW9itbFM0syCOEve8YNPGaiiZNO%2Brd1Ffgao2tNxWYrH9Kn6ZoM8hLMvqQ%2BF9zMw68AaDdAzYz4dEBLW8w6DtjlEKd7y4W%2F0O4KBTS3PEX5u6b%2BGjWmTw11d4iZFB%2FbLCBpAhXxYiUr7TD2DJE4hbLDjPNqqpWMyRigFCNAdN7O0RawfwbhcXNamxJ9GxrH7YDFcecmE7YP8kRn9fgWmKHUE4tQCK4Qg5Js%2FhfWHEGzBwyg3%2B2ZvFh%2BZlnOzmUu%2BY7ysxowWVCqhXtWEX%2F6pUTndQeNPeSSeZz0dFqnmQ6Jr9f7vN1xMkX%2BZzJAAwpqRSeyDV37apuYVfpr6WhQvfeHAV3svYO5e55YyYRL3KVmqGnmudmhWUi259dFnRGq2nuSY6Gs791RHYqj0ei9N%2FnrxTGpJdKAmU9LxzE%2FXsnGpX4BmXSJKdsudThH8Ywk1X16HbR9FQZHaekCjhAXuSNUuep7gBx6Pxr7XMG4Jp3KJ%2B%2BKXyYHc7kHcZzDVz6NeKT7YbLCEUKTI0lzbotjLlHE4YcmVashz%2BwwO3exWDgkAdX4U9GiwV2pFy1zwd2csGFb9IKjZ7ljThUl5uw3QKL236LXnIP8dyDCulIDPBjqkAXF3ErGscJCgpoNlycs6LOXC7RhwzQMV7dz26Al2ZiaTFAJ1fHq7St%2BAA%2FNsnBAOVEQNMr8RodoiqqqqzjpSu%2BVKrx0f5TnIlVXmD5GTek%2Bxa7A7kQmN9HL9GIKfwagAuOwz0wQSLKboz9U8T8oranV8%2FJP1Yg2N3XzrjBI1la%2BPjHA4aDSFsyYLjYEoe3dRuy8bcPNxUDPVyGLbkx9nHFixgAqs&X-Amz-Signature=ab3abc719567daf96a5fbe5f23a6eced7db8b8fa4ef04f526fc40104a64647e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOSRXGYK%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDpknEVrD89YCgvTwYED0J1j7ujE8KwhkLdz4y7BJvYzwIhANf2Pn9d9LBlHgBYkZ54hmXmBLp6wqAq3NprZFoUkZ%2BVKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxXLrWwq0TcrDGHxSgq3APaqgialLoutQm%2FgmZ946CXbyonYIxopHkjCYA2vXreyANHRGJC2VdeSh2TP8DYllOYnxFHMUkYuDXsljnyo4T8d4FL67JUIyhO6cVR2TwxuBFcPF7afa%2FM65DrmRUqKDVi0tjfQmbSDkO2CLx8XZv77g72o280eqgc2Y6VEv9fRCgNPdXAWvQmI99Zevr8P3QYLekMtmd9b%2BWve8EPYjE%2BKThfh2II4%2FYvwpJ9tFoISVBebTSe6r%2Fx7JzWXoneldwLgudFdZaOk1bb29hbCAwbTyYv9FdYtZIDqzpA5ASf579eEBSjSCXJ8%2BK6syt63MGQLTR9dW9yplBuyWK3Sbj6EEucns4veUDfgEvyEeeqETlv7N5j2zP7VmgyvyIQgH9dENPcEGU8EzcsBQkUxmapqo8uhl3SApuXZ89%2F29Gl3vMu3XB%2B6qISl2UXQzrXSNUetCrUwPplAyVBtkWgZeTgltxQI1dIIg%2BV%2FChBbajOjLQs2Hd5qbo9SWzUsnHZ6YhYKCODy%2F4z4Auq3llEMvtPOXWsq8qlZ93HSDb06V5r1VjHUUgTmk0q47pvytBM6LdNA2iQvvKOWcQgc8LAuKXcpkqBzM6nEtFnthQOKs1qOT83cdlZaUL%2BB20bcTDCkYDPBjqkAZA3PBaCGj%2BO7T0sZ1HvjpaZ55X%2Ft4MUE9W7%2Byj6jwG6WjzcOs0Clrir5vnNfRvsA3Jkgo6ybmfuJyzXBJoZGmSBgm6SBVTbldYihRJZHHzzMR8LDGlU%2F5bNPyVyieI81aRetqTDZGdoGSMKTUJyFSPKmEZcE1yVpGkDtmcX4%2Faoppr8afZgYXjfpHjI31I5hK8FkdJAZIw2ow2TpZPTbNDsbZ4s&X-Amz-Signature=16c710cfa061afc6a2ae152f720125ca36d8f36fffca6a6d3486b5c3b84ce9d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIY3I3CB%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCITZl6ZHeEUSipXVyplIQ%2FaV4MaKwKAyVeX3vglHLqIwIhAL%2Fun%2Bp6VXhU9y4GvWcMThwLxB4A0E5nSkC42f6am4LGKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1fX%2BEuuB0jirl0Pgq3AO3S5lV0p9JNBRRbPCBChnCyD9fleP6iRqjfKC%2F0rRimuR1QnlWuY9XpDHFUirlzswvfuXwLfVBxwuE3AEovk2wIhkrVhEp%2FEYbSi120k9ohgcZZWUE0rIUjcn%2BtwROTHH6bywdZ3Nq9WYc8jS%2FMdUT2i3Qte1DFIURKhCJ6Ig9iZ01ltrJ9F38tJsV3LyQmF9iYwmbtLnx63EIjt8UW87UndFLjSJAv9rt%2Fx0OlHyIEXS0jN6YsNkhq8mxOrBNIVvbhDj493lmNA9EG3cxn23UQlbPWK1obLNoxBPWU9pSqx2zc0NauHtA4pNXFymHweYUO20dgEJd7JEKEycZa%2BIyjV0V%2FPLnSnD2wtSNw0aKPDds9cCU8Hy%2Fjte69aHEt2cQQ9K%2BgmB1LNBjBTkGLPZg2yPefO4KOyRojqLamMvt29TPFkORtiyBv5wJRp8LgPtvWA2jW%2BGw34%2B%2BuD36zMeForQ8eEyufN%2Bfx8H%2Boz2dgnRQc2yM2XV4JPRRF9yx9E10batLsMpDN%2FzxUDJ3vMGLujODr4QivMjlfVZjRYS32AM9MiCiZ%2BuMPqeUGPA%2BvLwwNhGuR%2FQOWiJffgXB89ZgJVow%2FThcF2AZ9UqlAd1T7HX4oKREZyb7OpSMMjDtk4DPBjqkAd3D9%2FiloLvqKzcteHo4rMx%2BuBgXDwbqm4rwCLqJfhVkjTBk5YxwmJ2kY%2FFmtPu1uzo%2BxGNsp3pgHuFmcmrg8E8ybsUsNHJanL5ZKsuCgMKjF%2BCTkRYmqfrLble7UdN3IOR3C6RZl4egsK4VKgnN%2Fk8m%2FzQ5NGKdOmHg3BW4R2Fj1DhqIGDUmRnR6KIHwBLPED1Lo%2Fou13gn54EP%2F6Zdxu7H%2F56x&X-Amz-Signature=2e1ff2a471f05ddc98f6426fcf76a15a1ce13e497a593ae85b717634ec6ff435&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIY3I3CB%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCITZl6ZHeEUSipXVyplIQ%2FaV4MaKwKAyVeX3vglHLqIwIhAL%2Fun%2Bp6VXhU9y4GvWcMThwLxB4A0E5nSkC42f6am4LGKogECK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw1fX%2BEuuB0jirl0Pgq3AO3S5lV0p9JNBRRbPCBChnCyD9fleP6iRqjfKC%2F0rRimuR1QnlWuY9XpDHFUirlzswvfuXwLfVBxwuE3AEovk2wIhkrVhEp%2FEYbSi120k9ohgcZZWUE0rIUjcn%2BtwROTHH6bywdZ3Nq9WYc8jS%2FMdUT2i3Qte1DFIURKhCJ6Ig9iZ01ltrJ9F38tJsV3LyQmF9iYwmbtLnx63EIjt8UW87UndFLjSJAv9rt%2Fx0OlHyIEXS0jN6YsNkhq8mxOrBNIVvbhDj493lmNA9EG3cxn23UQlbPWK1obLNoxBPWU9pSqx2zc0NauHtA4pNXFymHweYUO20dgEJd7JEKEycZa%2BIyjV0V%2FPLnSnD2wtSNw0aKPDds9cCU8Hy%2Fjte69aHEt2cQQ9K%2BgmB1LNBjBTkGLPZg2yPefO4KOyRojqLamMvt29TPFkORtiyBv5wJRp8LgPtvWA2jW%2BGw34%2B%2BuD36zMeForQ8eEyufN%2Bfx8H%2Boz2dgnRQc2yM2XV4JPRRF9yx9E10batLsMpDN%2FzxUDJ3vMGLujODr4QivMjlfVZjRYS32AM9MiCiZ%2BuMPqeUGPA%2BvLwwNhGuR%2FQOWiJffgXB89ZgJVow%2FThcF2AZ9UqlAd1T7HX4oKREZyb7OpSMMjDtk4DPBjqkAd3D9%2FiloLvqKzcteHo4rMx%2BuBgXDwbqm4rwCLqJfhVkjTBk5YxwmJ2kY%2FFmtPu1uzo%2BxGNsp3pgHuFmcmrg8E8ybsUsNHJanL5ZKsuCgMKjF%2BCTkRYmqfrLble7UdN3IOR3C6RZl4egsK4VKgnN%2Fk8m%2FzQ5NGKdOmHg3BW4R2Fj1DhqIGDUmRnR6KIHwBLPED1Lo%2Fou13gn54EP%2F6Zdxu7H%2F56x&X-Amz-Signature=2e1ff2a471f05ddc98f6426fcf76a15a1ce13e497a593ae85b717634ec6ff435&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DR6OTLN%2F20260415%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260415T223030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFk1k1qUFViUgaX%2FIy%2BkBGNSlvHJPizWuFlUoC%2BsARTQIgfJAC0jiS%2B8IryIK4aDnJ%2FIXs3kAZ4BYpQ7ys9VZBiBgqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO43BUAsVgk24%2FkPxyrcA8gHEZqcsNIaJsl%2BVNK5Xd9QUVjYN3b9ulv1OVlPn2tSBv9MX%2Ft7Y9yhp8Swo6Cv3BlzRKZtQr4YyiwgnwZ5vLjNLb7ULz9Bh5bnIVVjyfujIUGY49pFlRnHhhOaDwgJyQPzICNMCiv9y05JgzaDtBN18zAiPoMlIyw8T6km7ZcAc8TgrdjSikZXHw%2B%2FIZgNC0067zkRpSBEJtQBpPzoVRg9fvSEZteRKt8GxJrE0FQlWBWe7wdGi8knuJF2zhLif5lEczNi0AIHb%2FvGYg%2Bki39KXpI1LtgH6ZGSqjU8dH2ZXOr8EuOSuUePtmrDX64YkuROAF%2BtqaldZtfdPCbC8ODIbZEwu6PMht6XZEgtxN61kGAeCnJBBT6EkmTN30os7poBT14q%2BY2PI4gDbOfcnbefX11FQGY%2BtShz87dsZ89fy4udrS%2B1Nuo8IoHfKWtiM33XcbDV4JH4Zj7DqWA21KeMfGuCVYDSTBti1baR1LqJDaOTth6XlhBN%2Bxgg7lINnNTTTg8v0E370F8gYuwTudqwWqFpmcViQqJzi2PQEvllVi37%2BNjW714zdzbVRM0vqI3xLuUhuWKhASHqh%2F%2BOKTFLtokmvAykhtWCNqZCeWSfRCUfh2Hi6SfRUqCHMPeRgM8GOqUB%2BCbk9Bq3I7TLOewJSsdFhxdor74v8f9JjpFMsYCUmH0eUn74gIpXpPOqCRDtD5CvcDhpzl5e8SBFFtxofHu6frmenqHFyKTYZURwab3k27Gs%2FzsK79W6cijsi2MAcVUwQ6r8HHdc%2F39ylFeERa9pHxyQB%2FlmonV2Y2pMe31Llo48Nz%2BQ%2FgkY%2FOtb7DNh0SZcFyt6XFNRUa%2ByZpNz5cSTCE%2Fe0Dbf&X-Amz-Signature=d411d3693969db3f4655c39c3904a88bccc22ab1c3bba0305d6ccb4211a1fece&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

