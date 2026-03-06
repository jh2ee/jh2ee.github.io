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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672GC2TWP%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCICvYWdaANbG1KuzM%2Bg13YvyzVn9VJx6K5r5jHVkzEBK7AiEArIUnopijCrZqhSvo6aqFwaP7BjjV5gV9Qrtgu4TPFLQqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNOrO%2F7lofDWqZ6IkSrcA2jbOi2GwE%2BcJETBbCGaRdY9eyTu9UH2FTLyJrHA6vlV1WWXwVc0VOIqtfgb0M1eFVM5fAixY17eVrpmIi9hMvvQz9%2FCXCnR%2B0hUuMNn7oE6kWfVQ4UEVzMoTI7rygyc46wNHl9LATbVmC5amBphSPVdHWw%2B0cnIsTsJrn2IR4AMQ8vy%2FbGXuB73oj5aMplzoBiy2cpSU7T0sOy%2BzNYWj6%2FdykvzFm4JgYY3U8VnE%2F05unWI%2FS3GJJWQQkxb5DdeHYcbfJ37Lgg%2BGdKHRK1zOjssTxu8oecC45OLgK0b1DrOlp9PWNl7IwPJE9KoQ2XVitt19xx%2BrDqunqX2GDPz7fca5%2FleELMHQ%2B1aYvK7cMd5c5%2BXaZjbOLetwJa7m5aRbMCk0sQ8etl1F%2BlT65AjtyFo5KAahNjYgK7mkIHTBH9n8NVuc3t06Z%2FFPdvSNcA5hg7giHAw5fjuW8qhZJ1ZW81PqjHSNN0eU6103iScKEd2fV3yBHVttv4VZf049H3icLKmJo7l5fEFHr9k7c0%2FOnQGTAOUw5O5FAVTQJmVEMyE152priEEPlU7jn3DU9XinAjyo9oAPYyOOlK3WlFqnRQnDPIH4zATOQ%2B16RZl1ThTlpyXe290u0hWibtUMPPiqM0GOqUBRQ7qR6Vr12CkcLACOqfZplcZODMSSmWlwsH%2BqWdPOvj7l5gRQJIhQvo4LSDZsTwoe0hg6XrgXCPbjZwRYp751qRlRB6U7GfSp0mgAAjTDhnHnsWw2j9eo9vzaPUu6eKd3aYq7rLOMQ0MZ0Ln%2FEbxFUdVSq8BVm8WDX%2FMofYRl3MIndqLgWj1TlFq1O7yDwng%2F7Ru%2FbMMcZ9bI3d4DpKfZNcgJMK%2B&X-Amz-Signature=324b724fbd0512f79bdeae0a49dd8e05072a817efa294e27955be8d378eba57e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672GC2TWP%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCICvYWdaANbG1KuzM%2Bg13YvyzVn9VJx6K5r5jHVkzEBK7AiEArIUnopijCrZqhSvo6aqFwaP7BjjV5gV9Qrtgu4TPFLQqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNOrO%2F7lofDWqZ6IkSrcA2jbOi2GwE%2BcJETBbCGaRdY9eyTu9UH2FTLyJrHA6vlV1WWXwVc0VOIqtfgb0M1eFVM5fAixY17eVrpmIi9hMvvQz9%2FCXCnR%2B0hUuMNn7oE6kWfVQ4UEVzMoTI7rygyc46wNHl9LATbVmC5amBphSPVdHWw%2B0cnIsTsJrn2IR4AMQ8vy%2FbGXuB73oj5aMplzoBiy2cpSU7T0sOy%2BzNYWj6%2FdykvzFm4JgYY3U8VnE%2F05unWI%2FS3GJJWQQkxb5DdeHYcbfJ37Lgg%2BGdKHRK1zOjssTxu8oecC45OLgK0b1DrOlp9PWNl7IwPJE9KoQ2XVitt19xx%2BrDqunqX2GDPz7fca5%2FleELMHQ%2B1aYvK7cMd5c5%2BXaZjbOLetwJa7m5aRbMCk0sQ8etl1F%2BlT65AjtyFo5KAahNjYgK7mkIHTBH9n8NVuc3t06Z%2FFPdvSNcA5hg7giHAw5fjuW8qhZJ1ZW81PqjHSNN0eU6103iScKEd2fV3yBHVttv4VZf049H3icLKmJo7l5fEFHr9k7c0%2FOnQGTAOUw5O5FAVTQJmVEMyE152priEEPlU7jn3DU9XinAjyo9oAPYyOOlK3WlFqnRQnDPIH4zATOQ%2B16RZl1ThTlpyXe290u0hWibtUMPPiqM0GOqUBRQ7qR6Vr12CkcLACOqfZplcZODMSSmWlwsH%2BqWdPOvj7l5gRQJIhQvo4LSDZsTwoe0hg6XrgXCPbjZwRYp751qRlRB6U7GfSp0mgAAjTDhnHnsWw2j9eo9vzaPUu6eKd3aYq7rLOMQ0MZ0Ln%2FEbxFUdVSq8BVm8WDX%2FMofYRl3MIndqLgWj1TlFq1O7yDwng%2F7Ru%2FbMMcZ9bI3d4DpKfZNcgJMK%2B&X-Amz-Signature=324b724fbd0512f79bdeae0a49dd8e05072a817efa294e27955be8d378eba57e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SIXUZSES%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCICazEto2cE1uYQUge59SxGPYSIEPhrf3f6qYBMvA5TwSAiBjxOT%2FoMzqBPaM8wrfpNlEvITM%2FfqsTrKeqC2%2BoAtIqiqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqse%2FTXr6TqI%2BzWtTKtwDCV1SM0VepOsKPFvJUgKbFUHDNyRinE%2BCmasXnvZIdS6MeTG51L4Udo1WVAkBVFXUrNW3aoMVq5FKdGdwbjTAyV6m4WbnwqjziMGqNhvIbFREUVNeDsnjP1iiFfO1GuyyKya6xgKeQNSEpuHBLHmS%2B6%2F3QMTlHUoBCHfOQR1nCjvZpc0s0l3JTEyueDlI4ifsuPSQ5Tvp2nnrZDTJDYeGnCPzCo508V2%2FCTD7Kcub1nzbEYIdjVbhTXNqyZhp9fKW0Bf7WOeqiIYA6lRP5Pmf6T2L6fo16lxcI7u8kcxgATTtQkgCVNF5YWPbbKV7OBUFMcqREtuTyHcPsIGDq72OkfN7Jf82BAgw5m%2FuZp9NK3bDIWX0YoLcDwrI8EunrMKi8yjmrp3oLgnqihCJ1%2BrwPBTWWaPbphxBScrMq20%2FydIIORsFrhB2OcgzVU79Eti0yyuKnqhX9hABZsYMa3b3%2BfyrMml2aE0v2%2F405Tp0klTUO1cH2VfhL0arNm%2BtfULR1N4vHuVckYFh%2FyyRnJCV0CMFq7YtuTxlDJ9H0oWE4yPCOVYfs8EHPnqCX0u%2BIOX5HoxHzkgH9qbHZhV3lmS6sVL9WgAdTReRbmX5VQN%2FG2R44DAWvBPxIWcFZ%2BMwpuKozQY6pgFse8N%2BnOhGCvGM6iVZXm0IraDM41ZpS1LTX4GdQQveP2SdYUlViw5Y%2BNtKQ7IoAS%2BQVsFzNHhDz3OnKYlzKPe2ZwP3t1kAoppxrUkje12wTQgmztvqgd6%2FMFhNttBo0pMJzjOAICmoQvfrvkhc9MDBxbGsAhvSFKsQJ1USJSvrpNyQURTjZvIh1wQOkVHHRf0jL1tO0oTSArXpq0fBstSTC2ndbTGl&X-Amz-Signature=a32ebf28450556da1006ab977fd0dbbf36803941e3d839e6250d2773b779eec0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQBEIHR5%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIHxGWhM6HnE0XUkZSmmYtfyKDKk3BL35C4Cf1G7nNJJZAiEAuRhuI1xpHL9pIxvzkg8T20wH2JETGXjKhE53ouXC%2FgAqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJhCQUk%2BoK1YBFUeRSrcAzSYWra5KY4D6T4h%2BIYKjSXczLr8aqokzYDOXlT1%2FepbAeCCAK%2FDk3CxKxAVGWGprcyc9WaZpEi5XjiTzulZY4NIQHK%2B7h8A8C7W2ZLgeWxYC2W0KBwasNTBSf%2FkElkPUrsW4Feeqs6zd0vEiSy66jU3rEfALZcK3CT6KiT6sSZN4LLyBpNE5aXOuUMJJ%2B7xPulZp2eIff%2FeTW7dTqdrwx7i6Pxl3C%2BJgS0zqxFNoJN9Iw2rV83cgCNP4kwjmUKF3l3TUcOtiaJ3e%2FCJ3g%2B3FsSnEcfuBHHv80ugwH%2B%2BBirazZf%2Boh9EI0O5ChvxesgFkTorVuoWQCOmsu4Ab6R9UjF4V0hcCyJtV7umRbIKYjIoW8RIGAvVVrSlfU7Ap17IywLidtWWNzA%2Bc3svlheEZb7t1ypz75fY3zI4uinwtzs4oVmfiLs7NPNCnXe9bK9kEXgCzQWRuFohmJRt5xa1kdo9WQ%2F%2F54DoHDSC88zk0OTN%2Fj8UcgCMBrSKLWze15tFA1XJSMj6AvXiETc5UfFvMJd2egBfh5gd371L6IfkUzd74w%2BEiTX9Nq2xOdwGsIoWBDmr%2BSi2BIDRe9hH%2FchcqEEKscecpUR2wzBz%2BYZf%2BUKD8zQRh%2BD4p6oFk%2Bk1MKLjqM0GOqUBlGMFfBX9zQusRJd5nJe2NE%2FtFB36kZrPsJi2hxoAIib0GZ6UikAIaffshVZVKFmOVJ4zBC2Uet1095zuw771ZQj%2BYuBTeWKWlSOtXBrJt%2FvqszxZAOg5l9fAqbPLwwf5laFBBA5L1C%2FHWS4lNaWQqEhDrSxPx%2F3qjmfjOiBg2YK%2BVqbpd1DJ4gbjs0IbZ2Dk3gez9lysTEr52Ma8iIH2S9cNTp71&X-Amz-Signature=00a3d271f672b5967b64787b51b84efce1712514ecad10e9763f56369b309524&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQBEIHR5%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIHxGWhM6HnE0XUkZSmmYtfyKDKk3BL35C4Cf1G7nNJJZAiEAuRhuI1xpHL9pIxvzkg8T20wH2JETGXjKhE53ouXC%2FgAqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJhCQUk%2BoK1YBFUeRSrcAzSYWra5KY4D6T4h%2BIYKjSXczLr8aqokzYDOXlT1%2FepbAeCCAK%2FDk3CxKxAVGWGprcyc9WaZpEi5XjiTzulZY4NIQHK%2B7h8A8C7W2ZLgeWxYC2W0KBwasNTBSf%2FkElkPUrsW4Feeqs6zd0vEiSy66jU3rEfALZcK3CT6KiT6sSZN4LLyBpNE5aXOuUMJJ%2B7xPulZp2eIff%2FeTW7dTqdrwx7i6Pxl3C%2BJgS0zqxFNoJN9Iw2rV83cgCNP4kwjmUKF3l3TUcOtiaJ3e%2FCJ3g%2B3FsSnEcfuBHHv80ugwH%2B%2BBirazZf%2Boh9EI0O5ChvxesgFkTorVuoWQCOmsu4Ab6R9UjF4V0hcCyJtV7umRbIKYjIoW8RIGAvVVrSlfU7Ap17IywLidtWWNzA%2Bc3svlheEZb7t1ypz75fY3zI4uinwtzs4oVmfiLs7NPNCnXe9bK9kEXgCzQWRuFohmJRt5xa1kdo9WQ%2F%2F54DoHDSC88zk0OTN%2Fj8UcgCMBrSKLWze15tFA1XJSMj6AvXiETc5UfFvMJd2egBfh5gd371L6IfkUzd74w%2BEiTX9Nq2xOdwGsIoWBDmr%2BSi2BIDRe9hH%2FchcqEEKscecpUR2wzBz%2BYZf%2BUKD8zQRh%2BD4p6oFk%2Bk1MKLjqM0GOqUBlGMFfBX9zQusRJd5nJe2NE%2FtFB36kZrPsJi2hxoAIib0GZ6UikAIaffshVZVKFmOVJ4zBC2Uet1095zuw771ZQj%2BYuBTeWKWlSOtXBrJt%2FvqszxZAOg5l9fAqbPLwwf5laFBBA5L1C%2FHWS4lNaWQqEhDrSxPx%2F3qjmfjOiBg2YK%2BVqbpd1DJ4gbjs0IbZ2Dk3gez9lysTEr52Ma8iIH2S9cNTp71&X-Amz-Signature=a89cb00294aac3052b0eacd083a2503dadb36f4dcc293b97ca6eba54e2b8cb33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOUV7S7J%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQD663e9fSzpP4FWPtE6QapdyLudxgJAbIXbmNze7f6IxgIhAIVw8tc61tgtDpNSShRqbveq9WBkXaqvRLp1C1kZcSuqKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzBIoJrtTtOrY%2BqJn0q3AMdx1MeFG1Mj5vthmfEkwcqVjSrPrA71BTUZt7TP0IqMX5hFD%2BVxtL9l62oHndOBn7kpj3Z5OSlQx1k5I51deTY5G5UHuNpn25s7jvZSoXZ10aAPCgN0IRBDSvSq04ICYRCrVQXDnfKcG3HAOaDHoL%2B7Y0%2BklWbnazWhWZ30ObH0HfVM58TWnj6hRTTruamB0vUuqEtzqQXKJs%2BECO4Dh2li4Iwa5PNSXzErAIbHcymen00RSq%2FUiJNHBksW6Zm%2FSiIU0xpiru6DGqzbJvOJktGV70FkVCztEeCtbJwGJDi%2BHYtDShlw5okarw%2B9OBKzdCk%2BUxPba9oixtPsmytRAF0AqubeSA1G%2FvU8%2FA03NYdB5FU6Vw3exBHvAuqK3%2FziL8yg2L%2FOpIynPgWA1YeQRA1DWNqCR7e28tPGbWh6%2FnvbVoOul4%2B7RR6wRotIuEjwcSYKyjeSY%2B20WLUVfXJvWR1nJgZg8PJi%2F30tm6YL05xc1cJ8s66wHOSi1WSS5pRRQ%2BBcolNj9s80%2BUtjurt8vmaNa%2F%2FTY3Jmaq%2BOg5mOVxGJHzJfuKShLpy00cKmZofgrJWh8OPp4mEXrzjP2%2FtejHzSdcAlLpYnjjvEycp1Hm1iTF1mIx1SlDwcMQGuzD44qjNBjqkAR7S%2BpEGi88GEiZYycFAWv4f%2B8syfprwIX6T3QGKz%2Fq30N3cUYn0ByQ4XdmL0gEnok5Y39MjGQEdevlMN%2B7Xf5KECbdyRwoBW5R3mdEG6kxa62Asj5y7BuKtOeVhL3iY3UbKWlQDBUdnW%2FSyBJQuh1XxW%2FHTnN8mxJxP8MA6o%2BDiIgI%2FfEYip3bMvJa7DV1Oe0%2B2OtOvb38v48CStdVZw%2BodaY2Y&X-Amz-Signature=6310f91fb62298bb7674e183eff74fada60afd904f694f243168b87d1f2547e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3GXVSAJ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDSA50vn9IMaiSzPAQV%2FJfBseNTUtWxB%2BgoZd9D%2BV6QawIgDGbsYYXfTPb3XMmYGADDY6fpK%2Fr46Bvge1ccu1hWen4qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEPNQeedgTMS8UXbvyrcA7NnP9%2BGCtCPv4IinMNiIbx621HCW07h7fqtvEpZPt5we33YpFIIgEf5SEgq%2FdsTB%2BPOFretj80k39g%2BpqvCaet4mksR7LcTlWZGT3WaI%2BAUXwr7ey3AMROKuNOYA5qejpMGVoGYkF3NnKotAio5n6MD%2BGduWzau8HtZtXESOSQenHXh0Mbx20fEUtxVuzz%2Fs%2B3wUYPgRxwOlLoWEmXOQGioA98K8OGYQoxeb8G56Cr%2FwdDnVcasvs%2B0m%2F8qDdJdaymAYviZT3y9NcHdOVJKP8a2XN3NxsZQRlpHieZcZzWbVtNeOCtVmLaRwbPHwcwaPe7p1CpBIw4GHB3pTOzGXzWuFjgQrcRNARIV29aVzDRzZspyTESWZdyGvfghkgQe4TKS5drU0FDnLNHaeUOZcz0sD8mntopB6o2MA%2FCFyTTCqXAsEOYbxZO6S2oNdf5IqOiJWejfHqxfWyeXW8NjL1tOq%2BCb0vaV%2F9dxcideOzAL2zz5exi72Hdx%2F3rcRAZUtzrbn4O0lcRAej3sbwpJp6u8lw%2Bttt4sBdTAPHncOfRSLy37EF03Rab0NJDu5s3Q5CdpW84ucHJ%2FHUrKvLrvsQtLi2R%2BkqhAyIDbekb%2FnQt2nMIwhpnOBYsUe8ZRMJfiqM0GOqUBkpCJL1bMJzPfgI2mym0Zjyqnke%2BIMlYwxW9HGf0uSaTx4gZaN%2BEi7tvWJ4%2Bu2Jgo4En5t6BmVrv%2FYjH%2FU7BGC0cyW6IkkGeBMavh92hN%2BQ%2BRlB3hXKQhvtm8foquWDmwS7%2FjbzJ1%2BOdiTEL2%2F0IgwTerOXgPabbO6%2FW%2BwKFGveLsFaGApWTyvtGF%2F%2B59h3g2eb%2FmUfkwSwZLz%2BZufgqk5Ha1I1TO&X-Amz-Signature=d9da3316167791d1607023a9ff442b1f7d7bdf226de6e3baab7d24c60429409d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633FQ5WSF%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQCUZIauEBvSv1XDvkB9ZD2EJ6JyZvd%2FR%2BEJqR2VwS3ESwIhAMuv3riyS1jjMwm%2B%2Fad0YmTAun%2BJDp6WYPOtzwFaxvKnKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxxspAsp2agcj9Yyncq3APDSqsiKbBxc%2BEICbsa7Xdz844cf0cUxFFj%2FSc5Q6g1TANXPCq8MyWt7XW6VDqS1jj6DUzGu5mzaHyM6OaitGnqLPvbv3nKgOUpFbzb8cp16qmjzLw%2B6s5KAjguySSe2t%2F1tAmlcgz6Stdrp27lEzUFfd8GKttelbNk5EoZP%2BWfUOG4zv1%2F9JdUAFZttovHzC1JIFfzFEoEjd2YGfve4zWnGpIMFW44BvIhpUBdi2waBWOC9xHLzN4U0XJxOeBtDJxf4A5jk5m8NeENYbgNnJdhuuuta2HqP3lNI3zGjaqmQHCd7OICGpWp4qjAaGIM0JbcQW%2Fh4Y%2F%2BIiNzMKdosrbEcJk5%2BpkNn8aRjwTzyaEiABDJnHHzxbzlzXvoklHFSLF88QV2PL8k3mhN3drelzRIxyU3zx2XjhQkGOYllYqMeZf1ly23yglV6McAzEcHYtyTBO7dETcBXtCKmaN%2FpWXzDzDX29CSGrj3u%2BQxWZwcm0%2FN1XHHzsb8VSUjdT7%2FpuyPbwWWfSsRP0nqpgcq%2BHOs9%2ByhwMLyO%2Boo316D4r06YmBSFaYTF1M5QbzFXE3HAlrPQeMCQ2xhgxpxueK%2FAkrCv19mGzMD1Nk%2F0wlRG2XrSRhjVp7NBzkEHgej9zCC46jNBjqkAVm2RsjRMrKzqQSjMyjs7pbkGEl4mNlmYvSDtsW3Iy%2Bn3TJ8ysyIZ1glGU%2FPrcsMjwL%2FIgDSC%2FlYXSuaq7uOi7W6o8Z9V1yZHWN3helsB%2BGXUYxBdKaC%2B%2B11hk1sCzEfA773kvyO4WjVfOuTJa9HAona58bX9%2F8%2Bxhh%2FXWQF2gsRQ%2FWWwyhf%2BKKqcKQkVL%2BUlhoSWvc7d7z2joA5%2FslqBufObPTx&X-Amz-Signature=e5ae5f6cde823fbdbf4180aeef47c589193ab018a0f773a6ac7cc85a6a9674e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T62PXUWN%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQCEZxFuyBXr8tQGHNw6lonKtoJmxRG9TzEA0oDnih1pMwIhAOgZX6KSv5cMa%2FKvVhLFdaIrLBNJcatE%2FIEMfsVfTUWNKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw5T8xKl7lIbU50Cb4q3APZON7A2cPsuJDTuWUEOmtiFlpcE0li4NmwOUL7YYgLXhDh7qCRnuomKQrJd06XAtYeyB3Ej5vfLbJjTlQLRJvIaxvVaIHgz%2BoNvDNot7vR0Ll4MoiVSrnFubx6PLkZv3ubo1PFoPoPk74bCd5BfANS9zynXbAPeE4TBk3TFMEgpKyMmEL%2BCEMPUN5godcidX%2BnnkUTzg4FrqOvmsvWFQyC6Q7vyfHb6KWM9OYsmiaEKdD3RfXDdjPLXJvdtk78xlvDgC1oSUzpg1qw%2B0dj8t2R64mIJK%2Bp9qRnUe%2FSsIE%2Fc%2Fox77j1S2AfAdOvj5zs24yf%2BzvyooaTTpCKKrsESARQ5it4W3vT4AGcbYlyWlawyKfBKcJvtC8qmTXQDygiBteDdSj8FvKBCUygy3aHMb2G6dBTZ1LtdtEPDcBP6xajbvGm67gGiG2Ca3oNi6seFt0sd3SDXY%2F00SiCLHskJMT6L%2B%2FO7KvnZo%2BJhhB1EkO9DykXMIsx61IhI6DR0kuH7p5aGbvGuCgRU0shd1%2FStIneK36KlvhPBsvUmUJFy7a4IMMvvzNyNMYKfJ%2Fj477EgaefhIfkrrrWgya24snA5cunFgR8F7RZpXW1bkgdJ4bKaIXuyrehThUwCKnkgDCP4qjNBjqkAdd8KvYnx6%2FVA%2Fj%2BuNxly2dcgjLCBoDITJfQMZ%2Ff1H6Cpj%2BMkTpGgY4ofH15xqITYg%2BbFE0lU3qTUoT8Y8EbmOPDuOPjR8Y4FP34l4fkU5p8l%2BPSQq6GJQoUmQCGi65TLJ8wh1r48ikhsnBtWkX3vMHpDdgdm3E%2B9YCC0fuAQFQNYeq%2BBci0e8QVxpqxPvtKHOoEqFxUKVRmQ5OIbbE0r%2FjwKXak&X-Amz-Signature=655307259e4f420b4e373e20b2f4d82106213ca7f762f2baae550f713314e764&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T62PXUWN%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQCEZxFuyBXr8tQGHNw6lonKtoJmxRG9TzEA0oDnih1pMwIhAOgZX6KSv5cMa%2FKvVhLFdaIrLBNJcatE%2FIEMfsVfTUWNKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw5T8xKl7lIbU50Cb4q3APZON7A2cPsuJDTuWUEOmtiFlpcE0li4NmwOUL7YYgLXhDh7qCRnuomKQrJd06XAtYeyB3Ej5vfLbJjTlQLRJvIaxvVaIHgz%2BoNvDNot7vR0Ll4MoiVSrnFubx6PLkZv3ubo1PFoPoPk74bCd5BfANS9zynXbAPeE4TBk3TFMEgpKyMmEL%2BCEMPUN5godcidX%2BnnkUTzg4FrqOvmsvWFQyC6Q7vyfHb6KWM9OYsmiaEKdD3RfXDdjPLXJvdtk78xlvDgC1oSUzpg1qw%2B0dj8t2R64mIJK%2Bp9qRnUe%2FSsIE%2Fc%2Fox77j1S2AfAdOvj5zs24yf%2BzvyooaTTpCKKrsESARQ5it4W3vT4AGcbYlyWlawyKfBKcJvtC8qmTXQDygiBteDdSj8FvKBCUygy3aHMb2G6dBTZ1LtdtEPDcBP6xajbvGm67gGiG2Ca3oNi6seFt0sd3SDXY%2F00SiCLHskJMT6L%2B%2FO7KvnZo%2BJhhB1EkO9DykXMIsx61IhI6DR0kuH7p5aGbvGuCgRU0shd1%2FStIneK36KlvhPBsvUmUJFy7a4IMMvvzNyNMYKfJ%2Fj477EgaefhIfkrrrWgya24snA5cunFgR8F7RZpXW1bkgdJ4bKaIXuyrehThUwCKnkgDCP4qjNBjqkAdd8KvYnx6%2FVA%2Fj%2BuNxly2dcgjLCBoDITJfQMZ%2Ff1H6Cpj%2BMkTpGgY4ofH15xqITYg%2BbFE0lU3qTUoT8Y8EbmOPDuOPjR8Y4FP34l4fkU5p8l%2BPSQq6GJQoUmQCGi65TLJ8wh1r48ikhsnBtWkX3vMHpDdgdm3E%2B9YCC0fuAQFQNYeq%2BBci0e8QVxpqxPvtKHOoEqFxUKVRmQ5OIbbE0r%2FjwKXak&X-Amz-Signature=b3d6fb73881d7bd8090c14c15c552b80ed4a7bc0c18ff318286d676d41c09d86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5B6IFQL%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIQDBQzIIiCVljKCYnQCXuoSXlDQ1tm9QMI6%2Fm7L2CuNFoAIfDWTUVXlMgUqYMAb33n24UVg0nHsGNXVr7d4ZS76yOCqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5m4WW3hTnjIJOArwKtwDpvvisUk%2BSyjKtbdKEUktdZDFLPEpaPZId5Kj%2BVxQCq2TjepvCIWEKZ6K4sW3SMQ55p4eDuVED6efOFAb%2FdCLjR%2Bsli%2FeEZd6nxIl8TZYQAOi0SM0%2FHX7CuuC41SzKjtaSmKNaa8JCPIOpzK09pp9aucj5vXCeK0JYNHEwSwvB%2F3v82%2BPlN9Ls8e1sDPCCzRqVv2t%2Bt8YpqoyuUFUNF4sa0WtL0kc0H0AfH5LfTO%2FX3pIh7xjvqAm8Uf6m3CaXw8EeYMZ1z%2FdO%2BEa%2FBEHs5Jsl4ieaZL0Yu%2BXab8JOdUkuBuXK6WLc3GmbTCgE5VqBcQYN9oNCDqAXF7woZsDUYAsG9nRifEHwn3T64jTB3xbZHvIaGpbyZgIADh1ciuV9jzjTzoiXuC1X6D0HsAaweGRKgRh2SZP1DHDlY7C%2BcRCvzF0x07xt6dog297WRpEToV2A6YxMGZeCaGzzcVZ4ivj2b9gI6uGAWWXNRNOXhSITXcwMcZzTiZgL4nwACl2woe7L4qUJSDcyOaoE62cRhtIeIA%2Bds3WpFbrZSZF%2BGDHkqzHtp09c3Wqk556gpKznGr9IT%2FnrguY3G10DwU%2BUfaao62h7EmWVxb%2B0nzE8llWUV36MOQgzigmB1mK5PAw6OKozQY6pgFxeubt4w6CtlkLXW%2FM4LgHPbzvL%2BJ88PhgBr17V2IWa8NuRJfbq8%2BWWg8ODrceBU8ECzRwCTuACO78lfy7a4orGvJLaKw4g%2BmU17PATjegyF5wzw7Xx7w47cw2J6U55vWvC1XqN56wSkwz18Eq%2FvMcHfJqs%2FztEvKo0zrK3oLJ2CrwKpAfsH40pgRiKMJUddRbYPaAmzBaj4xME%2F6Q1jUlKaeTnjLB&X-Amz-Signature=1867ceeef63f2ab0b578d18ab4b98428fb20b8bfd26ee19f4f88476cf3a47de0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XPZTFPO%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIAnNqfFQDTSZ7A2adNYnodOE3ToxFZV8%2BPKq9GvRm%2FDnAiEA3%2FFQq0EhcxCJHArKo%2FE1NQoZqrvZneKPharnEsrrdP8qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEHGvb4L%2BfaHqUMEAyrcA1%2Fqu2Z7EyapyUa7KKHnazPLCCuJhLtF1HQ6FCBneqChAijbPkCifa7Kj8WuO4hf1OGotgymCngesND%2FN449KXw7DwySiR7szKeryBDz8vQhydgx4tMSApSazpZ4wolJn4hwZ2669LUTtwr4EAKJkTN210YpwstHtbl0fnfR873GpiGyCihK1n1t0FUI2Z1YdcymnnyXRe7BY9UUkCRYR%2F7swZA5pV9ZJBdYWv%2FXEJPiEftGnbvo%2BNuZozAdO0TNK7m7PJGq3Ef0ypWPKxWrVM1zMI3Maro7nTQfc6lD%2FCHxuwBd77ADSJFEUo5wImqgqRNw4jJv%2FsKId9SeIiPYgy83exLK1clRB0MASxFUtEZ7nn9jWQ%2F1rsAhnIfoPXEDqDl1tr5epVEoIkcnee2QoRuH8ZQ%2FwWzaWcOwQUqbMd%2Fmpfdymw5msG9t8ftsBq6XXtWzNRXwpkMCdATxQjZMJmJfUFePP7lPBKX0rw028gPFTpYTfhdvkoH4zR%2FFQf3qR5klzhBMAwEl0KU3ZGnDBNp%2FFHnkDt4VdoRr3W8Td7Twu2NRD8YiJw5NDy2hHkZg292yac0U8rt7ZplcsCpOnrb10eJCd%2B8LjDasnsgmudZMN8cVeUSNd%2Bq2NNCrMPbhqM0GOqUBBR1FdbH5NqmTnqAIbmcU4ElvKvryaoE96UVaPOAFUTVBTaqihpJhBIzNmbxMWnyr5T5MdpiGP2yw8vpRmD5%2BK3a24MSgG%2FTLaIDh5nalfSSCF0I4pfsGpNF1skn%2FkBDzL%2F8XaIXHLiypxSEn0t76jonRNMtyr2pRGQmUwjYRQ4us1zJCJ%2F44amvmatEYNgFZwERhHoIAHyKfXIE4h835vVHtlWwb&X-Amz-Signature=69172043147a4396b36848b9676837d07e7497b9b654aa1a7ed070959807a13c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XPZTFPO%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIAnNqfFQDTSZ7A2adNYnodOE3ToxFZV8%2BPKq9GvRm%2FDnAiEA3%2FFQq0EhcxCJHArKo%2FE1NQoZqrvZneKPharnEsrrdP8qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEHGvb4L%2BfaHqUMEAyrcA1%2Fqu2Z7EyapyUa7KKHnazPLCCuJhLtF1HQ6FCBneqChAijbPkCifa7Kj8WuO4hf1OGotgymCngesND%2FN449KXw7DwySiR7szKeryBDz8vQhydgx4tMSApSazpZ4wolJn4hwZ2669LUTtwr4EAKJkTN210YpwstHtbl0fnfR873GpiGyCihK1n1t0FUI2Z1YdcymnnyXRe7BY9UUkCRYR%2F7swZA5pV9ZJBdYWv%2FXEJPiEftGnbvo%2BNuZozAdO0TNK7m7PJGq3Ef0ypWPKxWrVM1zMI3Maro7nTQfc6lD%2FCHxuwBd77ADSJFEUo5wImqgqRNw4jJv%2FsKId9SeIiPYgy83exLK1clRB0MASxFUtEZ7nn9jWQ%2F1rsAhnIfoPXEDqDl1tr5epVEoIkcnee2QoRuH8ZQ%2FwWzaWcOwQUqbMd%2Fmpfdymw5msG9t8ftsBq6XXtWzNRXwpkMCdATxQjZMJmJfUFePP7lPBKX0rw028gPFTpYTfhdvkoH4zR%2FFQf3qR5klzhBMAwEl0KU3ZGnDBNp%2FFHnkDt4VdoRr3W8Td7Twu2NRD8YiJw5NDy2hHkZg292yac0U8rt7ZplcsCpOnrb10eJCd%2B8LjDasnsgmudZMN8cVeUSNd%2Bq2NNCrMPbhqM0GOqUBBR1FdbH5NqmTnqAIbmcU4ElvKvryaoE96UVaPOAFUTVBTaqihpJhBIzNmbxMWnyr5T5MdpiGP2yw8vpRmD5%2BK3a24MSgG%2FTLaIDh5nalfSSCF0I4pfsGpNF1skn%2FkBDzL%2F8XaIXHLiypxSEn0t76jonRNMtyr2pRGQmUwjYRQ4us1zJCJ%2F44amvmatEYNgFZwERhHoIAHyKfXIE4h835vVHtlWwb&X-Amz-Signature=69172043147a4396b36848b9676837d07e7497b9b654aa1a7ed070959807a13c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y76IQGW5%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T050526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJIMEYCIQC5TMgsaYUzw9uMrTXmwfBymCDiaxmDoyDrXwtiRBpwMAIhAKWSHr%2FCTWJtS0lku%2BRzOxEjkWFcWDUmZDiZGRrK24rRKogECNv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzz4uIOsipWGP98DQwq3AOd%2FvMlowPD6T7cOTjMLzP4JEFU5XNCsXZHlQicORzWa68ed4kQo6RfGlFMo1l2tVjOGrgPtqbTwwpwkDts%2FVd4kufKA%2FowB%2Ff7cSKkF6rTUXYnq%2BI0Dij%2Bv2qistGkmakr1OwOpUroq5WDUZyfIS4tY0ArMEMnh7B854TjFr9MFMYHZU4J6LnNZvbYXFzkCRxKYMNDtwyd7oUxlK%2F9XbVG2IRvVrP3ZSfMS3Oah2Jfxz8QZPtbWkJLNtWYgIG%2BZZ4A4uViNxZQ4VG1KT1VDI5BRAYMMAZ3GqDRvG3%2FAf4mAGeCHYuX6tlefCy1ubgAbInsG%2FpGYGgJ099bwnE1sP%2F%2FpbDA3JDdL141ql0tr8cKYLSqbgf6SW7yJ7UA48i%2BRnIl%2BSYahQ7AdIBwzCVdldNgmJ0LzpF7waroautlxSLO2D4pbMx7Hg9MV4qEh0c%2Bn5L3qYnE%2BzTxTWm5nKg6%2FWoPNVOQBzJYrzQSpv7%2FUWr5EBR9zNfzG%2BkVHXl7VdQL8jiiNGJdS%2F7%2FsPYrl9jh3DPVdAyR0j3Y%2B9iUPo9DrhA2OvKvyW8JyHxUWCnorkXb%2BUtQ7KKZfqvXBQd4A74GvpZSIOF1Zy0asu2YCbAgR45h%2Bkombz8XbFzgXdVT3jD54qjNBjqkARVK%2FjH%2F9Yj%2F8pYx5Ha3zG1jMP5BQ7Z%2F4PaiT9ig%2FWcUKP03omWt8Qf8TRbt9JfRG6EAYr8W4cmws%2BaXawv8kwpTr72UQ9u5yI1mCGnkOg4YHyCkQt96QRYnWVv4PmQsEGC%2B7PtPO6r4ZKk4nnRd7kcsshVXtRxh1UGaWCvwjVb5dFC9UF7UeJkMxk3LWr%2FbpDWWexGTLwAaO%2BI9uUr7OHsdkS1v&X-Amz-Signature=cc9db2adf793108e5132552942e5a611bf5350bc2f80c58ce9b7a66c33203953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

