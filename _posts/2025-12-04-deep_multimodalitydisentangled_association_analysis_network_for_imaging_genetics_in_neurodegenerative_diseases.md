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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHYKQTWH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCNmx3IVkAdnunILWwNZBL%2F3s%2FUIRi1GALB4HCsov2JyAIgfINrtoBy%2BCCiejTII0imO5AkrJa%2BEDsXcuyaad9LnyUq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDBY8WBUPsAIvZo4mbyrcA5o42dqL4o3p2VcmI6Nikib3MumZRjGmPcuw0XMYWqcn2NRohV02GMHHHzivocKwnO2UT0MI4L0v%2F2lIlRERJhzNMYKpfuXbf7VzWb4Fd3IIHIa8RbDY6SJAwcmT7ti%2Frv%2FGgMir41Cp92rdeUF1l9U7gm78VVqPiNzmjiPx2pHQ1HMu11cEIHlrOKNF61fTEx%2B5FqtWM4a9CHzw7xfJqS6ZaIPjbyLO0PUpPvI7OhSUGwpK17vvxq2v3XQC2kAvF3JwJ9za4hzirtHsCX5FvGRZ41ewqLRaTC1Dd4oslBGLBDOkwvOT9Th%2BCY%2FXGRHZ38%2BFxiea%2BXaquHnc7Q0ZAAPWewO2liDQbco6pz6ryxIWMi9rGHjTj%2BEcAyIu4JVLePAUM7CsCgbQbk1KwBO0OUrvUv7s8dMuKU%2FKhP9wvq3awV9JG9Waj9mg2WJ0QEwhgjscXXR%2BvcTBOB09pkKnC8AVoUtLz9R%2BKDgTkDOSC2684VQhe11zZ%2FE2lqaZSNCtMnV1ciMs6DiLr7V2x%2FsCBt%2FBKNNMOfR5k7tj8ed8NG35CnZQBaqFFyIDwLAQo50jcMYxzoiAFJ4Ht7w522zsgWdJTKAmhl7P2i27846Bu5hEU06wl8pDyRZSZAVcMPj92csGOqUBMXhBhnc1dZIugN4HO6%2FGacCs6%2BSiqJUHIKF8FbcdBl2McIhC1X2aRWUf7yQ7cZ3eUQao%2B6raBeQhrBtdBtf6BHxNwyDHzvQAIDSoo5LS1YIAiR0%2FxNIJUcYuC6O3LwwblV%2FTZ2byNavfRknzNp74yuK0%2F66xRQnMIYxfa%2B5PxsmtOVwvUmYd15X92w6nE0znCHxzWSsLjvAwXhLuXajJwC9a2NAy&X-Amz-Signature=77dff4e4c86328fdcf5a365f5fbeac08274b5b4f0c741c5b31e8f3a9ebf5abb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHYKQTWH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQCNmx3IVkAdnunILWwNZBL%2F3s%2FUIRi1GALB4HCsov2JyAIgfINrtoBy%2BCCiejTII0imO5AkrJa%2BEDsXcuyaad9LnyUq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDBY8WBUPsAIvZo4mbyrcA5o42dqL4o3p2VcmI6Nikib3MumZRjGmPcuw0XMYWqcn2NRohV02GMHHHzivocKwnO2UT0MI4L0v%2F2lIlRERJhzNMYKpfuXbf7VzWb4Fd3IIHIa8RbDY6SJAwcmT7ti%2Frv%2FGgMir41Cp92rdeUF1l9U7gm78VVqPiNzmjiPx2pHQ1HMu11cEIHlrOKNF61fTEx%2B5FqtWM4a9CHzw7xfJqS6ZaIPjbyLO0PUpPvI7OhSUGwpK17vvxq2v3XQC2kAvF3JwJ9za4hzirtHsCX5FvGRZ41ewqLRaTC1Dd4oslBGLBDOkwvOT9Th%2BCY%2FXGRHZ38%2BFxiea%2BXaquHnc7Q0ZAAPWewO2liDQbco6pz6ryxIWMi9rGHjTj%2BEcAyIu4JVLePAUM7CsCgbQbk1KwBO0OUrvUv7s8dMuKU%2FKhP9wvq3awV9JG9Waj9mg2WJ0QEwhgjscXXR%2BvcTBOB09pkKnC8AVoUtLz9R%2BKDgTkDOSC2684VQhe11zZ%2FE2lqaZSNCtMnV1ciMs6DiLr7V2x%2FsCBt%2FBKNNMOfR5k7tj8ed8NG35CnZQBaqFFyIDwLAQo50jcMYxzoiAFJ4Ht7w522zsgWdJTKAmhl7P2i27846Bu5hEU06wl8pDyRZSZAVcMPj92csGOqUBMXhBhnc1dZIugN4HO6%2FGacCs6%2BSiqJUHIKF8FbcdBl2McIhC1X2aRWUf7yQ7cZ3eUQao%2B6raBeQhrBtdBtf6BHxNwyDHzvQAIDSoo5LS1YIAiR0%2FxNIJUcYuC6O3LwwblV%2FTZ2byNavfRknzNp74yuK0%2F66xRQnMIYxfa%2B5PxsmtOVwvUmYd15X92w6nE0znCHxzWSsLjvAwXhLuXajJwC9a2NAy&X-Amz-Signature=77dff4e4c86328fdcf5a365f5fbeac08274b5b4f0c741c5b31e8f3a9ebf5abb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PWW7ME4%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJIMEYCIQCo%2BsVsDpxh7z%2FxdtiSZguTVgBhwIYzFAcu7MtAzdi1UAIhAIb%2BAKk9ho9%2BQj9GosHRgPB8cvi1OnBeGCKogc1VLPxkKv8DCC4QABoMNjM3NDIzMTgzODA1Igypr%2FLQvvlAaRKxGZwq3ANF7cDhQw4wIexKyaRJ9SpZKdVvJseBN5om6GZ%2F5Okgdle%2BzFiXwEpZRH66D8pZgI2TfTf32lt%2FnTyhZulL149OwP3%2Ffs5xf3DM%2BDDKvcOeDRbXVjoYZmdnTa7Xq10E%2FFPe%2BzwQ8TMZjqiOrj46gNzx3mH7d0VAl61xSubAWoD1yiIzTjKsfKB55yvbcW19d7vkecSXlWwHbwGAMWbTQTXwK9gHCMASpanqLM%2BrBfSqLkzTDqdWmSs9qHcox5itya%2F9noyoy14nCEeL%2B4c%2FRgG2jZssCYR%2FXAYZJIRQkO5l8oG8fpJfjVoEVpB8OjHuXsfYzY44kO32GzWSPBT06zgNL3zIvaVaVoGJUSPBUBeqd8UCxZdHlM2Udy4mWHvTdPxL328d43WEGiiP9sG5R4iNhvapZIcyJ2uf5AjDDCMWaLYa3ZceJpjANqa%2FeX%2BYdLeK2ezBSCnVdYHDUUCbAdQ8PDFDSqXSnZ%2FhgtkT8nVIYfi84bG3V7Zql8VXrEL8xOW0Mb833boc2OrTeWt6KmfTv0R2JxO%2BPM5mkPuccnZCgOke%2Fa7zkT2aW1Y03LVPyP8cMFl4qmR2iEi%2BaAfowob33SCZc5h%2Boy%2BvSr1TlJAJeFxEBG6i0RHZblGfkTDq%2FtnLBjqkARbBm%2BdhmLOguiy2fe9O9ZV%2FnNZYJpOTRY%2FX6uCxrdyGdVH2qgxm%2FwhopkUUmY2dutrApzaAJDKrOooSw1IOAGQ%2BpvoLEpc6fN2Km7yzNZBXm7aPVq3k2R5X6r%2BzwCRNELtMDr0zNVkwOUWrWBv7mAQs6aQgbSGNK48Y90AzrcQe%2FfOyXDJAjlx5y0huxJuQTa2F%2BrtRFXsa2uh5Ze0h5ZOJOo%2Fh&X-Amz-Signature=77bccd3bb44aebf9cf29125600c619f2ad9d0f01d62a6480314bc984d44aeb03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMFJ47G2%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCICwqC4ErbEDJyS5TaRkvC%2BBMpmr%2B4UHV%2B%2BJ8xzn9QjZPAiAuKNtWwxA9yfxc%2FmCLe9P82lIZCAJPz6lHVb66sAPKxir%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMdadT8Y9y6U6mZPSlKtwDJulCXMgNhnRziYneL4yTQaz5nC6h1aZdFqYzYxsK7u5SWmcaz5qDzqeuPmbG6cbFWzrM3avLglottDEJ61lpG6WlR2VBjba%2B7aQdIlrLLkk6Qc3CxDpWZCJeDUG1%2FPhovBozYZlBFvW8eCqoQgBXQYMweW%2FeKtN%2FNl%2B2ha3gDpZQCDyVksNln%2FEtEcOveYyPXjJrbJ9NYsZjL%2FsMbvhbsQyWW7BdM33FDmV9RF31dOS4BukxmgEIGQrAf%2Ff6qUh9ABp%2FFeTZG%2FaQaQ6e8LOK7UDZIV2apz6raGZ98tMyvt8z6DWynA1r0%2FTqL0OjPnd%2FDvO%2FXevK0FPaAp1DzNrIbd0FzYbLCH7BncggG95167zeEDBG6Qq4bHhTEKPfoRdOLCUSCVtwBGQxS4j7nEubJCJhlTk8Gj3vaEPTDxMbNDh%2FxDSehmdXTOW3tCifEN4OccNk6CUGi46QOjhh%2FB2fayLjlmEw3td9wuWWQVmR48wc7fhDtLdeyGieueean7809sEWRMExYP2fnYv%2BD1e%2F0vWQL7oslq1J30ATmzBU7Sf%2FVrAwRVIg9CcOnn0vzBwDlK%2Fu1DziLcZXfHRNT4Q4irGiwIhEFj10WD8Qc%2BWfQzJDFWbdP6%2FZAhlhrrMwm%2F%2FZywY6pgGFYbrYgax%2Fw1iCHRXxKMWoUc50LDqfVwIm4UQ5fpCFhmRwC%2BmwQsmtqsyaDuA7jYa7LXTUy9On10M%2BL32wWEJsySndGfoO37nmg6fHA82vZ6DPwrHuuZIc3LILMh0zBcGBVg4n8FMFG37SuWUp1i1kLJjyfiMBOGQsdLq1%2BCQyDZE0P82k16GRV1CcRnrbtrc36mrG3QMj8nrclACJUYycaUt0GniL&X-Amz-Signature=893220d497f5ea60b9079efcf73a8dde64d83ee107450a332b3a12813462aca9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMFJ47G2%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCICwqC4ErbEDJyS5TaRkvC%2BBMpmr%2B4UHV%2B%2BJ8xzn9QjZPAiAuKNtWwxA9yfxc%2FmCLe9P82lIZCAJPz6lHVb66sAPKxir%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMdadT8Y9y6U6mZPSlKtwDJulCXMgNhnRziYneL4yTQaz5nC6h1aZdFqYzYxsK7u5SWmcaz5qDzqeuPmbG6cbFWzrM3avLglottDEJ61lpG6WlR2VBjba%2B7aQdIlrLLkk6Qc3CxDpWZCJeDUG1%2FPhovBozYZlBFvW8eCqoQgBXQYMweW%2FeKtN%2FNl%2B2ha3gDpZQCDyVksNln%2FEtEcOveYyPXjJrbJ9NYsZjL%2FsMbvhbsQyWW7BdM33FDmV9RF31dOS4BukxmgEIGQrAf%2Ff6qUh9ABp%2FFeTZG%2FaQaQ6e8LOK7UDZIV2apz6raGZ98tMyvt8z6DWynA1r0%2FTqL0OjPnd%2FDvO%2FXevK0FPaAp1DzNrIbd0FzYbLCH7BncggG95167zeEDBG6Qq4bHhTEKPfoRdOLCUSCVtwBGQxS4j7nEubJCJhlTk8Gj3vaEPTDxMbNDh%2FxDSehmdXTOW3tCifEN4OccNk6CUGi46QOjhh%2FB2fayLjlmEw3td9wuWWQVmR48wc7fhDtLdeyGieueean7809sEWRMExYP2fnYv%2BD1e%2F0vWQL7oslq1J30ATmzBU7Sf%2FVrAwRVIg9CcOnn0vzBwDlK%2Fu1DziLcZXfHRNT4Q4irGiwIhEFj10WD8Qc%2BWfQzJDFWbdP6%2FZAhlhrrMwm%2F%2FZywY6pgGFYbrYgax%2Fw1iCHRXxKMWoUc50LDqfVwIm4UQ5fpCFhmRwC%2BmwQsmtqsyaDuA7jYa7LXTUy9On10M%2BL32wWEJsySndGfoO37nmg6fHA82vZ6DPwrHuuZIc3LILMh0zBcGBVg4n8FMFG37SuWUp1i1kLJjyfiMBOGQsdLq1%2BCQyDZE0P82k16GRV1CcRnrbtrc36mrG3QMj8nrclACJUYycaUt0GniL&X-Amz-Signature=b2e06a9056cee1dc76bbd106b4a79894c94625a180c9a6cffe42c2257fcee9f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTKIVI56%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCICmD%2FZ4%2Fulw2%2FrTz66uEkgbKHDtvngR%2BMmixqw1aZU0SAiEA%2Bv7o47hxWrjhgy%2BBriYc0JBFYtGn38L3vSh%2BgXe4YJIq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDOElq39Qk7qCo3oWQCrcAyMP8gG4Z7aboPLEEX0SA4NS%2FyKJyP73Cyve07jAwdqun%2FU19SaUWnIY5ZLHkmYj2RrIY2Jc2C1FwCRq64Y3cUXfQ4cNxOnalq22nhlJXBwS%2F7%2BkNWroDp5EiEfXYdfLjrMj7EzLxJ2QPoXmjjN%2B12D2i8zRVIaJpMCscqRlvXm2lQVpqcJaIrLxVc8AgE%2BwntZNOuPLR1W73w7Asl%2F7m2mbILkXTf%2BwAE1A228y9nZWX1IZA8aS2g2sVWb15CvqE5W5KwddHMLLDpvtRcOP3fHb0gfZXFflw1PDjxH99VscogaMh0Co1RnK9TIafvPVEsVe%2F1qwldMT0YgyFWk64AzCPMcTkaLMEE38FhYT8B7%2B4X6Q9JjWm5hg3ppD2%2FAhIEqp778AthYGvIo%2Bl7%2B7xVCdfSzol55iAM5JDhyQjmn5XALDmNfmvuj8BM24haBImpINIH5g74jgRY06mx%2FuazDGjg4mjXAiwKUkx2llSn4w8u2ST6hMO3GE2oNUc%2FSBZrVHYYatp4zoNE6LouJ0vp5nYEofn98ghhWR559QhqgGf69EqkCIMJm21V4SR%2F%2BCYXeKm203EfwDRQw3EXqCbftLEyYeUvvVkOuiEjFrm54l77crtiVr89joG8nVMOr%2B2csGOqUBsx1rLA4cRal8GmdI54DxFjt5s2nzc%2BMVAvs9%2FC4XeVpFrjiGsToUfYmdldltnmmZ%2FNrsYgsIACx%2FEKOFtKoOg4WSxnmSOFaUawayZOtR%2BXodO2rqPwb3xS002WblBsgh0%2FyS71PnyaXtCZFsoSJmQHrP3I%2BM%2BqABLEOXdzi2GTP7w%2B83kvYyx3hA17FobyhfpwndnuCA6BZucUPD%2BpzLs7M9bmIr&X-Amz-Signature=0123cf9cb5116016bf09d8cf5725b387e84f73591d9a6d9f9541d1ea5c688f96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3EB6VKZ%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIQD9iGIFMDslU8FCB%2F3DGsA5CwjCouZo%2FqwT2oTRXv5GVAIgREv53xpXG5wUGCIJb1FHNLeqOXPXgaU7gvup1fAsmJMq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDGTEit9mMJxHpkli8ircAw9mTuN%2BzT0TsyqnH2EFqxEx1f2iWww8ACts%2F0UjKk%2BoNpSyJOr02zNVz5vVaMlZqAZEADyXs1TOAseexDhzUYwbHUKXLExXr%2BBAqwLJsnnQgKHo%2B7nralylV8hOFW1cbqedaRBllrsLtVzy5MA1cr5DDNx4PRYnfcz3zjo4guWsjCfKkEMao6YseonyakcUTpRCwjBOBRk%2FO6pr6sQcSLKfg0KSAp7uanhjIx06bz2swc8nH7AAH5V%2F5qAYssCZa%2Fd9aKOrvLSJNJ2duAmQE7BR0JmmjpLNygusu10nPWZkkh00QrV5%2BHnLtgh%2B%2FF13ucpFzPtF4oQouqERwfQCdVULPjpZcCRjmDeGjM9hMPt2XoBGp24xPT9oewt6uyaTE0mloy4%2Fr6YjcO9C1MWyS62eKnyn%2FtabWe%2F0PyN9pC59DtVUtctdoWgkJkxTBDlMOgvu%2BTgWr%2Bl8JSMNn%2Bt3V2ZSHqASKIBcDDRcwo9AfXTnTmmmKgQwyc%2Fs%2Bxn7JkuzSH8w94gkrFBkhZOPR3VYQU%2FsmjJfucIOGwzoFotdUIP%2B8AInD%2BmkT%2FK5qBn88SkLujhQJCJfcYAnCnr7jSNnXjOWs2x8hOg6EUXB6w8iUKqBJqwbwyVFqMHvwp2eMIH%2B2csGOqUBYuM4cENl3ZuKDB6vDP8q97C9ha%2BBfTLENKmRLBjby6QfX6Osdl64sUOfx14mpZv9PTSm0IvZkfgZhiTRGcMikEDKEsdyWSR5eCAr9E0D5%2FYrbymKFyulTiF6BPIyg6InaeeFECZLU2yzTTu37hxjMnNJ4dfxzPk89QjnCO6Bvrf5dr6WFTX6ClvnfcTpmw9k0etT7kfyJr3r997QitFuKW%2B1NNQc&X-Amz-Signature=cfc0339e2a29d803a36a8c2e26ab7b42e310247a9486ad94f68e4048dfb9b69e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVPKKAVH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCIAUdP2SNSHPUlwlQ91GkSwNpQYXDe8p%2BIcvUlLCWXFpgAiBWFTkk4JQxsEWLOmL%2FiZ7O680HkZA5z2vm6AZGJRVkiyr%2FAwguEAAaDDYzNzQyMzE4MzgwNSIMuaLfS8HyGf6DJM5YKtwDMXVNcqMtV0IbqoYumsHbtFemj641Lovur22ZsJlTPFOt3rAfc9Hd9qJRSb7mUE9%2Bc5%2Bv%2FY0ORoAgjP%2BdZ5HLfxfG9CL8QI305t1DHYZDIJmHdtoIS1yRF2qFoKskJazzpuJsxbCqu9jXNvEfr3hUXjSEM%2By0V3sqIYVyCNnReuIfYjNsB9CWUV7BatSkI1h6Z%2FjLjz1UZhYPW3SmAehjQw0aywhFCpOznG7gCuQrSM8Hg5JC7cd9Te75QwQIDCrdUBMbRtSWNvQjuPoGIYk8aabEslLMWYm7gJZR0HUOvkDPvN6zOEy9PH1ql%2Bt0fM09hnxOUzsjxrS61jH48TO0OeVnHxehJlWcasWZtneC3mAXd61k7Pbca8eZlqa09fs7apMDg2wokou8R%2BRwbwb1f%2BdOcHorUNF2vyyLx6h%2BpLkEbhnGKj6iFzOJVklL8D23RYmLskPgF%2FBoUtqtbNZA7PWQVfVl2RQXU7lRtXnczY%2FxrURlrcZG7XQ8jmk7xib7Z75%2Fy9zHN%2B%2FQ%2Fvtq74zrda6w%2F8KwPnmlGUP9WicXcZCL7LPrKXEJxvQUBJzbdkcKVqfcEgKmyOOMl50Yc1GSmYiOgU%2BWTu4Ef01QFiyRsi%2F1ueLga7QSO83GL%2B0w%2Bv3ZywY6pgE2frg6tkg82dTv5w7r30Y9eGmVm%2FcHt%2FwB6HzJeuXX0Plp7UTgYauTzTTPvbtvzRWP3D3zbCh8cOjF6OZ1Rp8bKEd%2FQ4qTdQhR%2F4O6crL1BeWMo6%2BWTx30R8JUVrFv8V17f1h14ngpuwlU4XsJ%2BLKAQMf%2Ft1J8GQUX1ygX1wPmyulYddA1VY%2BfwIZnBeVrO4uqCrrv133GkcJd8T7AMuPWnhRFBzN9&X-Amz-Signature=db149c25cd0e21098ff80cc2223ddf688faeab299a7608d8404bb8c4df08bd30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZYYTWB4%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIHMw1Np6XJPDtKlyFGA7kPSLGqPesVH22%2BBtYCN4Wz2DAiEAxGCtS2oJWVmESBbniJAZWZdbYBaUnBLdAr%2B%2FpcTWEYAq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDDrNNCSgTw7KUcV4TSrcA4EFOt3PleRvrQrz5aBtDnI42EXhr377kK89pUbkE%2FglWp0xcTLhaVXchRSC%2BQRL8i7wC4dRi1Yre47ROMBl8Q%2Bcpv3Q3%2BJi0h2rwNfGF%2FA8S9YPEUwWZZ5okotbIKrMwTIZ83UDhbgxe8gSsP6PqBXWK%2Fu5Q61CDuXS0zP0ENFF6zFWN1vvT2ukAs%2BsFG4PG2YmaAdAZlRz90jMbGNk6hNccwjsILDK5TJv6m4Gw8Ks4NBasafRbKB3XKIqTAfNt%2Bd7rThO7VgFOHaMFDUaqtJ03B%2BWfH5%2BvaWp9pFmuCyxA7WfDfRbXbZvz5ZxP16BXmM7kZaV4S3HmdITs49Mrs67fjzNxPOtHXC5y3Y0sgq8TebXZCwloKVauB6pHhv1U%2FPK%2FajtyyaWYyXYvR15yltgeqp5fE3dxeaIBfIMJUx59GEs%2B19gV5aHzpeyPaB6cx63IObemPR%2F8pxDPcQANk%2FpUTx2x20w8F7N15DMI4U1rDFLPpXnCWuF3dita4tCiRR7NL88nHvnr%2FoGa8%2F4dLB7iQ1WJZe%2Bwdx5CvjTKPVznbiREbrFuMv7b0fKM6lzB2wTMlaMB%2B235REdl5rpIKsi2Ie5HlhsBmE3sgA8IeOzjTLb%2FlDV%2F722nGQNMOD%2B2csGOqUBg6whyNTVYP5uW7xtO41dK0xcjvVvy%2BYYHOtAp3KrC1w5XgOGWuxo7p%2FBGDAq3FeFD9hU57FeKiqFBWNr6XGhIXXnMJYGAIE35lwmqKp6oTHqt%2F77Wh5mYlkdhOt8PoORVW3ftHRm%2FKW4aJ%2FHkayEvSLKO5lhFV9r2FKj5LjF1HszdgjbhcptsMpT4blMsZ09nDuJ1jo0BL5S8G7%2BvnxeX%2F2jnzCO&X-Amz-Signature=77d37183edb6c99a14a1168a15c715ef7c7f84e206d25151d0b93c38dc902953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZYYTWB4%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIHMw1Np6XJPDtKlyFGA7kPSLGqPesVH22%2BBtYCN4Wz2DAiEAxGCtS2oJWVmESBbniJAZWZdbYBaUnBLdAr%2B%2FpcTWEYAq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDDrNNCSgTw7KUcV4TSrcA4EFOt3PleRvrQrz5aBtDnI42EXhr377kK89pUbkE%2FglWp0xcTLhaVXchRSC%2BQRL8i7wC4dRi1Yre47ROMBl8Q%2Bcpv3Q3%2BJi0h2rwNfGF%2FA8S9YPEUwWZZ5okotbIKrMwTIZ83UDhbgxe8gSsP6PqBXWK%2Fu5Q61CDuXS0zP0ENFF6zFWN1vvT2ukAs%2BsFG4PG2YmaAdAZlRz90jMbGNk6hNccwjsILDK5TJv6m4Gw8Ks4NBasafRbKB3XKIqTAfNt%2Bd7rThO7VgFOHaMFDUaqtJ03B%2BWfH5%2BvaWp9pFmuCyxA7WfDfRbXbZvz5ZxP16BXmM7kZaV4S3HmdITs49Mrs67fjzNxPOtHXC5y3Y0sgq8TebXZCwloKVauB6pHhv1U%2FPK%2FajtyyaWYyXYvR15yltgeqp5fE3dxeaIBfIMJUx59GEs%2B19gV5aHzpeyPaB6cx63IObemPR%2F8pxDPcQANk%2FpUTx2x20w8F7N15DMI4U1rDFLPpXnCWuF3dita4tCiRR7NL88nHvnr%2FoGa8%2F4dLB7iQ1WJZe%2Bwdx5CvjTKPVznbiREbrFuMv7b0fKM6lzB2wTMlaMB%2B235REdl5rpIKsi2Ie5HlhsBmE3sgA8IeOzjTLb%2FlDV%2F722nGQNMOD%2B2csGOqUBg6whyNTVYP5uW7xtO41dK0xcjvVvy%2BYYHOtAp3KrC1w5XgOGWuxo7p%2FBGDAq3FeFD9hU57FeKiqFBWNr6XGhIXXnMJYGAIE35lwmqKp6oTHqt%2F77Wh5mYlkdhOt8PoORVW3ftHRm%2FKW4aJ%2FHkayEvSLKO5lhFV9r2FKj5LjF1HszdgjbhcptsMpT4blMsZ09nDuJ1jo0BL5S8G7%2BvnxeX%2F2jnzCO&X-Amz-Signature=838c0bc7ae2d26b4665730e858fbfdb7459db7fc6e534967785828683b0eb6f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VJLPKL2%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIDPHxtYHf0SO8a7Fh8r0TSOV5vTIj%2F6sf3PBS4PcaHCwAiEAhvXzhygT5AhPVzk1YthZ2c48aIpWtPsK2atO9O7aC9oq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDIEuONHJqDL%2FO5pDvyrcA5hix041kDiBZWqoG%2FcqNySwze4hAqz5bXSBKGj%2BnQVU3H0FpzbawzAC8Cl9zuVUll9NLAU0EY2SCVNjQebF0P2QUeDP5x%2BnGDXSvaR3E8qjFti7I7UQByPXHMe2A4%2BvjLTa83fSdcVIA2sYG8jOhs6ItTOy9c6CrTvpLguM346jyKuj5mLUExikkOPfg4hSVolPeweAf83AXhwGTVARh9ZNou93Pf54qi3LiZSqmZLdm2%2F9fkPaDvDdg7CFyuul9BaeMpl%2B6CP%2BxzgWNa%2BxYF45FGA3%2Fnu%2F7Y8EBgdKsjHi8aRpUSaLpmBXKJkAPUB4ezDcvmXJwdNRvgftklG6rrGRU3AY7I4Op5D4j6k9S%2B47N9UnY7kPZTlkn%2BpnBY3l6LACfusEIW8CRIlnzUQpn4efR6%2BsqKdJkg0FKPbwZf5guB%2Bi9Tr7ViG62Vpdkb1XHjgoGuwgT%2BzwmptkjVH2ndmFNnEL1cVWNiZmfTrJ0yIhDiYo%2BqBsWEy1QZ6SUZW8QFMaj1M1TTJAQRxMSEM5WZVpLt5UbzV8N%2BkfHfQYwJajK5JhEjmS5fLdu%2FN2QfFvgZsR7KWOJIJJjpm6OfSZEA%2FZ3TZryt1xrVV4xhcfOrKKhaPsi5iX8CC%2FVkWxMPj92csGOqUBYkxQYP1qBvKL2Z%2B1Xe8LD3Nh1V66CaoUtzVhgDp6k5MLp%2FZ%2B36RcXiage2lRFVk6hkQzBskKr8ui7aHaKBFWmqYyT4yXkACQ2zxolEqeLnrPmbErNlRHnMJQf42JO9mU1rYkEOpGbUFj2AboPv7IJw9HC%2FNUUYyh4ekW7mAIaEn5N2AAxIeMwrtOLenEitl1Ku4%2BzStrYiSystVlCty40N7zb76i&X-Amz-Signature=1a02b59c3db9c81f79f74052ad3ae4943a7b64cb08c1ff65f139932ef22f7267&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAKMRAUC%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIB5nc6EoTBDqoaPOkirjQnEeoRuvR5hrKG7DK1lHYb9iAiEAu3ZQSzV%2BNvbJBY3ETrAHix2EGDVQKMyQv6r4%2BAaSvDwq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDBU%2Bma%2FAAIhPNpXGvSrcAztJeM%2FmST7XvcaE79iEGAB5LFgZC06JmTr6rGtAODD9%2F8SaK5%2BNiHMiW6lg%2FPHXwgE41%2B%2FLEmzwrzK9OSarBZFUytDeQUxRVegoWnXfHC0PwnltTBqpHcy93zJvV1INi2EmMaCc4h4esxDO9OgyPlx31d92k%2FfU0jA4ENqkmLL1J%2B7fD0C12cc55I%2Fbzi8J%2BVAtJLiyChepHF%2FTEjSV0PeL7wjhBApu0i0wkK7ztuiBS79gJIpmy5VP7dl2cPClWCRycBMP6ODn0JuUunF1nJ3AbK6IOSllvhQE1%2F8h%2BAQUVqpkTtV6ycVBJMwfCtxCNO3X8HLgnR7wAEXzLR20TEjQ3UowQCvSuDHrroPGnRxGFkBO07LHdF7fD4tKkDZ3MmN2D8Hwjvc6MoVGSB9NZj1ZJkwUsEY%2BsC90KPlnNIpR9n%2Fad1dI83j5vlyv75vgISUJghKKyE9hfF6d1v1SWSrlHwl8nuFX7nZgk%2F1UJVBo%2FuVXenUoUVxbqgVQTwqpHv5xD%2BT7%2BPrjcIc87Gv6booXtx5EzM7jnWU5L9VcFa0%2B3f2Zsy7JIP2DbAA4%2Btu7Rmu8Cc9zaKhaz42Xte6scfLhU4fo%2FTV3OAe9ljt4MBVTst3hXtcUJY5cUZWdMNj%2B2csGOqUBvxrt5hk6ABHVHC1ZhToAqsPwwxX6cPWKsOcmgAA9G%2Bx8dY9tdWlhI2M6gZATNHEl31HHihk3b8vq3q6clPHK%2FinAaXqGs5cND2A%2BwVb6IKsIG2igwUJQBKNtKqnC1DhJSeu4ZrjTmb2wCk7VSx5I7Xa87hqBM9pIcrib5z30G6KeIU00ucibKIFZvUjLZP0LzbnjbU8jKUvQxIhz8VcQ01Q%2Fc85N&X-Amz-Signature=7cc81d7d98d8ed24bf5f218206855c9a8d4e67c1d6458e3e7bf966732bf2d877&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAKMRAUC%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIB5nc6EoTBDqoaPOkirjQnEeoRuvR5hrKG7DK1lHYb9iAiEAu3ZQSzV%2BNvbJBY3ETrAHix2EGDVQKMyQv6r4%2BAaSvDwq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDBU%2Bma%2FAAIhPNpXGvSrcAztJeM%2FmST7XvcaE79iEGAB5LFgZC06JmTr6rGtAODD9%2F8SaK5%2BNiHMiW6lg%2FPHXwgE41%2B%2FLEmzwrzK9OSarBZFUytDeQUxRVegoWnXfHC0PwnltTBqpHcy93zJvV1INi2EmMaCc4h4esxDO9OgyPlx31d92k%2FfU0jA4ENqkmLL1J%2B7fD0C12cc55I%2Fbzi8J%2BVAtJLiyChepHF%2FTEjSV0PeL7wjhBApu0i0wkK7ztuiBS79gJIpmy5VP7dl2cPClWCRycBMP6ODn0JuUunF1nJ3AbK6IOSllvhQE1%2F8h%2BAQUVqpkTtV6ycVBJMwfCtxCNO3X8HLgnR7wAEXzLR20TEjQ3UowQCvSuDHrroPGnRxGFkBO07LHdF7fD4tKkDZ3MmN2D8Hwjvc6MoVGSB9NZj1ZJkwUsEY%2BsC90KPlnNIpR9n%2Fad1dI83j5vlyv75vgISUJghKKyE9hfF6d1v1SWSrlHwl8nuFX7nZgk%2F1UJVBo%2FuVXenUoUVxbqgVQTwqpHv5xD%2BT7%2BPrjcIc87Gv6booXtx5EzM7jnWU5L9VcFa0%2B3f2Zsy7JIP2DbAA4%2Btu7Rmu8Cc9zaKhaz42Xte6scfLhU4fo%2FTV3OAe9ljt4MBVTst3hXtcUJY5cUZWdMNj%2B2csGOqUBvxrt5hk6ABHVHC1ZhToAqsPwwxX6cPWKsOcmgAA9G%2Bx8dY9tdWlhI2M6gZATNHEl31HHihk3b8vq3q6clPHK%2FinAaXqGs5cND2A%2BwVb6IKsIG2igwUJQBKNtKqnC1DhJSeu4ZrjTmb2wCk7VSx5I7Xa87hqBM9pIcrib5z30G6KeIU00ucibKIFZvUjLZP0LzbnjbU8jKUvQxIhz8VcQ01Q%2Fc85N&X-Amz-Signature=7cc81d7d98d8ed24bf5f218206855c9a8d4e67c1d6458e3e7bf966732bf2d877&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YMFQNRH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T210115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJHMEUCIA3ZVX1o9eA3TB2BxurVq533vOZmvSiNiuyLC%2B0indvpAiEAwtDDIn7SpZOte7RhgSMJ9MwY%2FV7tYBcs0XctVVjBQM4q%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDKrOEk9DkYpPQKyJsyrcA9%2By3z3GV6u0rH0zZLXUcolMHm2wD%2Bu7ABhS3mIcGSHlApC8rTQFwwn520PCyYQ3Voogj7pHTq14MYtF%2FkDCltvYW3RyHB0M32DPT0nO3xsym1cAWsVofypp4xs%2Bar6Qzd4ygY7P1LCK49aqbUpA%2FlGbd0LXLNfYC31J%2Fesoglx4aXvL7NUNdlrGOQQeALLQy72msBoYofqbLGfqb1a3Wsfyr2Gi45Iyc9VcF57f3q6sEJCbgTuTGJAE1K%2Bjnmkx%2BRd7v7ViFLQotXVCHub4KqbuyWpPQMuUWTkG%2Fg6A0QGWLi%2Fh19WThPuhGbOQOjhHLgvQOj%2B%2F4cGXEcJc2Y3ufcmI%2BHhZ50yN%2FB3Fe5O2foSOmV2qBvdDJhSpCqrT23wzJZO4U6Cfn3yIh%2BUhELTmILlCbsaHymj4mjrBwPExUxrT3dx%2BpqSkR1iBoyMyxHnKt3K%2BL7%2B6VzU73ifX5VdKFAcyF1VByN3VaazIPa2bbYSNWAPHhIxQJqE5HOj7Y%2B6b2F0IDF9zXaYzLaDN7D8G9Ooue5r0FaaCrYrYSElyOwUsZy%2FMzRmbxQfMx%2Ftev0vBbIrf94%2F4YzPBkinbgw87xHZdOUpetMRnluMyETctseAlwPUFkGNFbe%2F7Z3qJMKL%2F2csGOqUBoCumRt2kmzI%2F55V17TunsGZ0kG%2FQLWyFQ58yI7gaidb0s3gWpBWk%2BtlFnOHKLI7TqYelylzeL%2F%2F3KKofjBMZYLDg79qyxP4Bqb%2FYeDwVTeWglldI0gswCphB9wRHozklpGYrqXvnIU3L%2FulOZ%2FK2TuE%2BmBbVgcCfKjVkcz7VXaxs5bZd%2Fl1BwFpz%2FFocMmIG0OaHHJJh6YXsXmSyAy2mq6S9LkWy&X-Amz-Signature=ca6d54095d9cb6d40b7ce098663b73548e84ba26b4f9ee7adf1e418200761432&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

