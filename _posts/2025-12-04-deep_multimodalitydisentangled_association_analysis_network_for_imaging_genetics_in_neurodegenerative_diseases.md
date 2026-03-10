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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667ABWWJP%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDALQi9ykvCRUxJ2gZtZPbNABkGOa%2FOoZ205hvnJwBVVAIhALXJxNIBbeQYctDLSy7Fp7A3Bcdpz9Letcp5o%2Bmn0K9%2BKv8DCEgQABoMNjM3NDIzMTgzODA1IgymOlU8V9zV6qN0xc8q3ANMO7lCmUH9DkGpNQrVk%2ByC1KVyCx9QFRb2nHjfXzZKIDU1ZhK%2F%2BpJXIUBUpTJr54X6z%2FDMJMVqc43K47ECaK26sUBmC732HX7ubzp43OM40gkEKWxAJ1j9cdED5W8anBsvjgtO5bvmIPnKUQ3zyIYjjaP1v5EWIR%2BMD2FsOt3qc5aCYVZ%2FdqvHFxo8wNiPRYIKcUPD8ZrIPq%2BuwORQIQU7JvT5YcTjuNqnRPiNugd80ZKLHQ1CxuiccWxfJu1EoqRXfFc5UiEWVPhbDt%2FGV2eO4gJleTNQVUsRaxbx%2FkUapGfdLiUG7n%2BFkK3NB3a0ajbBY5qdk7KoI7cEslxr8cEbfR2%2BXUSoQhuCmW88W%2BzCnQz5Mi%2BYv9hD27R9Tu%2BM13GRnrF50sJza6Qvu6KMW95ua%2FN%2BIVlFzG2LlMlBjS6pKNb7wXoQoUMe2POr3DOhfZrGT1XaFr49xhdw1C0oEuOg0bj3nIEya9cHyEh6%2FLUGLVRJvom4nLrf3cyMmxrDPSY1s3RK8z6nyYyxABuBsRRoDcQDPshYKWPLw%2F%2FRRstcxhSXpX7QjHvl4OtL08yW%2BX6aBDaiwJEtyZ54VfKsPdtm8AVi%2BbIpeX3EWIzOp33klpZNgKZGtYueMf8BmDDm1MDNBjqkAcJUU8tCNpfRcRCL7WA73BgHnZQu1calLmwDPnSFzosJXSJ2o85RiJNbIbqVcT1TRq2sMMP5Pdtua%2BdY0cHOqklb4LhDuI0uVmW2HjTE80iAMklA5LD7iK1WPDaQ0YuYcUYKmUyR19jkA59RjH1C30uDYJcmidGX1xJQ9KqXAUREVUYPB4Fxj%2BTMK%2BJtsyGoX6tnb6DvhNmNYGyIVzLyTKz6L5EM&X-Amz-Signature=708a467f32616a8e2cd5b81c35fdad13cb7fb7c606cfc41ee0620c26097c8546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667ABWWJP%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDALQi9ykvCRUxJ2gZtZPbNABkGOa%2FOoZ205hvnJwBVVAIhALXJxNIBbeQYctDLSy7Fp7A3Bcdpz9Letcp5o%2Bmn0K9%2BKv8DCEgQABoMNjM3NDIzMTgzODA1IgymOlU8V9zV6qN0xc8q3ANMO7lCmUH9DkGpNQrVk%2ByC1KVyCx9QFRb2nHjfXzZKIDU1ZhK%2F%2BpJXIUBUpTJr54X6z%2FDMJMVqc43K47ECaK26sUBmC732HX7ubzp43OM40gkEKWxAJ1j9cdED5W8anBsvjgtO5bvmIPnKUQ3zyIYjjaP1v5EWIR%2BMD2FsOt3qc5aCYVZ%2FdqvHFxo8wNiPRYIKcUPD8ZrIPq%2BuwORQIQU7JvT5YcTjuNqnRPiNugd80ZKLHQ1CxuiccWxfJu1EoqRXfFc5UiEWVPhbDt%2FGV2eO4gJleTNQVUsRaxbx%2FkUapGfdLiUG7n%2BFkK3NB3a0ajbBY5qdk7KoI7cEslxr8cEbfR2%2BXUSoQhuCmW88W%2BzCnQz5Mi%2BYv9hD27R9Tu%2BM13GRnrF50sJza6Qvu6KMW95ua%2FN%2BIVlFzG2LlMlBjS6pKNb7wXoQoUMe2POr3DOhfZrGT1XaFr49xhdw1C0oEuOg0bj3nIEya9cHyEh6%2FLUGLVRJvom4nLrf3cyMmxrDPSY1s3RK8z6nyYyxABuBsRRoDcQDPshYKWPLw%2F%2FRRstcxhSXpX7QjHvl4OtL08yW%2BX6aBDaiwJEtyZ54VfKsPdtm8AVi%2BbIpeX3EWIzOp33klpZNgKZGtYueMf8BmDDm1MDNBjqkAcJUU8tCNpfRcRCL7WA73BgHnZQu1calLmwDPnSFzosJXSJ2o85RiJNbIbqVcT1TRq2sMMP5Pdtua%2BdY0cHOqklb4LhDuI0uVmW2HjTE80iAMklA5LD7iK1WPDaQ0YuYcUYKmUyR19jkA59RjH1C30uDYJcmidGX1xJQ9KqXAUREVUYPB4Fxj%2BTMK%2BJtsyGoX6tnb6DvhNmNYGyIVzLyTKz6L5EM&X-Amz-Signature=708a467f32616a8e2cd5b81c35fdad13cb7fb7c606cfc41ee0620c26097c8546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIGLGMPQ%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQCeIV6Mg5QYMmyD%2BX%2FQi4onG%2BmDBfhIrwlewL2jGsTcIwIhAJ1sefKTyiV5smYSoqkErU9jfSmYCk3%2Bm0hlTWPiEyqRKv8DCEgQABoMNjM3NDIzMTgzODA1Igwyi6HB9zbXaO9OBOsq3AMwh%2FBA%2BpeV%2F8SSExmanZiudjdOonhRrjI4mw9xg8dqmJnV3yvIOj%2FnMGxiN40lIMy3K1Czw97vYmB64Tnkr%2F7oL6I7r7yPwwsKqo%2Ff46zqukOZr3xRgGzzgCVSJsK%2FvcSdOS2FqVfXW7hn819VcDJqhv%2BfUiZWdlQYb9iaB4J7ZW0s0%2FQX0isu6e%2FYGybT1R6vDTVjUbDnRUwVHebDfS1%2Bcyn5SqiIVFc4Do%2FPBmu4%2Fd2fTZIgfUzN9esWFsvrkO2QMWDtb7N85GgSiG1Q3Br5DoWcN4TbT2e9IqvvHIvqOY55EoopFry4YOal%2FVQdyMdVUFJBQv6tVaiFkfGlwKGPQgjFqAfd4OsTnxD1ldJavjbTecWU5xzklbDcR7GBxjik86oMSMJ8571FpHlZFG9CzUX%2Bm2p0J85lc14mDk9%2FtZr%2F59uMFRSnAMIIQodrr0HXVlDVH3q6BpEKGqSCu9COedM9WNPeQ%2Fh0hgXf0rnw8jhXi%2BNjMo97lx2UObU22RMI%2BLMSmlOJ4Gf80Ou31zMwmeJtrvy%2BjitnzTx73vCfZ8JCgHaATSUsbQle26S8tF1hbK2uoTi6BJPGyn8pZ290gV8yyKUHB3zjd%2Bso%2FKzYSSic4fYAkGT7FhQ7pDDe1cDNBjqkARkz3coVE95Cib5v4RQ%2B6wvmNJ3Iy9H4sYb4H4Z6N7%2FhCA42G4hd0LqwtcPoi2kf0wWUwUOEZPULWgS6C3lBgyCwS%2F1ATxF772210uBYptc6ss5AtSd6TZetI9jUepmcA7y0a1bIxvI5mpWNWeUBUgo5i59wrbD7jaqIZSkERtfewVpbc8j4gkw%2FyAvftb7kjsoBBeQzEuuSrUf4abLE0ioDORlD&X-Amz-Signature=71c37882ffeeb1d5b3b7de81d08ab126e5a34af6cd9dde5cc430f4bb4df9dfc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKPP5TFB%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCKgRc7%2BKmkusd8E6MjI9ACZfvfTzMKPp2sqwW7FibwcgIgfBNa62N9TmvY8YKDXOHyBK4%2FCNR5cpzZNzUhSKtP21gq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDBEr36G7QtCgl4OKWircAwuqkcO1LAzbQypfNuOydk2aDokDmjwppfGum3%2Bs95fvQPX8klKZIEAIFN8ennoG5HiDfyPQuYJVA395uj12T97EiFgYkoAYNKMZBGY%2FaTd02J%2FHPT1KgGUuUaUlvNJrH%2FhH1fz%2FBRX5wIRZ86kf1dZqQ1Mxf8gaFe%2BOsYmGEAED%2F2cJR5sJhL537ZPDCIRb%2Fgb39iQfwTQ6Y0xEEHzzolV5pHnlKkQIfHR7IYYscacbmwMDIJme9w%2FfG0%2BMgvUrhKSabLk8vqA67zf0kxZIrL6Nxcp%2F3dyF7r1g%2BW5sgeJv9K0vVPQA8ozqSZYy8I1np06DxtU5gzkwOCCjvcYKrSd1u6jDXF4ztKM1MDgtP7UHYWj%2FOQVSb6BnOp4Lz%2FumXQ%2FChw1O1u4a1trVx4at4PGCXy3e3qiBmuW13STNTcAyjojt%2BQ9bgNwCwRyvc0%2FFGXnpAOxaXMrtGy26wHW%2B4RzOiMmyhgZDb2IIkomzCOi2RkjUt7pJGBhQcFfPT9Bnk%2Bte3IoEXKT%2FnP5PIeMMeDKJ1sZ9u8dvK78xKY4hR8xqiifqL3ZSnK2jo30GGh4DcSidgQyWujWsFyISpYA66iMDvFwat%2B3vN2w1txp6%2BRvUd53FX8PqgjvDGLUWMN%2FWwM0GOqUBOBuLYa6A16ypyLKVOVpIh03KmWiWpKWLNEethA%2FLTwQZSdSbJ%2FujI2jIXafT9lhYZfFHxsNpbrjq8R3NqPNhQd3cPgfqq%2F01N4u5AaZYwHmhmodfSzU7mNOSIe1sKj6umaIk%2FcoZUAXrtgMebIWEtf6eqeBAatajIdD7A%2FVNqQoqKaL636DwByYrf%2FUZMHKTxbg%2FJUalRcAyQRsyEuVIO3eKRHaO&X-Amz-Signature=6954bdb77e379d166f2ce381602b03f16cfb4bd7d1048cbc04b2edd197b21032&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKPP5TFB%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCKgRc7%2BKmkusd8E6MjI9ACZfvfTzMKPp2sqwW7FibwcgIgfBNa62N9TmvY8YKDXOHyBK4%2FCNR5cpzZNzUhSKtP21gq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDBEr36G7QtCgl4OKWircAwuqkcO1LAzbQypfNuOydk2aDokDmjwppfGum3%2Bs95fvQPX8klKZIEAIFN8ennoG5HiDfyPQuYJVA395uj12T97EiFgYkoAYNKMZBGY%2FaTd02J%2FHPT1KgGUuUaUlvNJrH%2FhH1fz%2FBRX5wIRZ86kf1dZqQ1Mxf8gaFe%2BOsYmGEAED%2F2cJR5sJhL537ZPDCIRb%2Fgb39iQfwTQ6Y0xEEHzzolV5pHnlKkQIfHR7IYYscacbmwMDIJme9w%2FfG0%2BMgvUrhKSabLk8vqA67zf0kxZIrL6Nxcp%2F3dyF7r1g%2BW5sgeJv9K0vVPQA8ozqSZYy8I1np06DxtU5gzkwOCCjvcYKrSd1u6jDXF4ztKM1MDgtP7UHYWj%2FOQVSb6BnOp4Lz%2FumXQ%2FChw1O1u4a1trVx4at4PGCXy3e3qiBmuW13STNTcAyjojt%2BQ9bgNwCwRyvc0%2FFGXnpAOxaXMrtGy26wHW%2B4RzOiMmyhgZDb2IIkomzCOi2RkjUt7pJGBhQcFfPT9Bnk%2Bte3IoEXKT%2FnP5PIeMMeDKJ1sZ9u8dvK78xKY4hR8xqiifqL3ZSnK2jo30GGh4DcSidgQyWujWsFyISpYA66iMDvFwat%2B3vN2w1txp6%2BRvUd53FX8PqgjvDGLUWMN%2FWwM0GOqUBOBuLYa6A16ypyLKVOVpIh03KmWiWpKWLNEethA%2FLTwQZSdSbJ%2FujI2jIXafT9lhYZfFHxsNpbrjq8R3NqPNhQd3cPgfqq%2F01N4u5AaZYwHmhmodfSzU7mNOSIe1sKj6umaIk%2FcoZUAXrtgMebIWEtf6eqeBAatajIdD7A%2FVNqQoqKaL636DwByYrf%2FUZMHKTxbg%2FJUalRcAyQRsyEuVIO3eKRHaO&X-Amz-Signature=7a63a2e44b37d8bdde748bb08c734f954341f3d53283f077695b1f9043772d2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRKL6MG6%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDrqn64UvHaVKpaB775hwyKhtEzdoZ57oKOKf9NISrepQIhALHTK6st2AM0gJ3%2F%2BRkIs5FfuiYhea24zNoSR1KmkdFKKv8DCEgQABoMNjM3NDIzMTgzODA1IgzpVXhPjwaA%2F7DD1PAq3APq4WNJa%2Fo%2Ffk2ZBAXdrtRgJnFlRHt84AOnyUhexDY62QT5PFGnnxT5OJx2v3nutMSY70DtH1HRE%2FRymtwzGQVMIJFMftqAHyznmTY%2FyBjxuKBLJigVNXhlgoRZMZaDM0dj%2FKbz%2BNq4X7awQwxR3tMJ7kGETl%2FaLIe4BrfCCXj47rrW4Oc8gYvfKHpQvwa0wqlpWH1CP2gh20stBAc0zg02CgIe8iOZ1L9SI3K2x1CxFUWLNH3GlUyOn3df1v360cuu3r3S71Pu1DjWZ1ElGFYMScX2lQO96xOxAyk1yUYiK69AnhcsV0uUqMLpPLKZBw7V8wt75Tf8VZW7Mz%2B%2FDTPJxOn4Vo8hD5zcteJH0ttz8udUObfSER%2BkgNq%2B2q3Xq8QxnSRgXSG7Aa%2B6KME8SwDnjlVSEFxjVI5YC6q26YN5ZggygEBoCe2HQyPVdb5Id2QFTZk%2FHw4WrAKIawCUbKF1DFhP3263bmdIPbPyBcOGTu8hBM2EPIxHQQce%2BIx%2FeKA6v9Z7E3wyXyK0BL7nS%2BBrL1ezv1PKtkOsBLyW8HNxPwAPdhrqysSK3cTEYfm6Wfadkx3Pb0p3IsKAaaRzQWVV0GJad6eVvwh6pLFs2qz0h0x9VLBZ29ruPScPkjCm1cDNBjqkAYGqe6Sr7Vy13vp4IDUkhj32NeAb76xiziJkPQXfRUMQaTkENC7PX43eb7N1aAWA%2BJrEtRZgExlpfi0C8R64%2Fda9xwFo6KmB34nbpyQu7CGa1mir1ulDROyrLVf8KykUEzj%2BZXZRvMl66dBYrEWwhVXKEOgtAHA0%2FTpX5CtT1s7GVObAiqXpjwBf89OuRPIahSJz7GgT%2BeUi%2FExptioHIa5ztI2p&X-Amz-Signature=39a55a98e1ade57d06ae398a658287934dd66b4ebeadec98106fca8fab547108&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDXWSU6U%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDXfZm%2B%2ByKGRYH%2F5F94nbhcdobZSpON0oQMkF62jkCijgIhAO%2BdtxdKwNeWvwQ86XANqOE5%2FObdL%2F6oXxfl5RFk8XZGKv8DCEgQABoMNjM3NDIzMTgzODA1IgxCHKiCJ73wRXwweVkq3APiZEjhVX9oFDF%2FN0QxfYeEJM4ZDvOrf41BnzU6gnHmWc9hUE%2BG4%2FERynNDv8zMRl7aqntwRNqc5PcWm8VDsNdWZOqwB%2BvI9ewXGaFlC0DG944TwpFXalgUoV31jg0qXqpWkzYTcSTVUmfXyaWm3fd6wcQdK9wdZXsgv2IfZFVv9HJQ21XVtXTMkKfCJ40gt0YJSRpTTsvXzBgW2ao3R1uatwh2DmIny%2FLHbfVvPA%2BZHUr10rtQVsqXJIWTyks3KeCfmV%2BstzJKS0aisph%2FE1EnlJ5nt5eWRIDWprNQsZw35W4qvdT2rFj2rqMpQFx%2FE3I%2Fqx0ZtVDMaNOBFAIWCKGsIzk5JKUcLGL9optYfv5CC81WJJDORQrWiOKlSt2mLXn2oO1UaiF5Zi1TomO4dJxir4qDxjjhzuS3CmkU7v65CIUbnz43M%2FzTIy1v4z257sqLudRi7VCwEHHd%2B3%2FNvyGrYrpE8PEShuvNStJ3BQDWhl%2BWzzlEz8lXOyuAjUlEt0PYXbjM8PyIoAmxa%2Ffm%2F8AYnf5dacPsPhpXlkC5249HZSZOAShlgginRhPegA5RmM4E3vbxhWIaWEI5bRmZz9zGrOyXBl7jr%2BGF6AHProYP2ZzaNz2EmhZk8kDdrzCb1cDNBjqkAYU5TagmFc%2ByzSr4h6%2FENP6Um5sQUaMgt%2FKku%2BBx1J1lCxL6bzZk6XOqcYu4VTKgOV32uTI7f5CGGp%2BT6BzzEG94y8NOh%2B2Je9iduv3YKlePT9vjomoRGiccNgnV3mPBn%2Fs5T4RE26PuVEzjsyk9PG954rkc3B%2Fi84AKkkeIUzIiI5ZDHng1BkNRFGOZwj4AvbB%2B4l8EbKpPyJpJZv0oo1C5OYXe&X-Amz-Signature=3cf9c2cb09e5ef4eb2177176552bb5f7acca7be7c40f3725b754577dedba642c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBBK5UT7%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDPKklSBiKkNbjp2QLjLxU1dp1Ldbz%2FJGpnE0ydJ2otrAIgOg1X458JZ3vuPxcNkeOwj07VP5tZAACp5Wx9%2FrzQH44q%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDLK8dSRODSJJoaMDlircA7S0yH%2F7ux8CmGQ7T5mYRaZgYYUTHz9YQWe78NqLKN33tZ5bTk1SQ2Y%2Bm9o6zSHVzXaJIhUwHa1L442htq5RYatWO1UMUqJX86qtM1VKaH%2FS8r5tJvG0EK9dqEeOJVFq%2BNoeEreZtgo41UReWsGM3H4Ekf3RetVQV0JdX6L0Q%2B5wqaLj0yTa1Lh0fdRiDdxU3aHUOIR7ezXxdSAcAHAzkKV77gDcelyXTenT%2B%2BnsSCN5lvL82h7L8zt6ClqnaG4VZ2uGzkntXgrwjEfuH6ASeq5E2b03fmHmB8E69j4n569n71VuCvoP0eSndLUSuWqwP4ebPdkHbIhqvJhjDeUovlybeqHxF%2F%2F%2BoGJnCnJsDLEzfbYdEZkTJZcwnIyhqT0Pnm%2Bv3q9uTBx0uqqQgZ4cgj7QG0TAuYLiTDlga4z62kcTTXTUnDuCCG4s7JL6l%2Fvfg9r0%2Fv4CH%2FCzS6MczTRa5hXXV9SmXidDZvHSaOP%2B99KBA1BSYVXPZ%2BhjpDUw1Pmapojk5tRf4fBNU%2BhR59IzF1WOfLww8uhkQlhvRgZ12ETr%2Fj4PySI%2F9aC7XzwAwdGHgs9d0ztmfvWW1Eo9RTri7cSB8Wf4i282twv8D0y5eS6FQJnxYKF%2BKfkR%2B3e0MNnUwM0GOqUBfG4tASqtNUKCO%2FNRUc16pO9iCMrxeATYZqsQL%2B7Xg6bEsd0s06yIsBmtgDuSSAnFVgNlP2bCXsGwDJPfoq9RS%2FH36rreR6r8CrQa3aCVbCXMvfvKYaq9iSEOMDT3X7CLzQC3D6z0ZaGJqMDWNulMu81xYZ5bmhZltECH%2BqGX54SnX2qjposH6sTfNN%2BYIfelL3ZP3dQa98uUjhT%2Brjeam%2Be5klcW&X-Amz-Signature=f792d475d997870036f5e3e987042ad4b0a8ca11786e4b8fc717ce883c8a509a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYGJ5ZJV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQC0EKYxqZZInY4NDKcYHcfT63dCXrQWvEpRjZ5evzk%2BLQIhAKgPZPhks04z57fv4oS8H9r1HCFMPl3Bbg2M4FZsPg3LKv8DCEgQABoMNjM3NDIzMTgzODA1IgxDd1b61XDYXvFtP5gq3AOOzpSEJyC%2FPfO4827L0aKUpe498zoUoOePe7bnfCJDW%2BJ5AdGPmVE6BlvAFiztmPj3wtmh4QqRLR4bwYQuqxcfkjBDtRY7W4aMEb89nI98Abg2AEh2lLULgC30HT11%2F34TxUSvF1Wf2%2FuY4L8KER%2FASuDymfv3BR6Z5EzqCKmUB5zKsqiLnBkAYJ5LKBUtI6ny9iToszBtchpdcRMzFyIMBlms0r0Ymx85AZM59zrY7oKDEEl61jWBY9%2BzQDpvAwLTAgOiVx6shqgiva1ifrSkWhoSCwq76bs39NKVFkHTVeUPRodmI6zJWcpM4iUZOnwjXMWNw7XJeglnPiC5W7PiVzuf4JgCLJ%2BIz6QKps5YdgEWTGiTPPkPujkgX6%2BE%2F9VhpNTy%2Fk3qz5AKKqW8fQLq%2F%2BhW%2BpKWNAguObjX6iVq2LxWFWTsik9dgQtewrj7Erz3fzxNUqPpmhdseJRI2qCgV4LcZnYdZWJx01u8kFSFqZ4Exzbx87OHI3pjsrJpSs0M9PV%2BJue%2BXWfw%2B7yvQ7TYQODVWRq%2Bi3q%2BnHNBhZeCBH9TPxYgw1S9o3y5vN9dnUZCYRavV1iohaT9kVTDmuyrErRcrmGDFJ3klJo3UAr8XygWeZnE2o3y5FJJiDDt1sDNBjqkAZwywkFbQIfForNRFtCvJJtrSbWk2cFu5JfW9HqyLgyN1uuoV8OwqMsn7kBzK%2BuQB8%2F3UOxw93I%2Be1rok%2B69oFlUhh%2BMHAUXkoF9E2MeQ87v1z%2Fee3466eR4ctKXwyBMfjCBaGCiRKkXEgNQj1ZOLeKd8VxVksU7ZUmB7eqlNKsjnM13CBjXJFVbY3kLiaIeX2j4ZRvJpJmMXJck7La8aUXWQtNb&X-Amz-Signature=cc54a2bd7d51c0b0bec4824d6e463a6eccc94466af842cfdd8d3800afcd0eb88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYGJ5ZJV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQC0EKYxqZZInY4NDKcYHcfT63dCXrQWvEpRjZ5evzk%2BLQIhAKgPZPhks04z57fv4oS8H9r1HCFMPl3Bbg2M4FZsPg3LKv8DCEgQABoMNjM3NDIzMTgzODA1IgxDd1b61XDYXvFtP5gq3AOOzpSEJyC%2FPfO4827L0aKUpe498zoUoOePe7bnfCJDW%2BJ5AdGPmVE6BlvAFiztmPj3wtmh4QqRLR4bwYQuqxcfkjBDtRY7W4aMEb89nI98Abg2AEh2lLULgC30HT11%2F34TxUSvF1Wf2%2FuY4L8KER%2FASuDymfv3BR6Z5EzqCKmUB5zKsqiLnBkAYJ5LKBUtI6ny9iToszBtchpdcRMzFyIMBlms0r0Ymx85AZM59zrY7oKDEEl61jWBY9%2BzQDpvAwLTAgOiVx6shqgiva1ifrSkWhoSCwq76bs39NKVFkHTVeUPRodmI6zJWcpM4iUZOnwjXMWNw7XJeglnPiC5W7PiVzuf4JgCLJ%2BIz6QKps5YdgEWTGiTPPkPujkgX6%2BE%2F9VhpNTy%2Fk3qz5AKKqW8fQLq%2F%2BhW%2BpKWNAguObjX6iVq2LxWFWTsik9dgQtewrj7Erz3fzxNUqPpmhdseJRI2qCgV4LcZnYdZWJx01u8kFSFqZ4Exzbx87OHI3pjsrJpSs0M9PV%2BJue%2BXWfw%2B7yvQ7TYQODVWRq%2Bi3q%2BnHNBhZeCBH9TPxYgw1S9o3y5vN9dnUZCYRavV1iohaT9kVTDmuyrErRcrmGDFJ3klJo3UAr8XygWeZnE2o3y5FJJiDDt1sDNBjqkAZwywkFbQIfForNRFtCvJJtrSbWk2cFu5JfW9HqyLgyN1uuoV8OwqMsn7kBzK%2BuQB8%2F3UOxw93I%2Be1rok%2B69oFlUhh%2BMHAUXkoF9E2MeQ87v1z%2Fee3466eR4ctKXwyBMfjCBaGCiRKkXEgNQj1ZOLeKd8VxVksU7ZUmB7eqlNKsjnM13CBjXJFVbY3kLiaIeX2j4ZRvJpJmMXJck7La8aUXWQtNb&X-Amz-Signature=c1d51c912e9683a5528787b4d885d84b211876c47252bb9528e6f8958889af13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656O4G3SG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIEcekKF1sw9A0LCfPmDTP43aXV2EarlInzEsH%2BWsX0zfAiANS3VE6ZuP7bppoGY9kHL2G7aVvaeo8MenKATliaXZSir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMhGMY2ckiryCHazw9KtwDBzfQl2YLhLIZ6Nf%2Fh4l8sKz3pRQU2WyIRV7gAF9tDhTQfgoeHtHfDjkYKOHfl%2BB3Clgg7tjJFdFOFXxCzCe93WcIsClPet1tYS3yOWS6cB2ywXl%2BYjp2C5KvLF43GGcQMZbGi847SAUCRqhpv7QlKC8rJmvBWKrCZTX1ciuHTH%2BCdS5aTYhV%2Fu3d%2FoqrUNztfXEDAEAnQ4lv5N9QL%2F5b%2BygryD24UI9RDhBwVD4ZZb0ikMV9g3jxGhJYDcte5CiJATTb1aWkhDqmDGHQIxx%2BwBu%2BlsoT1X3RTNct5QpvM%2BWmKVSiG87sttvIwscZmuqnZZSyQa5ol5maFQV0Hmf79Cp0UPRhkEgAL4wBW9urXCC7cpG16565WmXi3XJvtoqYsQKop8AbzX%2F5Xp75ffexy2pjmL%2B18ZPpN6LGSFLafPMQcOPgQ2kopz%2B8K7aIH1TubKadcRHSQTo09L2XApBjCJVeSizDDKaL5UiwQNNWnEXOD8t%2FC5PuZV8chMS7ykP5ye2gS7F7nibnmhZPwwgrO6Hs1hXp%2Bf8LdtJkEo4U7h6CJ8lwWHmxBHDv5Jqtj7wsWsah%2FgRRpCA7vcXmS3nxMxBWQo4M3Y9pC0YXfJKhQgB2bfTMlKGF%2F4A0pikw3tXAzQY6pgH7tUBN1zMHiRsQ2Iu0Ve4t06Ccvf8URrfHzBmG1QYHYCEz9p2n9zSsb0nHAl9Eg4rE2c1UvT9%2FONs1nNq7FrElBJ8HTyP7Jsj%2B3nt3DgfP%2FPKJ3LKkdBEAvLd2pnsHYEcwNY6fmE9Qi9aQtCqQACq%2FIvVKXfamBuPNEw8arQBliTQoChkng%2B%2BzmUK%2FUJEb5XxUP84ZbPKqL0VIqZwYc8ZMFbfa6yv8&X-Amz-Signature=eced9d91822eb1f831be3316ea6c2cdcc3a1f13a2eb5d2e7e3a5e790a7255e8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KBOHHO6%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIEtqRboWF6oCtTk9WtzG5knbQVlaa1ZB9chjJB8ltfYYAiA3oMSYxc2b%2B6jwpC5RD1lHs%2FaUMMMrcVpjKOEpX0SXHyr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMJ4%2BIYdm7oXCpt3UeKtwDZejbEmsm5UzRYOdmGVfUMtWN7k4nCMkUN%2FvkKT2Nb5dddnxbgFMgI34BADrDIIo%2Fz49l4IMDo7N80y8UT%2B7YpHCdhzCvdCl636eFMrVORqer7%2FvkaTnTLvkayvffCLYFsFT1s2N9GkJVkn%2BnbsYBPLEJVl6QiUQJFb1LWvIOJZwn%2Bf%2Bs2%2BFKcBKfT8guHZxtWRO1UQezveLXMuAk8emVklbFIklvIJLe%2FmlOcgRftMjiG5bjcl7olAOlPtA0rTkzLrzOWoK75HmlCvfd7thPhsGyRXbkjC6KcYmC0zzFYDGvFWMBt1eUj0YEeAITsEWL0Gb5UV21qe4i4%2FfZ9kZk46bVYM6ac0V2QnicVj0GxrbirKRQvDt%2FfjZalCSnnwOA3ZOr%2FfNUGvCvOLEO3A526Vt9i%2BHs0IZouC6B0o5oFyngcA9iQmVwbm0BEsdjnRpq%2BDmnRhYbPRKRwRTSMfdd9lwU7bB2S7xOjbbtcoFLT856HCoI%2FN77bwwQUQBhASexoNRyvUwvpHWq%2BK4ST2or3w0SxhUSgCmi7OKxMbjK%2FdbhpyDCjlCE710ZWahW1cMrCvxlavulH8K2wRaUwiM2zOhQVc4gmGsI3juCDazKTDHNEwnr05R7jBdxlqowg9XAzQY6pgHQgFldhLo%2BaPs7KDMOAiysLTPSdBwGhjN3eqbn0Qp0eZjp6Ov619U7wYcTYQA6SW38X6Shr4G0Zuku4DuldchIb5S8cBXcMME1Nz34pfOIdSQedZI72eXVniNdYAZxrguU%2BLa1TYKsEYspzk0c2TC14oG2svBTuF7nwhvPlE2w8CMDyfjEVF7gOCZaSTvGMCzLOTCP14E5EoEW02lQq1QX1nl8fHb4&X-Amz-Signature=3631b2a76b785020e558a9678d3a5f02d5187a5f4473d983c577a2ab609eec60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KBOHHO6%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIEtqRboWF6oCtTk9WtzG5knbQVlaa1ZB9chjJB8ltfYYAiA3oMSYxc2b%2B6jwpC5RD1lHs%2FaUMMMrcVpjKOEpX0SXHyr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMJ4%2BIYdm7oXCpt3UeKtwDZejbEmsm5UzRYOdmGVfUMtWN7k4nCMkUN%2FvkKT2Nb5dddnxbgFMgI34BADrDIIo%2Fz49l4IMDo7N80y8UT%2B7YpHCdhzCvdCl636eFMrVORqer7%2FvkaTnTLvkayvffCLYFsFT1s2N9GkJVkn%2BnbsYBPLEJVl6QiUQJFb1LWvIOJZwn%2Bf%2Bs2%2BFKcBKfT8guHZxtWRO1UQezveLXMuAk8emVklbFIklvIJLe%2FmlOcgRftMjiG5bjcl7olAOlPtA0rTkzLrzOWoK75HmlCvfd7thPhsGyRXbkjC6KcYmC0zzFYDGvFWMBt1eUj0YEeAITsEWL0Gb5UV21qe4i4%2FfZ9kZk46bVYM6ac0V2QnicVj0GxrbirKRQvDt%2FfjZalCSnnwOA3ZOr%2FfNUGvCvOLEO3A526Vt9i%2BHs0IZouC6B0o5oFyngcA9iQmVwbm0BEsdjnRpq%2BDmnRhYbPRKRwRTSMfdd9lwU7bB2S7xOjbbtcoFLT856HCoI%2FN77bwwQUQBhASexoNRyvUwvpHWq%2BK4ST2or3w0SxhUSgCmi7OKxMbjK%2FdbhpyDCjlCE710ZWahW1cMrCvxlavulH8K2wRaUwiM2zOhQVc4gmGsI3juCDazKTDHNEwnr05R7jBdxlqowg9XAzQY6pgHQgFldhLo%2BaPs7KDMOAiysLTPSdBwGhjN3eqbn0Qp0eZjp6Ov619U7wYcTYQA6SW38X6Shr4G0Zuku4DuldchIb5S8cBXcMME1Nz34pfOIdSQedZI72eXVniNdYAZxrguU%2BLa1TYKsEYspzk0c2TC14oG2svBTuF7nwhvPlE2w8CMDyfjEVF7gOCZaSTvGMCzLOTCP14E5EoEW02lQq1QX1nl8fHb4&X-Amz-Signature=3631b2a76b785020e558a9678d3a5f02d5187a5f4473d983c577a2ab609eec60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TAQSMZY%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T143704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDcZR2CMwQqRjSKI0TaZwsIxhUZwEPxx6nFvUNmi%2FAm5AIhAKlv0FDsBoj6fIwG5NHiISIv6ngRCONjXOIOsmxotsAqKv8DCEcQABoMNjM3NDIzMTgzODA1IgzOwd6Jsowfu%2Ff0bXwq3APYccn4QQnhQHjkCL%2F7ljm%2BVD%2FVZRUZSGe4HUkgssbbmb6u33DE2DNEcdlw2V0jfUDZVdO9FNF8NQXlA9tQ%2BKoionmpsh2Mzmed7unEqnBGbDI6Eoa3pkUsls%2Bwtc7JlyfoHgd9ZUmsEB3EmauOpTtdFyfjicXO1mY5UnVJVkMC%2BUT0Y5IJbhF1GyH%2F645%2BPyd7SOLtvdULdwMXdsXMeY4ddL22%2Fq4GUH5S0nIOVpP9C1Xpjbp%2FKhYB9%2FVnpX6lvG8jf0gBrJZTjZ4vZ7di1pe0PXQOoZ9z%2FU3IwNEC7DdL%2BVXWhzT42%2B3k5qiATPr%2FKNl1Wh8kD3kTOHfGy2NhrNENnV7S0UDYnn%2FhrJukLBsOz8R0yb2kqnb3CguY5axe05fEcLuQlmc5fHaUdfguNLcX5qLNYK9R3Cp0klwpGQyQZNj1bOHZfx5cI3SeaJdS2EuG%2FMqVUJeztV%2BQaMJWmudVFNWOaMWM82FXfkir%2BcFFS401CufneOjMYQU2nTgwLpuAcJBf%2FX%2BZ%2FE6l1JrNr49lH7rZFm%2ByHDJUS0Km0mTPDLb94VaiF3a7rgyHa8kmxaXNq0puFhRjuNxDZgmpX9KQQG5mxi5BoAL0OUmJar90aGDRTQec7SKeOuuWijCH1cDNBjqkAcR2NFwRZWVx6DMgLRQNYUcQ8MM6cQZZ42Z1lwSE49FP2uNRMEd0QYxEjrlifidtgkMZtrQBQgqM0YvzuBceCB0iCrrGXRjXon8DEhxxcBdR1149qk%2BNyyAo02Qt3K2NmssYnOGy%2BaQO7PAG%2F20Kx3dflLQEcmVCxH2g0vf28DWh%2FvfmP%2BmZYNtOM%2BMk9Q5k1pL3ww6HzVHKFs1Wkovi4z1HuHZt&X-Amz-Signature=85e9c8eb3734d7ecc8fd34b3aef857a6418a3eadeac752eeec3cbb68908b612c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

