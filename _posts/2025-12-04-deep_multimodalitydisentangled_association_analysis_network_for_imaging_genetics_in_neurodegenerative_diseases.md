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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT6TIAMI%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCICVoksG7Wisb8OzEqIS36qYUCegSjKR9cBngIhwQZPx5AiEAvah3tUSki4%2BoSFjKnnVT%2B9QVxiyZIXOLZZwFN1alP4QqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAXOY8bhvkr6dty0nircA%2F3XlNsF6WB7%2Bm4jxoGbkeEPJcF9m138InCQdCYPxw6wYpZAsE5QyB0WfstbvI5ir00zv9vKFuRdozjfVI%2BF62EFvu9hJWpE%2BZxNB4r4qPNGd%2FnzihpeIHvAaQaujnG%2FDufekDpLYnGpXlLbe%2BI0CN6pY62gxW9BemhBA6kJlB8TYstWtC9muGUS2rprhbljM%2BawXBUJeoPStL%2BMgVjD0S4bx2RWycoaKslVmXouIVMZ%2FWYzaRfiJCLW03PWlfZ2MiiLwB0hq%2Fm4AKlZIiwyTfC6qkwfHaWJAX%2BTASoDmGfxa4oL6seZPPqYSmclkyRicooEJE2DYU3C5nXvqK7qna0qCsNeOcs5ViT518%2FnuqLbig0oBG3RyrlAmXNjFu2m6N8Q%2Fe4bsd%2FpIaHMdxXtrwcABSGQfy1W8N3k6xkP6gYZGrtD94wVid%2BplE5EXcZVynm%2FwudLQgogi4CzQT1xnl14ad1SVePvs%2F0PqHQV6cum7txUGbUBLDIQ3rsC1VzHAhSghTTTbv5wBM8pg7lgLkuFHPX9Oj8Trg4V9miioUppTWDO2iXHxTCBz4wrKKprXG1ofkJyLkumpWPzs4NIX3u1C90MmGzcqHrI3aOI8%2F2I7gOQdAnHZJvqH1sKMM%2Fq084GOqUBgCO0Oww377yaVWgrDTFOubb1Ah5DvcHWxhpGBBAsGEy0k08A98VIBfBsuc5zRfYH2Qc1vIHLRmofemzUnGUc6AMcd64CzkZP%2FNQojqB4mVK1k4KZf744RdunS7UDIrwMy4rAEyHZeHvCaDI6daMjsn0YVqcacW%2BmotV5sLnNq%2BCsx7xE8iRw3YiWlvQga7WeTCPiXPI6fHyP1Wdr5F4c7SvFDcHw&X-Amz-Signature=09ebc6962c55f1b117aff5586d2d1060d830137633749f67fb3ca8aa5c48da60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT6TIAMI%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCICVoksG7Wisb8OzEqIS36qYUCegSjKR9cBngIhwQZPx5AiEAvah3tUSki4%2BoSFjKnnVT%2B9QVxiyZIXOLZZwFN1alP4QqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAXOY8bhvkr6dty0nircA%2F3XlNsF6WB7%2Bm4jxoGbkeEPJcF9m138InCQdCYPxw6wYpZAsE5QyB0WfstbvI5ir00zv9vKFuRdozjfVI%2BF62EFvu9hJWpE%2BZxNB4r4qPNGd%2FnzihpeIHvAaQaujnG%2FDufekDpLYnGpXlLbe%2BI0CN6pY62gxW9BemhBA6kJlB8TYstWtC9muGUS2rprhbljM%2BawXBUJeoPStL%2BMgVjD0S4bx2RWycoaKslVmXouIVMZ%2FWYzaRfiJCLW03PWlfZ2MiiLwB0hq%2Fm4AKlZIiwyTfC6qkwfHaWJAX%2BTASoDmGfxa4oL6seZPPqYSmclkyRicooEJE2DYU3C5nXvqK7qna0qCsNeOcs5ViT518%2FnuqLbig0oBG3RyrlAmXNjFu2m6N8Q%2Fe4bsd%2FpIaHMdxXtrwcABSGQfy1W8N3k6xkP6gYZGrtD94wVid%2BplE5EXcZVynm%2FwudLQgogi4CzQT1xnl14ad1SVePvs%2F0PqHQV6cum7txUGbUBLDIQ3rsC1VzHAhSghTTTbv5wBM8pg7lgLkuFHPX9Oj8Trg4V9miioUppTWDO2iXHxTCBz4wrKKprXG1ofkJyLkumpWPzs4NIX3u1C90MmGzcqHrI3aOI8%2F2I7gOQdAnHZJvqH1sKMM%2Fq084GOqUBgCO0Oww377yaVWgrDTFOubb1Ah5DvcHWxhpGBBAsGEy0k08A98VIBfBsuc5zRfYH2Qc1vIHLRmofemzUnGUc6AMcd64CzkZP%2FNQojqB4mVK1k4KZf744RdunS7UDIrwMy4rAEyHZeHvCaDI6daMjsn0YVqcacW%2BmotV5sLnNq%2BCsx7xE8iRw3YiWlvQga7WeTCPiXPI6fHyP1Wdr5F4c7SvFDcHw&X-Amz-Signature=09ebc6962c55f1b117aff5586d2d1060d830137633749f67fb3ca8aa5c48da60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBVTJDMF%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCID72mUe7wI8cBnm8jU4NUg3fxUeUhjOxtpUp2tvEI6hIAiADnpr1zLBqHCsd%2B7phOZYDXixwg%2F8kzTpascS52WNraiqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQAAnrWYzeq0ofVCRKtwDjhSnhFPvFOlaAd3TAo27eBhAnoiPb0jVDGpor200%2BWKbvUF3izwIn8AIQbF9mrb0saaMecdLtPHBGLCrI5cJUR58gs6ulwuhwPVRXOO7KhQ4JWsQXME0IiIUS0Z%2BvFQL032IIse0RMa%2BIn4%2F3quq5YKC0ySsWFv6o%2F8SHzf1aOoKr6hzj1oE35sZiaff4lRIN619A3LTsyUxl0uLyqkDkL90s7%2F3kIrvQfDcahYUrtRsIfIggp8sn68ia9ceYGOG87nhPCT4cB%2FbxepXLzYqKBFWoXjigXeIj7RF5kKXrNvFXJopO3YwqYm1Fj9jALpnqSgtwQ5Nt7PIRs9oJRImF7kgpZ1toxehsQM3jQe4igORhB%2BFhYnfe0Lvxw2WQAWSUh6uDjGrnQ5zx4mtBRZPKfqwohtUqhUSwUp96hW04w209wApej0QZbBSlS4lSD8eV5VkYwPca6qSl%2BfWCHk%2F0dXraWFqeSQKPilHtIr34Qxmx3sp9GWqHffdUOP8JC9aRzAFArpr%2BFIPo9lqLoVH9nEd%2Fmekn6f5DeKFTkfeeCZjm2gdUp5bqovwTyidmsmq9HP5%2BkHb0XdHtYmcjMJSyAdzQF6BYU3K%2BtxV7qMBYWzhrMj9ixKkf40CGA4w0OrTzgY6pgGupfvdzYD%2FOFnH4TpW871UJorHPQg5VmDq5g5KZquCvvWdZT7BiZj7Mo0eTjXQ7LlO4qJaRap6rQb7aJwl5J823DGiNcNIbd593HrxI%2FatMtcC1qmz13bzP7B8w0MMWjdyEHrVaupdOhkvBwCLldF6PNPXzrOnXKpwa6OOmUVeimX%2BQC8ee32KyljZwKBiWgN3ibUtFMmg4Ct8WzbbXgODkP1ixQhE&X-Amz-Signature=6afa6ca901adde615ddfed2dd251a71ae42ab71d7353ceb49254e753323bf93f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHLSQP47%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQDj96bmhmyoBt70CUcmGTNQGzosId%2FMpRbdF7P51vGfYwIgN0XCcubA9QPI8s9rCXBBgz2oHjiHM5nhP44PO5kncKEqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF%2F7UtnULhSOFxH0NyrcA5hYelkgs1fqxpaJ%2FtHB6FoSwOnM1nGCoipWcpeTKIDsMK7QEJ5Jtt%2FGy4DgABkFmaB2jRuGDWfBfrYKZaUs8xyo%2BKe66hXGFSu2y%2FKqtIVYsGb00HfhpbEPccjj6iTXra3W1mC9KcDsO5YsGXmlKBKjHOm99xmkWOnUXCYyg23uHaN8p2kEWLik8twGdao2om%2BBWTvJsBZIKcGH5uuDDWyJQt%2FIacwJRPDmpC02pziTcwypHr8DJWUMQZmUVgES3B3iQynLMszGuLIlM1bUO5vI3mFCawTw0AAxn%2BoHN1q59amsPU8c4QGqeCndznPcTeXZX6UfpxRokrBVLJw%2FA8t5KqfYNt5N6hzdpvtEqZX26Gy34MPlu5tG40H33%2Bdf%2BSTVQx1wL5cH3TErd1Yle%2F3IRuFNrqxgeUGFqS%2Bnukrc%2FFcFuqYb6qL%2F0ensa%2BYQ9VYjpZdeoVHUneXNtZ6QYWvZPy%2Bsev7ZHM%2FbkGTvTGOr8bHvcApdp8e6d4mK0305KNk7jkSoXV1PkHtRHQJhTCYzAI%2BbaDr3HUp84zB6TmEP4adq8U506sfY3suZGiN9OUAgaXDsfRNDAGl9QYWk0FRuYpGOAG6FvLygClURg3OV5lUYnZoVP9pUF9JPMPLo084GOqUB0%2F%2FAMLkkDgWxwoDImoefpWQosN%2FsbDJp5fvzsZkeTGwpyHUCChKxw%2FEkDBYqspUTPI5AxksU1%2FM8v0Xmb6Wep%2Bl2JkjhNZBlRpPX1eH2BrjtGe%2FpUDq1G5vXDEizWv3wMj7%2FmectizjeDiD02hEEabgW9IK6bxFi8KMM68AqewCoNmmbC9nivARk2rg64JNXkmErYxStBEAIyaXIemmEqRQio5m1&X-Amz-Signature=14aac076e9eeae09b732f14751db2de5b41b3f6fd6b750feec28401452ad57e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RHLSQP47%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJHMEUCIQDj96bmhmyoBt70CUcmGTNQGzosId%2FMpRbdF7P51vGfYwIgN0XCcubA9QPI8s9rCXBBgz2oHjiHM5nhP44PO5kncKEqiAQI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF%2F7UtnULhSOFxH0NyrcA5hYelkgs1fqxpaJ%2FtHB6FoSwOnM1nGCoipWcpeTKIDsMK7QEJ5Jtt%2FGy4DgABkFmaB2jRuGDWfBfrYKZaUs8xyo%2BKe66hXGFSu2y%2FKqtIVYsGb00HfhpbEPccjj6iTXra3W1mC9KcDsO5YsGXmlKBKjHOm99xmkWOnUXCYyg23uHaN8p2kEWLik8twGdao2om%2BBWTvJsBZIKcGH5uuDDWyJQt%2FIacwJRPDmpC02pziTcwypHr8DJWUMQZmUVgES3B3iQynLMszGuLIlM1bUO5vI3mFCawTw0AAxn%2BoHN1q59amsPU8c4QGqeCndznPcTeXZX6UfpxRokrBVLJw%2FA8t5KqfYNt5N6hzdpvtEqZX26Gy34MPlu5tG40H33%2Bdf%2BSTVQx1wL5cH3TErd1Yle%2F3IRuFNrqxgeUGFqS%2Bnukrc%2FFcFuqYb6qL%2F0ensa%2BYQ9VYjpZdeoVHUneXNtZ6QYWvZPy%2Bsev7ZHM%2FbkGTvTGOr8bHvcApdp8e6d4mK0305KNk7jkSoXV1PkHtRHQJhTCYzAI%2BbaDr3HUp84zB6TmEP4adq8U506sfY3suZGiN9OUAgaXDsfRNDAGl9QYWk0FRuYpGOAG6FvLygClURg3OV5lUYnZoVP9pUF9JPMPLo084GOqUB0%2F%2FAMLkkDgWxwoDImoefpWQosN%2FsbDJp5fvzsZkeTGwpyHUCChKxw%2FEkDBYqspUTPI5AxksU1%2FM8v0Xmb6Wep%2Bl2JkjhNZBlRpPX1eH2BrjtGe%2FpUDq1G5vXDEizWv3wMj7%2FmectizjeDiD02hEEabgW9IK6bxFi8KMM68AqewCoNmmbC9nivARk2rg64JNXkmErYxStBEAIyaXIemmEqRQio5m1&X-Amz-Signature=57d7e9c2ea5b220b9283a0686ce12b200f01a6d81c9f54d8733a32583944ccc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXDVA7CB%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIDROEhvxhJAiQtlUh5Dr0o1wKsscSadNrg2ZLXyKd972AiAJ49SgYLbFeQ9RWhhWCck6X1M9Bz0Pe0pXvB%2BJacrZKSqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlP1yCqA78M0jEdEAKtwDn9X6n%2BZPGQfFbToMtvcjoj1%2FlZzDuJL1cWiiN%2F0yk0hfCPXiUCABNyIOVnGPjnZqFlFYvkqdb2GKdqq9%2B03Zq32pnlRQqxR4Ye567wqAWM4MRMfkXOQLSJqA317TOE1Iu2rVJWlXVh6Py1vVNY4cRsTjXXdRWaxzcNjemhlIo1m4BkUnhvQUIiFXS%2BPSUSARGQ71PcRsTmGR7MP7BzzC6DEgjbxAGx7tvlahUoNTR%2B17wWh3HS1034M4dJSP1oNdz9IVuw%2BN5tL1KFb0niy0BqbrC1%2Bu4A7uJjsfAczDI%2FNrDUwWSTQ%2BSfi4wsfF%2BdFUNufNKew4as6oL%2BNpafIuka7xv9G0Ws2p7o041Vk9a7OSdmaQKQwA0FhYp3VqSgCDHvlTaIfTLmAnleeESSf9RNIQ7h%2FWpzbNuf1%2BsXompshL%2FiOwJ9U%2BlfchDfLD7CzHhObkarOQTO%2Be8LZgseu9slJCLP0OvLpcOOo%2FY2ktVJewJSI1hN5AdiEMWSndwdwFdd1pGOVjekJSoDf8OxOFx1fSas%2F8jbPPoSj5blVg1cm2mDq8PY%2B6Es3oswYOv3klaTDNAiVkXZtHu6pZM7ZfoJfNu%2Bz5NrbeNQkmC%2FYUyTv5ExRDDRojQx12JTww8OjTzgY6pgG5FQegI3L0lDiclY0967owaDHD9yMs1usa%2Bxc8M9YXs4B%2Blg%2BcAgTvNggDZv0q0VXu76CcYhDfeHlZtB6rgyCwbdY%2FKll1KwWm%2B71zRHJGP7m%2Bx624UhZlxyPysbfAek8hC4mq0fUR12PS3Hjcazf71bj0rCMheHBlQ9bXXaos2ALQy9PlpEwjPhUktX0d4OE9K%2FLW771NdCGUuuv2APXl8B7mgZzC&X-Amz-Signature=9ea23dab121fd5e64c690f60293e3a568bbef5af4439f837bba3e755eae76a4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZV4V4JK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJIMEYCIQCezIDGv%2FAgHGqHA4R0hCvXbq5HOeempVVHW5BReK8g%2BgIhAPLnXHwtldkbhKv4DPqsrJzYRS7iyncn7tgDrg4bcclQKogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwg6BWHh7Fjk5bvlt0q3AM62XuhSGOkZ%2FBoLL11d3f3emjsPnpVY08zV7TwHdB6d4rcoTV6iSF2%2F4LZFT1juDzx2YBMz0qWYjS%2BqQqjdIUnVjMFGIlbMbHrx70CkHhLC8oM6iktHSiFKw9AhaWhDsY0FBTp6KYv9l4DXcrDwtfnoOXhPXga7XZ4O372%2Flgko1rIgwBxUf6N%2Bcihh7k4GEo8yUBKamb21iqd83nfPBS9d8xNjBREMWkugtME4Ji291n%2FUTJJQ5PgPm78jprCCWSGK13LeQjv9paZkRK5FRNPsxHOs%2BHcsi0WlWbX3p%2BW9NgQmrJB71ZoaNWyFbNPLs2%2FaO67PonW278ld2GDSw438nb6eU4h9W71IiLia1vcGnlmRsISOFQwujna9K5NdvjaTxnzyJf4lxoCIxW7gd9f1LIvDmITYkv9B57iuIyJJDO47Te1Jb1AO7fvsv1NkrCMAweAi0QgS99hgLuemGXZMQc5yL0FSSvXa%2FXzVMpwE2WYuHxrbBpIgNlpsUMlPWBFLkNhiyK0bbe1an4LcuLx5DCLfR7epWG%2FJKi56%2BCdgCFB405R00R9nig6YMs3XOYTELRCyiNHl%2BCV7vxQPi9vKwNkNUZW9XKkzFzam6KYvm4C9Ev1aonZpWHbHDD16dPOBjqkAQH0MEb%2Fb6i2g7ZLncVI8ATVpza2bMBWFQyR7dI7H%2FffJVt8N843CEA0EeTeWojXcum2GcLYBogEQxjXyPwYpG7TWsQGrWLd7DZ3D7SJKGJ9Z%2FFJOa6emEk%2BDiWsEwsXI%2B1ttxFkujY6CvjQauzH7mhT%2FIUePT9TwmqUJTOpXVvtlGd%2FfknA3DFa22fByRX6H8WL9ixNqH2npYW%2BRTCn5Ne6VGDF&X-Amz-Signature=daacf774e69ab283849104a38934b8b1e96b9adde973ecc91c60839462c09c78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ35AAZB%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJIMEYCIQDVB1U%2BGLRN3WzNtumTUcRcQzQ2I%2F7b6bJ8x35zeK%2F4CAIhALzbtZ6kXxCX7InNBhYtG4zJWsIPz6o9lwSRwz2fGEw4KogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuU3CsoUJTinXpvI0q3ANHr9yiTfQyJ95teAdEIePvnSKlJa9pVZQ3IapfTgXZTnrjs98dIWH3mBq0O%2BajGCPfBoKlcmdBDKLrdf1XLtex%2BZ12crw6ATqrCQhItDFRBC0BxvCIvSvkrAAVC8oIw7xbnoAZNrwEfzQZhF5mXZ7b759f8LLcAjxlu1WjgpAOjPU%2BMyIpOKPEWZgqvWIxf5jJTsessKK7ZuLSGztnJ1gXoVL54KdlT8EL1UgMjoQGGYWbHX0Fl273Sa%2FxuqrsUzfIlKMK5O%2Fob%2FbN3SyEFbD3CmcOLTmFxYSheOKm7R%2B6TExiqmsUiLYOF86wpfNufRjvYzw8NVjsNYhnWh1Xh2U%2FxXlNvHEIjVdINgcu9w3UpLu9M5aIdLFvyDz4eAQyHRq1HNg615D6inKTTkTHJ%2BmbY6Fd0YZYBqXx%2BGkCJzG6bmmPBZKfInSA5mbk65oZx3ObRhpesIXnPR18%2BGi27IVaEPVqdsydhHNbeI75QBIMiDRpgwOl0VLyRr7h%2Be1DsEu%2FX54ijhAS2bzw0eSJx70OV%2BJsDN2sREBJJWUJmNXF6S8xIQXEBzuOnKLSiHa388kqMXle9Jsy3oKZTS%2Fb3WzzxV7Y%2FWPXQ6TqQJ4TR7aZM24oxqkDlu%2FmqKwoRDCl6dPOBjqkAWskUuv1rzbtCdZWQnwgF5SBhIpkUA2jdf5YMpNWg53gd9OQOKiGvTaexCajwHZ1pmeT7wcWDoPlt56pc3B0HCfJidEHxfhxN6xuegXDADD1386HMYHFFxu6SGwEcFG1khQ4B3pM9ar9F28HQKPl2OxcKfib2ngSOc63gQDzW5571IOQlAYKNS1vuA%2B%2FqQ2KgmdEtdrpkxkLR33EdsOF5145EqvR&X-Amz-Signature=40bb837555951428b2074685b7cfda4d177cd54ec5e447ce839974df3431df71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TKO2GEK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJIMEYCIQDLoR%2BjHqtfNhyqqgTj1C88RdqlvNxE8wDVd7EMd%2FFfcgIhAL7Cs86rAxxElNYmAgqahVVp%2FAbu1QnRv7SmHbqiTyldKogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzkU3%2BlRIsjeBF840Mq3APspXAktA4sFuWXVEWtnSvyXHN4qlj%2FFht8UzhvKJPcEW4F3QdBTyG0dW54XOiYjhEAIVgP3eM6gu%2BJIMs8Bq1Yf9BS3l36eXM6lo8JoICEi1ILiCdT42WdQcvtT%2F0bZgf7r5FdzjVKb%2BYb7GGLUeKJRkixop4mww52Ed%2Bfr2WheJlDxKOXndl4FQ9c2CPBRUjXz1U7bOQS1HWgMSYkGDWYkzURiUe468puiCLUBrxc1ZjP4FggJBt6ZTSUFlawbK4jQyNO1dV8gNbtXfjlHafBpjhbDUyPOfeI9exPEjFtLVfL%2BvR%2FmLokus14oQ3cGD2oUZRvMa1Bd%2BZv4rMrJYWdVyve89K99W4FqMmcz4MWEftxGVc4vX5MZUuvEVeW84TRpDbmeyBtYLcBlFD4b%2BDDYzn8p7bimLDWjNFj8HZzK6RZ15Wn4N%2FsTA92S%2BCoQnZiBbz6J16YLM6hsHni6hUBGaa5D%2BM3B2ZNheDVJcCZk87%2FJR2zzgNUcGD%2BzV%2FSNmPrPm2R%2BNeLQHo9UrfFYFKsxNmUfKGUNYsGOc2Q%2FrE3zP2MnvABaPuiDKaVoT6WqE1wENzq5D73gB7o9l0NrOfFndYp%2Bh375y60jmKg91PHQP1G05tXXV95e1FMUDD96dPOBjqkARSh99GYzt5fhrCdllq42m2Cnsal5RkjW5tPbSiIjzJ%2FlkK0jjPEKr%2FnDZOItKutMadbYhR683BAv5CftayxWKi%2Bzm8qCbP9FGAtHx%2BzWXwbUFPRIoI8tUfOlCFTa3yL9OrwDBB6v%2BuuJtgzgiKnCbszfmuarXHcdRduVSgBYvRn5%2Fmj7MaAYQPWg65MuaIqScCF2UDFDCmWir0Q3In3abY4zMtb&X-Amz-Signature=ca79cd5d7771ff28b6d7c9220ccd1a5692a2e9acd5d91bbf1ecd8ae75cd20ba5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TKO2GEK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJIMEYCIQDLoR%2BjHqtfNhyqqgTj1C88RdqlvNxE8wDVd7EMd%2FFfcgIhAL7Cs86rAxxElNYmAgqahVVp%2FAbu1QnRv7SmHbqiTyldKogECOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzkU3%2BlRIsjeBF840Mq3APspXAktA4sFuWXVEWtnSvyXHN4qlj%2FFht8UzhvKJPcEW4F3QdBTyG0dW54XOiYjhEAIVgP3eM6gu%2BJIMs8Bq1Yf9BS3l36eXM6lo8JoICEi1ILiCdT42WdQcvtT%2F0bZgf7r5FdzjVKb%2BYb7GGLUeKJRkixop4mww52Ed%2Bfr2WheJlDxKOXndl4FQ9c2CPBRUjXz1U7bOQS1HWgMSYkGDWYkzURiUe468puiCLUBrxc1ZjP4FggJBt6ZTSUFlawbK4jQyNO1dV8gNbtXfjlHafBpjhbDUyPOfeI9exPEjFtLVfL%2BvR%2FmLokus14oQ3cGD2oUZRvMa1Bd%2BZv4rMrJYWdVyve89K99W4FqMmcz4MWEftxGVc4vX5MZUuvEVeW84TRpDbmeyBtYLcBlFD4b%2BDDYzn8p7bimLDWjNFj8HZzK6RZ15Wn4N%2FsTA92S%2BCoQnZiBbz6J16YLM6hsHni6hUBGaa5D%2BM3B2ZNheDVJcCZk87%2FJR2zzgNUcGD%2BzV%2FSNmPrPm2R%2BNeLQHo9UrfFYFKsxNmUfKGUNYsGOc2Q%2FrE3zP2MnvABaPuiDKaVoT6WqE1wENzq5D73gB7o9l0NrOfFndYp%2Bh375y60jmKg91PHQP1G05tXXV95e1FMUDD96dPOBjqkARSh99GYzt5fhrCdllq42m2Cnsal5RkjW5tPbSiIjzJ%2FlkK0jjPEKr%2FnDZOItKutMadbYhR683BAv5CftayxWKi%2Bzm8qCbP9FGAtHx%2BzWXwbUFPRIoI8tUfOlCFTa3yL9OrwDBB6v%2BuuJtgzgiKnCbszfmuarXHcdRduVSgBYvRn5%2Fmj7MaAYQPWg65MuaIqScCF2UDFDCmWir0Q3In3abY4zMtb&X-Amz-Signature=465f63aa7f51461a1e111d08843ac37ab9b563691d8d34a4cbc9a344e149a590&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Z7MYYMV%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIHuYPs5hyaxUTyYEYF02pnwwd6f3VKLxsK4drhunkl7GAiBp8KX08h0bRHHv4OcMjNIXKO%2F0epAUfCIFY7BjAC23YCqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMN%2B16q965Eov3tU%2FqKtwDF07%2Ft36uXr1Vcy6pjrHLGXunrJoUk%2F2wOUeD3u04nfazV%2F9uPhNN5rGoGQEcHwt%2B7CcRDvVzpVMKwOWYCu4QaDJStAjLiLNojpaGQQ%2B5TczRX%2BW276QjzfJEJsHVxh3PWvZTuxKlbbHb7%2FLRYygvmJMlRQeRmwYXaO1wondjW%2Busiyf669AWErAwB6wa3B%2FU5DvlaxA02%2FxpY2VT%2FpkqBfCdb7ZpxbGRgoVX13QypVZxwZjhwwORO3owLTfgHns3wDnyUCGtSl9ZHaRvRJUHqrxgMEuZRWnmAemcoJWt8KjLHu01Tt4i9VZy470Ew8w34Lf1M4IlK0ZiX9U2WP4RBcfI1im2MxebHtiGZqbkTuShwpK1%2FHURNUv6%2Ba9wqFmyoyHXn14KB7sIkf70HibvqG5Pr8SuQsS1q%2BB%2Fglttl1C0DKmT1CxE%2BRoxMmKdFyfvcuGtUGg1VwaLxz9kDHzU%2FdZMK59hcWBIg469xlM9OWx4r7C82qVWucjqz33eZUUC%2BOn32j1O1BiuKTtr3J4As0E2vjt41Wvg4%2FD%2BQfkmf8cVo1ILK9rlyxYnt9Pdx9Ui2Smh7TgGr08kt4qXHF2rm2qi4A9jHYy2fZVcreyYUH9zLJUW64rMn3YSK4AwuunTzgY6pgEALBYJSkgsCjNcCsoR3wwQaRohtLuAFPX6QjnjcFzFi0rz7b62j%2FWMHT6nCHV1A%2FJpAYzcLNvlZbqwlv6VHrA1CfOu4hg0CSNPOC1j1ywSHxDk3pYaC8w4TbPlQyjL%2FBhryow9eLxpsuwbWLcpd4SzIXRRVyHRVf40xjYIdyod%2F8I4n4EsMbsOR7czL6MVt7orliN%2F2d%2F%2BRtRPNss%2BrtDfYfNlc1%2Bf&X-Amz-Signature=c8d6cec0dbd43fe793fd36c8a60ac509db33d184723520c8322f2357829cd237&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WITFY7M6%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIGQRwDIZNerPCtTPdxTRL%2FEGw3LlSAlHwUmDPBVuYb%2B3AiBoNgVEPcJlkh3yQByYRDMHXIhDm9FBK6DyIYe1sZIHnSqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJio%2FIE6rI2B%2Frv9xKtwDUt84a4PvSQd2IWqFUsNAbiXtFpGgr6HVl1NgsP%2BxdtXFepL7cNxhRDm8hC7lodO6r4Mcj1d%2BQxzX%2BoRj5ujHhcUZCFWBdtCxEGtuXrjHMwOBLILJrKD%2BHPMcan4JBYAokw8EjqQIzC27Cux4Ou%2BF5srxytibtgvlXc9Rh0S7BQtcGNsTfw8sVawbCiv4GMcl8NDBi6pVZkEFLNUDOpR92Ddp804C4swwytYinV5wOQSA7Z0KwaOWCQWA83DDjR0%2Fik%2BY43E24FoQtf2gh1OtHFbpvkTM8lO%2B6FNGru2yZR1aHQeDpB3LgTxEqpvKTroR63HN3MCgoCQTYL9X40Wp4w0yoJRDYOU9X%2BrHoKoHFL04TreLaXmKA4f8yIX8scCN2sk03hC9tE4JLhztfGqYF6GjvqDMcREmHN%2BqRFh9vnSp%2BMDhGxCufw2WKTPBHvBAm%2BT0xMZse1aVJQcpU1otKowTL3AnVKLhriNELnCgVhDF3qT7sxg7pJnvOh9Ll6%2FNncoigIBY0Si1CoaxkeppqOm1AiFzjpvYY%2BToh6UsT2O2CzrnypYJV2dRHiV0x51ifyjNwjJjueKY%2B%2BHULMSnCm0wOqlquTmf0UlwB0CdI90UAShgJIWUrUzVgfEwkenTzgY6pgGbvej0rDvVFzKqyGH1IArEbo%2F%2Bf2nrEd%2B4BlZU%2BCH1xb%2FamkradfKdarvDD3f%2F76K6WqCyQwGjvxPwe%2BR5VnYGT9ZLeUaZHFRFjdgVtHntbx%2Fy6zi7trJ%2B2ZxDvohv%2BoFKQ4mCz0%2BCZrIcm8RvkSWpTHV9e9nBC7hK3sSNCuEcnHokxddXRAoJlUgPEJaWmdfag9Y8GEGlEg144Tgovaj9po1o63o2&X-Amz-Signature=3d2e3c2c3c9b1c5d55200382a670bbe070b98d424ffc524d3856537549e1efb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WITFY7M6%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIGQRwDIZNerPCtTPdxTRL%2FEGw3LlSAlHwUmDPBVuYb%2B3AiBoNgVEPcJlkh3yQByYRDMHXIhDm9FBK6DyIYe1sZIHnSqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJio%2FIE6rI2B%2Frv9xKtwDUt84a4PvSQd2IWqFUsNAbiXtFpGgr6HVl1NgsP%2BxdtXFepL7cNxhRDm8hC7lodO6r4Mcj1d%2BQxzX%2BoRj5ujHhcUZCFWBdtCxEGtuXrjHMwOBLILJrKD%2BHPMcan4JBYAokw8EjqQIzC27Cux4Ou%2BF5srxytibtgvlXc9Rh0S7BQtcGNsTfw8sVawbCiv4GMcl8NDBi6pVZkEFLNUDOpR92Ddp804C4swwytYinV5wOQSA7Z0KwaOWCQWA83DDjR0%2Fik%2BY43E24FoQtf2gh1OtHFbpvkTM8lO%2B6FNGru2yZR1aHQeDpB3LgTxEqpvKTroR63HN3MCgoCQTYL9X40Wp4w0yoJRDYOU9X%2BrHoKoHFL04TreLaXmKA4f8yIX8scCN2sk03hC9tE4JLhztfGqYF6GjvqDMcREmHN%2BqRFh9vnSp%2BMDhGxCufw2WKTPBHvBAm%2BT0xMZse1aVJQcpU1otKowTL3AnVKLhriNELnCgVhDF3qT7sxg7pJnvOh9Ll6%2FNncoigIBY0Si1CoaxkeppqOm1AiFzjpvYY%2BToh6UsT2O2CzrnypYJV2dRHiV0x51ifyjNwjJjueKY%2B%2BHULMSnCm0wOqlquTmf0UlwB0CdI90UAShgJIWUrUzVgfEwkenTzgY6pgGbvej0rDvVFzKqyGH1IArEbo%2F%2Bf2nrEd%2B4BlZU%2BCH1xb%2FamkradfKdarvDD3f%2F76K6WqCyQwGjvxPwe%2BR5VnYGT9ZLeUaZHFRFjdgVtHntbx%2Fy6zi7trJ%2B2ZxDvohv%2BoFKQ4mCz0%2BCZrIcm8RvkSWpTHV9e9nBC7hK3sSNCuEcnHokxddXRAoJlUgPEJaWmdfag9Y8GEGlEg144Tgovaj9po1o63o2&X-Amz-Signature=3d2e3c2c3c9b1c5d55200382a670bbe070b98d424ffc524d3856537549e1efb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667S6ZZFXS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T124726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLXdlc3QtMiJGMEQCIGzcIP20%2BK%2Bx6JpT7OlIO4q4aLI8pspBFOujh5jBPEsLAiBs3iXOnNhLPZHqpLu43mOpm4AiBSmKOG5knHWhC2BqSCqIBAjl%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkcPrK0IsfS4btOoJKtwD7t64vw%2B5HgYWo5Twkmx0GQSWKGjqC%2BhM2YWn1VjUggnV%2Btd0AU1Ai0qBv%2FukmqB5UJ9siG%2BqGcNF2n3vbnQw93g7jSD86xwAq2kxGDun%2Bw3MxW7%2Bb7o8nm6jOyRWrlPWgZYVZqu7GWOGNZP13rJa38%2FX4ZIVvOUISchLJJ9y85yINCOQ6wAM3Lzi7H%2FbjD62SVuL7WtS5P6ojMZqotBoDPVq9qGWyraVe30Hj4fg%2B7tKQulI7uL2UWb3%2By7lQxOjUfhgHxI1E0ZNh%2FRlJuLmskl5LJQeazy6RZXYmRmv3ZqG7TGHUKEDmKaRXw5NRGoVYBhgYzkOGM%2BN%2FNMYALtSg7G5zu5JXfe7qiiYRtgwc3SFKxENzQcTqxZL1MayEgdj9cAl3nfqYiXrlASz9fUVcu7yY7ShBqhOV0Xh0Yaqu%2BP9WmSQL4kQA%2BvCb%2BvrLi0Qz0JcRpSw4FoVB4HxuTm6M0zKRElVrK%2F%2Fj9w%2FTGvOh5TDsuvy18Wx3lAdused3ChiigbqR%2FEm2eHn7i7%2F6zqTu8WJS6BcAGTeBaoF25taJvaA%2FZRxjnCdZYatRGnt2Y%2FlTdJjtRU0vToJDM58DjWf62iephGYyi0UyKqXYk4CC4p1%2B%2B3YuGycsbHenngwgevTzgY6pgFFUH1AfUePddPEMzpublVZqHxhqduTwg7H7uKiw76rKqgjqdA2XTsoZv5D2LM1cqeUAWNjVDCdBSh1AkhpCqWxXyRwRaZcfQCgjdLh5sLq9M65TCTDGBoIRwoX0O5fd67wj94Xrjv1znBj7Ocan6nojML5sUv17y9o1dW1gzUJGYHXb6PNaHFflYG%2FhN0i3%2BW42f5HWl2xqK2V1SPUjQykMcU7ju6G&X-Amz-Signature=60ed6a985d8712076e75d586df2bf4290bf89d9dea44eed2c04151dbb253e87b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

