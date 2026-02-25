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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIVWDJL7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQDvklvl5WOja0rK8jgSEob4TuyKdSpniOQlHLYGin%2BtfAIhAL%2FxWeqVVtwwJUSA%2FsxINpBjy1%2BAl5U6lxULDue%2BTG1kKv8DCBEQABoMNjM3NDIzMTgzODA1Igyrrc%2BxOyKv0ftwsLIq3APZGot7ICtUkWQMjOQ4Y2yyTd%2BBEB79GyRt2yKpfFz02WHASTnPWiscBPBA4aMUB7DHjd0X91kftpVwJULLGEzu3fJ6Y2yFClSe6yyRj7mAj%2BTRDQwlC3W7DQSyES7mevTxDBiSLuSYMXvasG%2FZriQYjffWNaDi%2BocBfu7KQylvpeiuPooa07o7vPO7KNASkR3p4iDJLUEM%2F%2Bj2a4dE2KUtBfe2YRgFNWD2tj11u5btbp94zlGO8sjzO0eYIuLhEchsezBmk7xMKxizH3nXmDbuTYCIEeYuKocpNCRxcBBSAlKFgmtzittX9xV87yy5qMFtJ%2BU1blUURQf3i3qwiHwU7J8wOE642Y31LrPOZr4e3kEqu9u8YCN8mUsNH0Z4c1lBoME6KWZKU6TegnFRQ8IGy5I%2BSvxt%2F3N4YRVfzUCkrex%2F2QJpV11OjDnaK2NCl3s7gBuzxyBx0PjWSaB9lvibSchj5uaPQtIX4mZ24014oN2sulaGSiiSvoAKedIdey6v%2BHGMv21I%2BvN%2FZL5UGtAvgKCDo%2BOhEUnf2BlJHw8BKMeuaUnOda8JkQnqIav58jHvV5FzSixu%2F0JuqPuTOAAt3lOJ1ECYM5Nqoc2ElU2R1JN3oCNfKyitVxfiujDAufzMBjqkARy5MOWPeFJZf%2FI1WpyL%2FzUB5b6KhWZPtxqgrBmKqUNmjMf6LxmMF2TGhWrffqvhMVnwxaIOj52GQtWzUP8hK1qlJVevKDr56ks7%2F%2BFmYYbkQNav%2BzB%2BmzewIFPMMruAKEaIUxIVhh38rPg3XeiPXitb47h7VrUrW3GrbfcUkk2Ls6WjMHkVsDGm7%2FasRoeyb7HtEQ%2FmoZvmKuMLPGYQ64pDfN7M&X-Amz-Signature=814a27e602a5c3f86bb508be009101c79db7fdd00128ad805bc4a9a5a3a0f517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIVWDJL7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQDvklvl5WOja0rK8jgSEob4TuyKdSpniOQlHLYGin%2BtfAIhAL%2FxWeqVVtwwJUSA%2FsxINpBjy1%2BAl5U6lxULDue%2BTG1kKv8DCBEQABoMNjM3NDIzMTgzODA1Igyrrc%2BxOyKv0ftwsLIq3APZGot7ICtUkWQMjOQ4Y2yyTd%2BBEB79GyRt2yKpfFz02WHASTnPWiscBPBA4aMUB7DHjd0X91kftpVwJULLGEzu3fJ6Y2yFClSe6yyRj7mAj%2BTRDQwlC3W7DQSyES7mevTxDBiSLuSYMXvasG%2FZriQYjffWNaDi%2BocBfu7KQylvpeiuPooa07o7vPO7KNASkR3p4iDJLUEM%2F%2Bj2a4dE2KUtBfe2YRgFNWD2tj11u5btbp94zlGO8sjzO0eYIuLhEchsezBmk7xMKxizH3nXmDbuTYCIEeYuKocpNCRxcBBSAlKFgmtzittX9xV87yy5qMFtJ%2BU1blUURQf3i3qwiHwU7J8wOE642Y31LrPOZr4e3kEqu9u8YCN8mUsNH0Z4c1lBoME6KWZKU6TegnFRQ8IGy5I%2BSvxt%2F3N4YRVfzUCkrex%2F2QJpV11OjDnaK2NCl3s7gBuzxyBx0PjWSaB9lvibSchj5uaPQtIX4mZ24014oN2sulaGSiiSvoAKedIdey6v%2BHGMv21I%2BvN%2FZL5UGtAvgKCDo%2BOhEUnf2BlJHw8BKMeuaUnOda8JkQnqIav58jHvV5FzSixu%2F0JuqPuTOAAt3lOJ1ECYM5Nqoc2ElU2R1JN3oCNfKyitVxfiujDAufzMBjqkARy5MOWPeFJZf%2FI1WpyL%2FzUB5b6KhWZPtxqgrBmKqUNmjMf6LxmMF2TGhWrffqvhMVnwxaIOj52GQtWzUP8hK1qlJVevKDr56ks7%2F%2BFmYYbkQNav%2BzB%2BmzewIFPMMruAKEaIUxIVhh38rPg3XeiPXitb47h7VrUrW3GrbfcUkk2Ls6WjMHkVsDGm7%2FasRoeyb7HtEQ%2FmoZvmKuMLPGYQ64pDfN7M&X-Amz-Signature=814a27e602a5c3f86bb508be009101c79db7fdd00128ad805bc4a9a5a3a0f517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBCIXFND%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDJ%2Fnol4MpOWdshW2EzU1Gjvo96XsyG8U9oGevPP1OpCAIgTtVhQpV21dapRkN2l0cLXuYr8pVb1S%2BVYQ8hhUsPGEAq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDKAXVEVc5WcgyDYIPCrcA66yjZwatMLu3a41VT5yoIMHVIMbud%2FBoMXfeFBEctZdmxWNMTcu%2FUrYsinZUJDHVeeLkY89JFvAcJcQ%2FXcDHZI429qFyXj4Ujde2Fbbhohzzyihlq60ZwO2zqKZKN%2FTliAW7L3FiJdsoP%2FcBkzau7DWw2lC4XNw8txu2YEgBy%2BMBhllVzv88Wq1GPCoRAvNNGeqcTz4toY9BR%2F3xImJ6LbwQzu0b%2FS%2BiGlac6so%2BCQ%2Bl3rcgGBk9os0a0J937h8JccSsCwqFKkFCVbZxvve7cGOjYI91CGv%2BOexilTjeHnVvKswunUrDr96Z9wGjNubdXstOQ6cfLAiAkE%2BdSvotHrwXCSy7nM57ZY28lKsnOm%2BKWRcjpYxEm43U%2FL9%2BwKYeRxpUCQemTTBur8smat9O4JTlc2JrxqtC6CSraofYtJoxuQnvfjpekp01vFQdaWRgMZW9Mpz5IOOCyInc0t7V%2BzUf29VyOo%2B9a%2F1ZslrI6CltOR05tF3RBw2oV72xNJB27nsVjOFGKGz9ieEqayanmz97s8A7AYWA6J%2BMCdVGRzajooRLTKwCnUdcAxpN0at%2B6BuE3z15nStHszUiVUzXiDoekypiG3sBeaTVN1G08ajRgZTydpwRpKRiQUOML%2B6%2FMwGOqUB8krjVAtnM0RvGA4HY%2FKBZhXA1vEDU0wiTRCEVyMx%2B%2BB6782rl%2Bvz4u684QazwqeRVRFUBn3fCjEkoX01BEqDelj%2F%2B6%2FjQ8e2D08fgixMkOklY1qFnLHfsk%2BrY1IY8zzhCraALhMmvni5mYzi4bKUg%2BtA60FDcMKeS%2BVt0FgnGN9NflM%2BdfTKuu4MAecg07nu%2FTvP508%2BbY9P4uOZPdKmtUq08ELk&X-Amz-Signature=2c5c7171afadff7e93220b41e5c1db160d76baa97f744ba1ddcad2a871d8b783&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KLHZMSU%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDBznZSobFFHF%2BHRjcVzQqyX3VUv%2FSiMRR%2F9Tp605qK5gIgVWW6BS2kcauzXTz0WtB0g31e1HRTu8xCvfLBmAtZ5vsq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDPtlvdTuaaQfceNP0ircA%2FpW%2FH1Z%2F0nHXMSb%2BZ1w4xFJq85Q9augLnanTtkL3OhNnS%2FdJcNQbQznV1xWLZMJFyBVFH9inohkTmjKNzUuc4ZApjVHVwKpZhQHtn2WEA%2Bc2E7NZtn%2FDANA0vF1DA0p%2BW2i%2B2LxNrOpra0Uv2N8hv799B3rn%2BjDVL%2FFWMcHm1l17OZAWUXezazZHEbAPTcPuKEUXw2Pq%2FnwG6VQciN31oIG67xRufpeWAGSNzxF8pbqd7g%2FbdK8q09njmHEomI1NFJWNqR04eOR5vIA3DYECYceNzlFn%2FU36N6HqJdw24ZFHQby3VCXOvbady9Ua9qPjwoRNZVDn%2FgL6gfI5qePcUYzz0pBOFTYT2%2B7e1%2BpB3AthtMOqI4TmM%2FPfdvCyUL3g5cR6JrljGq4ZQ%2B5C%2B6jMBAeB9QxzC7H2KLaZKe1kJj7s2kHNpomnPI0kfbCYqLwNiFUmRnCeI6t9uKnTEfZmcp1ATzh2tRNEvuQPaGZnuQ6B7E9NjVbz%2Bj2X8zID3PyUpIzIwHUtMcYvC0o%2FjkZ0v4Negi7aX%2BHJ7EGsQSkNa3czEUEROoV2%2FyJXkVMn4zUb0LR1FXkW9XB%2Bk8bU5iG7KsiuTOqHtOzmEapimyo0C8K%2BvoGNyPUBPPZF8HTMKa6%2FMwGOqUBagCkfEFniIa1pU6MU0%2FXjOpvLH7%2F19F4TtOdqRK7m4J619sLMnzHGJg%2FpWiMKpgB0V5TGlGfFd8Epfz2S9RzkLjaN7pc%2Fj5LX4BVbXDgrBASm0kPjDCfdGqmkf7ZgJTOYEmzyRDxA1JBUFoMAX0Ig2DG2jspTnPrElKIw6eWdPOtRNvAyjbuRVtxdMvFAZx0f3sewUAZq%2F1fZZK88OPrN%2FBPPVCz&X-Amz-Signature=1e26eaa9c2b91196c9fb920f188a3439ba5afe7c7489b2ee573a8869e2757522&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KLHZMSU%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDBznZSobFFHF%2BHRjcVzQqyX3VUv%2FSiMRR%2F9Tp605qK5gIgVWW6BS2kcauzXTz0WtB0g31e1HRTu8xCvfLBmAtZ5vsq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDPtlvdTuaaQfceNP0ircA%2FpW%2FH1Z%2F0nHXMSb%2BZ1w4xFJq85Q9augLnanTtkL3OhNnS%2FdJcNQbQznV1xWLZMJFyBVFH9inohkTmjKNzUuc4ZApjVHVwKpZhQHtn2WEA%2Bc2E7NZtn%2FDANA0vF1DA0p%2BW2i%2B2LxNrOpra0Uv2N8hv799B3rn%2BjDVL%2FFWMcHm1l17OZAWUXezazZHEbAPTcPuKEUXw2Pq%2FnwG6VQciN31oIG67xRufpeWAGSNzxF8pbqd7g%2FbdK8q09njmHEomI1NFJWNqR04eOR5vIA3DYECYceNzlFn%2FU36N6HqJdw24ZFHQby3VCXOvbady9Ua9qPjwoRNZVDn%2FgL6gfI5qePcUYzz0pBOFTYT2%2B7e1%2BpB3AthtMOqI4TmM%2FPfdvCyUL3g5cR6JrljGq4ZQ%2B5C%2B6jMBAeB9QxzC7H2KLaZKe1kJj7s2kHNpomnPI0kfbCYqLwNiFUmRnCeI6t9uKnTEfZmcp1ATzh2tRNEvuQPaGZnuQ6B7E9NjVbz%2Bj2X8zID3PyUpIzIwHUtMcYvC0o%2FjkZ0v4Negi7aX%2BHJ7EGsQSkNa3czEUEROoV2%2FyJXkVMn4zUb0LR1FXkW9XB%2Bk8bU5iG7KsiuTOqHtOzmEapimyo0C8K%2BvoGNyPUBPPZF8HTMKa6%2FMwGOqUBagCkfEFniIa1pU6MU0%2FXjOpvLH7%2F19F4TtOdqRK7m4J619sLMnzHGJg%2FpWiMKpgB0V5TGlGfFd8Epfz2S9RzkLjaN7pc%2Fj5LX4BVbXDgrBASm0kPjDCfdGqmkf7ZgJTOYEmzyRDxA1JBUFoMAX0Ig2DG2jspTnPrElKIw6eWdPOtRNvAyjbuRVtxdMvFAZx0f3sewUAZq%2F1fZZK88OPrN%2FBPPVCz&X-Amz-Signature=b1ef9b3d527dd9ca41e2c8ea6d9589ac894ed9709b8ad09ab95e2be79ac1f5b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VCV2SQVK%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIFIngM84JmR28KKi6GTwDUtqd29mdsLYo1cDyF1P%2BAesAiBtMrovuKqAHmBAKb4cvr4XKO21N2IBZq45%2Be9FN3SoJCr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMT%2BjlbpjA7Mu73SSOKtwD4ndRbhmgXRvn60dMpwy%2BP%2BgZyw7jcG5ysj%2BnM66Ggh12DNApzyi3tJLLIq%2FxOHS4CgL1wrvRV%2Bt2r3SVli6Uxjl9NaWIbZn3mnwoPxq5%2BqNQCpHte%2BvyVhEWObWGy5Qvy7hhhW%2FvmDCmHabOCuRguHzgvVRVAcIa2GZ9bMaHMECsgyoainlWohtXVSNo8anUChFef5ttst%2FFh8cDUnPooAsPImaaf7ZfrxJ7xcCqRzXtZluXaHd1TZNw0lRpG6%2FVZJNTsEqGMMCbf5oWh0%2FtEidYx%2B8HcCe46jubSmXIjOeRYXB6FEpUs%2F3I4hfQMfQubT%2BpUKOeFMlEWa032wovZfbh%2FRc4yLBSnDDLyKK8Mj3kmsbhYvLtBj1mCh1JXBP2oCt7YJkaybZ934pk3k1Q2WbaKcwwfLfbc6X67OKHS4KfZ3aHjKwZWlFYgigcR%2Bbj0u12Fiak%2Fheyd5Yih%2BvAThlU6l7a6SXBVFaKIzvlfQuc3QhGhHTKhTsNnIfCmGxiCrCGjWEKKcObWEU5V1LthzJHBCLfL9zbEKEITWi1dond0yUXdf0%2F3S6b6tyuasg8p8p%2Bm0ENk8UoPD5RN1xRXbbTGp1vsl7PzAObOOyuv%2BC1zMsXNmf5g3JUo8wwzbr8zAY6pgHRSMizYR4kJngbLFMh2zzcuRXacPKr9KcQlnhvwKpevPQHroxIULImfSvVAJJWKsdbGoy3TKYwv8gaNm7n0S%2FEqg3Nqb0wNP4RBLNblZHu6ROTbT4r8fYLDDlroVC4lBySfciiHQluTPdM%2B2RhTLmi2We%2FlYzI9JAttkPgzg78Z2LeuwkwhIWBgBoWROJp08CZOF63v2WSNh2Tz8sQE%2FahWjuZP6Bm&X-Amz-Signature=f5bb980c1445ff043c886539334dfca6863f910a4ef06cd39e6edddfb8dee114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWQQLQNF%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIDBq%2Bz8pWg8JRE%2FTtsHcT4zRLOUdsPhPHyW6oKEyTk75AiAwCwU7U7OYCfFQXIc1HPwYOvbdTgNOWF21gNZKqVpYBSr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMOaJNu529B94Zem2LKtwDSdeX%2FH5iG9B6N%2FYQcNEvLg55kWXOEmK4cxkncErHicEJHFA5TGRG19dY72whf14pzkz6Ex666bIyb9J5sQY21%2FuVLnRx5nTScZJRWOOr69e0v3hfBWI5a5WzD703eoQuc2ckrucJfKA5mzS%2BzQQBKhxSxnCEhoFAmL83xJSe4BQGXriOmtafaaQYSPSLTfUHaWe2W6oa4KlrP70fBMqf6Mp6NxRwVPNxpN89iVocA0wcDYXtM%2B6KQBXXh5Zgs6jDPIMG7%2FUbE3TTklj%2BO6KBwdczzs%2FThUA83way1sMTeSNXpNHZUnKUvCRDbk2YK6Xwk9%2FVLikGq6tSY0Q0HrIc6VGNk3uDrM6mZ2gs0oQSHOP7LwTMH04t6KF4zURRvRJ2MkQJltq9RgJu3tW2m5UOu36ds4CA6z7FDqkJjAc2kmVhdScWdnM%2F8wAAytVLQey1Q%2BnU4Th0rW%2Bm1siNIl%2Bi0YqqypNQaBt4JBtvJqZO1PeO9RNkMNFl3wHmxFvyOE50JnAP4zcyHZPx0yLrZtnlnjeFLWeF%2FPUjW511%2Br2RuIRzihTwvwnKbrExxYP7clwibQFKdBIuhA72L5ETI6pptqnUHEj31QDkOp6kHmY8nwHip4F6P1c2GIdD7Zgwsbn8zAY6pgEknVcWzDpSBy8d2JuhWW7iTIam7KdMvGpR3vobHhOnGGv0bk3IW4MvmFxoU6yzlLuAM%2FpNI8W59rBv694E3SK%2Fr9CF9onUhXWmyyxPRxistOrvVw4RL1z34Yaz5X7cStmtgDYMT%2B8FBld1gVuqzfTsL2FoyhomDpUlEv%2BNP%2BZtwIDsqgojxw%2F2Kim7dwEyzh%2FBdbs82cx5YLYe2VnPAZM36Z4eT%2BTR&X-Amz-Signature=ab108e8ecd5510f6efeec5478e4ed20c18e284394b06f088ad575a41e31c098d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5DF5QZM%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQC0ybZ4VJqxJa0RA2SAjACYLDl6mzcdVd4nqiq4yq0Z4gIhAMDclfNQcWAlmM7KZLSuFGJ2BnPqHTxA7qna4N8bbkHWKv8DCBEQABoMNjM3NDIzMTgzODA1Igw5i8hkx7w18afjTNcq3ANqwxcYPlR5q90a5Io3iNcbj394zyYAo333hTSyMmOES3JQ7YOsK2XIlWuhBUQasVdC80h%2B9IMzID8QKFQgG6f%2FYqdFoyN7ubfELKDNGOAiHB7lI2gJx%2Braz1ENdl6pnSv4kRS4TNpdMKWFP%2Bkl4h3UIbZxlX64yyMnSez%2BFoY%2BVYR9CIwI1wwLtoBS%2FcF1gZF%2FwnyG%2BqGc%2Fd3rQdTtqCZrWuc99SgpjGJ%2F1eCrgHd8ERcWP299%2BbIZsVd2piQg4T%2B0h%2BMjxheOp%2BOK2ioC0MX7d%2FPb2Vr87Rke9QWk4VxhLOdfuGJsvc%2BslJGIJ%2BxiPxBFxk6G%2BCy5PaB9Y5RdaRQRVrHrVm5UURMs0%2BYRIlIWUnx6FHhCV2WxIJKqrZzASddOBb9ZSB1pRHO1EJM%2Fzh1C4jmUZtQPVsTSuzhFBDiQXIunz9MbUWtOQwU%2FcraVB9xDrZaQwFYwWCeWl0wzkdZ%2BHGisCPClvRT0gJfcdbfFrN7s%2FVcNpqz3kczeqQ80slKf9wpGurrcdXkIOaEeMlLuKxcIjHRP5Rc%2BWSXo%2BUgfPJmBAYwAupC%2B4pR3KKGSupQq4dkGPRHyygoEUoMJUj1jyXZk335%2F62UOh6UNvYfGURwoc4LkNdnyyAnzZzDWuvzMBjqkAXnQtnzFMPu9EHzqr6XRqx06DOfTwMtUi5c9x7A6HTM14hP7zvEy0V%2FXwkzn7MOe%2F%2BFLkooW6%2B7QQqlpXOpt3bqjytrGD5qBJhXm9aFNfbs3WhKjzKHJXj7SlFzBJWpwv3LmWpYZlfiJ1x6L8NPEWfWIkuAHsX94ZyQnuJ%2FaH4YN1V5G5BdXZnfkZA9x1NBXhIBDwbgprhXPtwVMRa456khDNn4s&X-Amz-Signature=cdb9b56159abd1898568420a05a8f39fa407e0267f0910977601592ed513597b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI5P2G5W%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCknv9yB1TSUhfqDPzBpZ2AsIdlrM6tA9vQ0XbkmDOc5AIgeEayaJBt1muCRXpawlKfDnzBv8oCSg7iERF%2BswdOlDYq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDBM3uii1RDOOGU9LMyrcA1UHzpS%2B%2F2Mm9N9SQv1S8qG%2B%2Fn36X39D9zUleY8eoJcKlH%2B0KvKqhy0sjjrEWZBDBX11grSVEjgh71w%2BZ5JfM8nXQLWpC3shSskntmC7PTLgLS3%2BhnuOhXVM0fKDUrVYQ221ofHM2Whzn6K4AkBhTXM5l%2BTYVFYKpCIy3lTkTcyWNlf1RFB8SD3c37vod5gONT40SgKpiVj0K8BWvgCoMahCistiGEadI7fblFuTDAQG6G8ds72myLvd8Fl0VkHKkhRTZ3kEXOoZX3RDoOu%2B25u%2BGXWlaTVBpVk1SfGeYXF0UZyudmuse2M0ApAtr2org88VmMKJvjeVOOIIO2sfirek8lPPYIHzhb00ZssGXJtr%2B4%2B3lYczjEMnqd7u4nSl9bU5XOxiIEyuGpsHH1YEdpiY8pYvqvZJJh%2FRc2PgviNyZ91tFHMphHBAJN0D3I%2BWx%2FTpNwD2r6224hAgKXC9tkJqIUoZqIM615%2F%2FItWpCTFt4cwVEiisJkqrk1spdW9qPaBRNJe02sUS2gGgfqEXTgnL7m%2FdfISF3wUMT4EEQTcVBiUnLwFKw%2Fdh1xJZl5CPkR7yH7ygJBno5qMPyXCBrKwUReQs4I3vUCaKlAvG%2FHktfHLTAycWhMSnlisQMNW6%2FMwGOqUBTvNWenxYXGu8T85D15%2FBI2qObJt6KK7ReQVlZw09KSAUx%2FFH0EzTNJhVgbidloGsHUa6fsp9OggwGgRSskQMp1PabuNzdZt0D0hZIEeaTVNrWCl7vNhsU19aUAcNb%2BKf1TeupcoUEjyw5JKjLh0v%2B8HmdQNlFHA3iHVYx8UtmXs59g938vb5T%2FIoZUvPSODuRxlApAjzf%2BY9T0ik%2F0TK99PADLvy&X-Amz-Signature=4358306d274fd076194462755643cd4c9030b61228ed8bd8a9d39fe525be379b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UI5P2G5W%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCknv9yB1TSUhfqDPzBpZ2AsIdlrM6tA9vQ0XbkmDOc5AIgeEayaJBt1muCRXpawlKfDnzBv8oCSg7iERF%2BswdOlDYq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDBM3uii1RDOOGU9LMyrcA1UHzpS%2B%2F2Mm9N9SQv1S8qG%2B%2Fn36X39D9zUleY8eoJcKlH%2B0KvKqhy0sjjrEWZBDBX11grSVEjgh71w%2BZ5JfM8nXQLWpC3shSskntmC7PTLgLS3%2BhnuOhXVM0fKDUrVYQ221ofHM2Whzn6K4AkBhTXM5l%2BTYVFYKpCIy3lTkTcyWNlf1RFB8SD3c37vod5gONT40SgKpiVj0K8BWvgCoMahCistiGEadI7fblFuTDAQG6G8ds72myLvd8Fl0VkHKkhRTZ3kEXOoZX3RDoOu%2B25u%2BGXWlaTVBpVk1SfGeYXF0UZyudmuse2M0ApAtr2org88VmMKJvjeVOOIIO2sfirek8lPPYIHzhb00ZssGXJtr%2B4%2B3lYczjEMnqd7u4nSl9bU5XOxiIEyuGpsHH1YEdpiY8pYvqvZJJh%2FRc2PgviNyZ91tFHMphHBAJN0D3I%2BWx%2FTpNwD2r6224hAgKXC9tkJqIUoZqIM615%2F%2FItWpCTFt4cwVEiisJkqrk1spdW9qPaBRNJe02sUS2gGgfqEXTgnL7m%2FdfISF3wUMT4EEQTcVBiUnLwFKw%2Fdh1xJZl5CPkR7yH7ygJBno5qMPyXCBrKwUReQs4I3vUCaKlAvG%2FHktfHLTAycWhMSnlisQMNW6%2FMwGOqUBTvNWenxYXGu8T85D15%2FBI2qObJt6KK7ReQVlZw09KSAUx%2FFH0EzTNJhVgbidloGsHUa6fsp9OggwGgRSskQMp1PabuNzdZt0D0hZIEeaTVNrWCl7vNhsU19aUAcNb%2BKf1TeupcoUEjyw5JKjLh0v%2B8HmdQNlFHA3iHVYx8UtmXs59g938vb5T%2FIoZUvPSODuRxlApAjzf%2BY9T0ik%2F0TK99PADLvy&X-Amz-Signature=1b43532b937e0455c2fb66ef090df23b143ec49aa685356ac4f9abb54ec8e2a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HBIRDIB%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIBaTnV1gPGiX2Wg0M4nFRiZX30AET9l7yyH5SkGHL15NAiBOffu%2By9P21CB5kslU8CWKdpEEfs9mB%2B%2Bxjch3oEgz8yr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMrdUWhzXNtoXVixXpKtwD6GxWhX8wsWWKROK2LvXea3D3SNHf3ZktTEkn9cCf8k3kjEUNWeHjZGf0Fz2Ge1HuBM0G3A88LyKKUHQaFofAYpNIN5JbkdO2bLHqMDvuleLI%2BcP15%2B%2B%2BSNVwCoPZRUx7%2FIh6PVhC16Rstlx4%2B41XUeLcAYE7S%2FyP1NOdY9O9kVqiLernuiALfBqVqHHQ8IS9TG7jptQElymMhDy2hRu1SmpgemzZ0Gvca2%2FuWzluY%2F7mIsA7xFy4ZYErsf0lLj6UXplTEbiPdUnqsgxu%2FC6QFG%2BBV4pchmKNX%2FEsOfdALxLR8VftCXe3UhnFAZeSIPBCkVLn1Mqe5rCx6iUhj6noCKqMv%2BFslg%2Bt1au1j5%2B%2FwXYUK7kIaOgkS9wbpTOF0FRtYO08W%2BAg4SIRDcybKlLEtCyEfvlV4of2DhTsMB7H8V7lIQX3j3NNo9sxZyj3TqJnTjbGNe5fXRQi5nn23c6hcWN9IYkUyVeKcN1jwUpMZBAxvh5Vd3L%2BK8d0TRJ8jkRp3sWYAZj7ToBBcoVb97EaLGVVK%2BuIPuIxbkRzjMJFBVPkeqLdPJhJNTG3sXVXoTaW%2FHe3ybFpx%2F8U2HmN1RKzCy7FYPFZ3B2lcCHmqAN7Q2oXgT5f%2FCPCg06mfVsw97n8zAY6pgEYyjQ5aGhEAbPcN7JN5OzF9f%2B6vzNohFekhnHhFpAh2vuuYRi42AIzuByNFDJfhWrOt2ycJFoHbe3e6Z%2BqG6S3DfuCo7BaboUJcJ%2BD0DDLV4jULI%2FQI2Y6LEvtBB7rrNiIuG0PZLTNQvjcLp6vIzecEKAArLfv%2FwiiFbOSRbnQ2rk%2BqHNO8aPqn%2BmRMPBNn2Xy08ALWkqX0vxwjzwOL4frkG2erq5K&X-Amz-Signature=68de8eace81680d7e03955ade73417d577d4c2021459d56c4e4fb5964149f09c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUTB35G3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIDdrYZW6VTe8czOgtZ6Jmk6xoSTv1qV7SQkJYrRloKTMAiBeixU64HEMdc%2FTmEbiHDbjcrAJ8EGb3e6VfHz%2F%2FlWVUir%2FAwgREAAaDDYzNzQyMzE4MzgwNSIM2cYhxtfoZw%2FiePXKKtwDOwT7htXmMHT1EXAu%2FIQ3RNT33j6C3ATfpo66vNRBoUtPD8EtepgJNoDLSqu8evLwogulRnbcj8M3hFtGsmIWsYqjFwUP1UH%2BVbvXfgrGrimuKuOnkBzUm6%2FeDBWLYSEiAXYnYFr2yiIGOtfMgh0U5bugkoDsqD725ibW2Kr2wEJ54PPLhWUldLIkInQUiLEA%2BxcVkNdslD%2BOwfaE6ab4w1K75%2FIbvHjfyNgs3zvFFsTRXj%2B8m7Jl4%2BsJpFsiiAHCwoDmkul3PPLMp3TGHNEhQUJlBzzE1LpUTDXoC94hxlM%2BHv5b5MpP2RW9bc2ATuI0xNMg4uYnfT7D3qXGGbfmqklHpJKAiHkGOfzC34G54FtUBwdfy4PRmhIj9B3mDTXLMl6SBDitGS3IQUMXBHTV0F4d%2BP6zSlGwP1nRuqhfn3fkNVt%2FaINhForoFtT6lB2w%2BcyhEJ%2FmLKw%2FStAY2Kus4wbnD6IkE3savVUg08GIxTXXUsKvWUYIhtfVVybbiIALcHV9s4hTgZLVejg6%2B4jjjt7HKoIBQqWk3Dm3P1%2B0apMKlOHnTwJgcXREpNQTJ2o%2FJ7l3%2F61%2BqLYuTodyjebDTZykVm2B%2FsvSOxiXwpgVr45J5mOIEMfakMXk4xwwnbn8zAY6pgFD2UBhJMuFCdpubP3NLpAs0LXSEFwubhOvf1KEujymqIV0qbgrcoFVVn03Xu5gEK%2BCNQsmQbLSEVuNPHlGvT%2BSavTVcuRhblhZso94e8VNH7PYzxIh8nxBVCylGs2HvkrP4P2zsj29tMxRLZUtnyR7feCTOvw2YIqxXT%2BF%2Ftyqx4u2vijEZRa9%2FttdiWZqjxO9m%2FaNC5DAUq5hkEIaN0vBVhWIELWH&X-Amz-Signature=78a43c26a667b7b2cb5618e95547a1e577fc22d75bf8349e5b41078eaabb6283&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUTB35G3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIDdrYZW6VTe8czOgtZ6Jmk6xoSTv1qV7SQkJYrRloKTMAiBeixU64HEMdc%2FTmEbiHDbjcrAJ8EGb3e6VfHz%2F%2FlWVUir%2FAwgREAAaDDYzNzQyMzE4MzgwNSIM2cYhxtfoZw%2FiePXKKtwDOwT7htXmMHT1EXAu%2FIQ3RNT33j6C3ATfpo66vNRBoUtPD8EtepgJNoDLSqu8evLwogulRnbcj8M3hFtGsmIWsYqjFwUP1UH%2BVbvXfgrGrimuKuOnkBzUm6%2FeDBWLYSEiAXYnYFr2yiIGOtfMgh0U5bugkoDsqD725ibW2Kr2wEJ54PPLhWUldLIkInQUiLEA%2BxcVkNdslD%2BOwfaE6ab4w1K75%2FIbvHjfyNgs3zvFFsTRXj%2B8m7Jl4%2BsJpFsiiAHCwoDmkul3PPLMp3TGHNEhQUJlBzzE1LpUTDXoC94hxlM%2BHv5b5MpP2RW9bc2ATuI0xNMg4uYnfT7D3qXGGbfmqklHpJKAiHkGOfzC34G54FtUBwdfy4PRmhIj9B3mDTXLMl6SBDitGS3IQUMXBHTV0F4d%2BP6zSlGwP1nRuqhfn3fkNVt%2FaINhForoFtT6lB2w%2BcyhEJ%2FmLKw%2FStAY2Kus4wbnD6IkE3savVUg08GIxTXXUsKvWUYIhtfVVybbiIALcHV9s4hTgZLVejg6%2B4jjjt7HKoIBQqWk3Dm3P1%2B0apMKlOHnTwJgcXREpNQTJ2o%2FJ7l3%2F61%2BqLYuTodyjebDTZykVm2B%2FsvSOxiXwpgVr45J5mOIEMfakMXk4xwwnbn8zAY6pgFD2UBhJMuFCdpubP3NLpAs0LXSEFwubhOvf1KEujymqIV0qbgrcoFVVn03Xu5gEK%2BCNQsmQbLSEVuNPHlGvT%2BSavTVcuRhblhZso94e8VNH7PYzxIh8nxBVCylGs2HvkrP4P2zsj29tMxRLZUtnyR7feCTOvw2YIqxXT%2BF%2Ftyqx4u2vijEZRa9%2FttdiWZqjxO9m%2FaNC5DAUq5hkEIaN0vBVhWIELWH&X-Amz-Signature=78a43c26a667b7b2cb5618e95547a1e577fc22d75bf8349e5b41078eaabb6283&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZA7ZDZM%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T165454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIHZdgHp%2BzoRDdS23WX%2Fd2y0MT6WzEWNjqm0%2FIAhVaf5QAiEA7dDG%2BnFxwEdHRHppBI7zqGozjMaTucgnMXtAtg2VL3wq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDBTGzNU4TtGp3j5IpCrcA4vhZy3jNfqBhiPY9DF3UVsiLrLROlCdCIkPt%2FrHmd9E7DpOuPHo%2BLrwrqer4LLTsSXZNTK6Jh6Sy8OMDonnZL6fSiuV7t0HCTWFzfSGzNiBLeiMl0seK6mEi%2FKj5OIrelXCFwa2Q1LCu584tVnRjal2mJvVfVg%2Fa4Lg6WsZ8dg4odWT8dq%2B%2B3qHo%2F8qqAOuOJA9i1Jb9pI37Tph9FajnTqSkM3FxlaLTfr3qMrPcNA6lW30oVDSa%2F%2FnPxNB78O6T7l%2F8zOkhlW%2B18N4XdXu5yBJOWrGVz9PBOKlgi3em%2B0aJ0NeJu3jklTin1WXo5ismkYjMYeLwpG5AsK4SPs%2F%2F7q4%2FMAhUJchxkZkHaomq03sB3%2FVCsx805%2BjnzwoMlLZM1UHHMy4e8bjLzio%2Fue6Rem3%2FsI4k2cMxCf7CN23BGwSGxLdGQOko7PNwuZ5hENkLIHaM%2BIfIHjmNjRHyiuqGCYomofzRAiREjvdHXq1zqOErzsjLAoDX6YFDJs%2FjrpFEClEWzUwPk9wCx5VFfO7h%2BIRGE5%2FeLlRLvXO%2FsdMloc0FGfR8yigdlGWKKFI7F0XfkJlRzP1PPleO2vh64o%2FqvJaWMf7sgTlS6v%2BqKol9zN6Q9Dx1QTBB41mtmw7MN26%2FMwGOqUB069XzcaL3fokr0ZMJ0w3znanuPi0OnYAKX2f7l%2BjEn9VWR36zpmiOYR2JbATXXG7wg0oHV9eN6deQt3TEbRkI8EiuRX5kR5GVFH5tW6aFcSxTRU%2BD0YssezP62EMQULQNnkMVOcotp4xeSeZUqn5UlKgWH542lbcrfKiOVOpjMByZLKT2mLsitOrfNJmRE1EYU2Dbb5i%2BtOwAx0NK%2BnCjOyN%2Bpnj&X-Amz-Signature=197a11b9a595a93527fe10533c54159038ab1d93d231bb2c4b692a78cf433d8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

