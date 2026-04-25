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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE7VI7Z2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCvBJMDye9uc1nROMF6oVkPcpgeDdtZgD2lCcumlYaiuAIganocBG3aTN%2BR8RAgcbB%2B%2BCuHTPO4kfU%2FgrNu1EU7aY8qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDApyJEzGo14B7s4%2BVSrcA6x1OGBKCHp6PSOV80X%2FkW1F9%2BoAmCpfOX%2BpcrWevXo19%2FngJ8H27%2FViFR%2F7EUF5tvL02xykEpUF0Hg1FMtBQESRzx8xoH6Fp44R1doK6feqwrqCbPZPxMEByjMPLt6xEr4BnqEtaYSWWrJdWgJCVZm%2BATkw%2BpC%2BifYMSG5e2YhINIZGmKo%2FSWsTPs%2FPHyh7rvSGFVRQuHeaX9go2SyHsvgd01qPast5W%2FS78yEJ%2BZIl4hl0AUp1gRAo3KuGKPTvNlNegukJcrO%2Fh1g0j0%2BTjx3VxSzJK3THRj%2FdWq72vJ%2F703JhrjuR1DlH3NMsv3PEqJuRymbNcx6yoIjD1YhWuJkv3MRXkJGYEpwOuUVLpZl8wxI9nYmqkQV9a3xUjDkc0EMsO4T3tMI6p4sKDzNfm%2F%2BiDky9PpOkeIBZV4KJipqhXYJinXCaNbdmeT5quRMqVaHaBoco5MGdhRzuNEPXSspAkb6K%2FeFsSZWkMYoMEYnAxO1eBmQ%2FRI5yfaRR%2FOnbLy4i5vc9bPEknkXY0OAoj%2B%2BS3k2yEpPXDvQUPRotaUvTY%2BMgtudx48dreI%2FW1pS0Kg0OthlmTtdLItU4gmN5zXZUQh1VckKYK6Z%2BQZlYn9Ny2ZjwLqSll3T%2BQzWnMNvass8GOqUBmDwyCmFNzuxMJY4vbJAHZKpi%2BocafiDu7erzC7Dr%2BzEISKkIOUSOCXo7tMpwuza6GZrOtQ7WpkLLTO38mLFbf%2BnyMvuFo2IMncZ4ObtKCls3eBUV%2BjOSUWuLs%2Bz0YdwRnEAVsu9KknjEtfR3jb0Xqi5bFZOdYN5%2BR6G6CEtiaHDZxTGNA6WCFP3kFiTwb0QYKmMR0yOI6a8M6UbyYdntRrE8%2BwU0&X-Amz-Signature=20d84e2c5391e722adb6f1842bdf91525ba4e6137fa9bb2829567b1abde25a78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE7VI7Z2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCvBJMDye9uc1nROMF6oVkPcpgeDdtZgD2lCcumlYaiuAIganocBG3aTN%2BR8RAgcbB%2B%2BCuHTPO4kfU%2FgrNu1EU7aY8qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDApyJEzGo14B7s4%2BVSrcA6x1OGBKCHp6PSOV80X%2FkW1F9%2BoAmCpfOX%2BpcrWevXo19%2FngJ8H27%2FViFR%2F7EUF5tvL02xykEpUF0Hg1FMtBQESRzx8xoH6Fp44R1doK6feqwrqCbPZPxMEByjMPLt6xEr4BnqEtaYSWWrJdWgJCVZm%2BATkw%2BpC%2BifYMSG5e2YhINIZGmKo%2FSWsTPs%2FPHyh7rvSGFVRQuHeaX9go2SyHsvgd01qPast5W%2FS78yEJ%2BZIl4hl0AUp1gRAo3KuGKPTvNlNegukJcrO%2Fh1g0j0%2BTjx3VxSzJK3THRj%2FdWq72vJ%2F703JhrjuR1DlH3NMsv3PEqJuRymbNcx6yoIjD1YhWuJkv3MRXkJGYEpwOuUVLpZl8wxI9nYmqkQV9a3xUjDkc0EMsO4T3tMI6p4sKDzNfm%2F%2BiDky9PpOkeIBZV4KJipqhXYJinXCaNbdmeT5quRMqVaHaBoco5MGdhRzuNEPXSspAkb6K%2FeFsSZWkMYoMEYnAxO1eBmQ%2FRI5yfaRR%2FOnbLy4i5vc9bPEknkXY0OAoj%2B%2BS3k2yEpPXDvQUPRotaUvTY%2BMgtudx48dreI%2FW1pS0Kg0OthlmTtdLItU4gmN5zXZUQh1VckKYK6Z%2BQZlYn9Ny2ZjwLqSll3T%2BQzWnMNvass8GOqUBmDwyCmFNzuxMJY4vbJAHZKpi%2BocafiDu7erzC7Dr%2BzEISKkIOUSOCXo7tMpwuza6GZrOtQ7WpkLLTO38mLFbf%2BnyMvuFo2IMncZ4ObtKCls3eBUV%2BjOSUWuLs%2Bz0YdwRnEAVsu9KknjEtfR3jb0Xqi5bFZOdYN5%2BR6G6CEtiaHDZxTGNA6WCFP3kFiTwb0QYKmMR0yOI6a8M6UbyYdntRrE8%2BwU0&X-Amz-Signature=20d84e2c5391e722adb6f1842bdf91525ba4e6137fa9bb2829567b1abde25a78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667E3OM4YU%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF1TfE8f9nicDRzYbZo1GFYFLIel9iJZ%2BaYda17N0hrqAiEAqX%2BKmL%2FBqzxvCzPWoKYnPLE0CO59hlK92uQtztyXLtYqiAQIlv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKR6t%2FkD%2FL36%2FZAFAircAw9p%2BHsQwD8u5MsqX49TTNhH3F6WtTnDV67Hz1zHac1Ph4FWsD21mCgcovj2G7pFT2Y5tB59dhexj%2BcZhcQdsQXoD1Ukh7cA1gdzD8PS%2BBlibaj2Y0yVUaq6I8cdKJ%2BrXf3tQLLWA4IEU4OCBRDehrOSByTiwK6pJvcDOL7k%2BRQH%2B4ggSRDrlqvQD57oTD6cxQPmo2m%2FiK2TG8q3v1idJNempvV%2BFZDGG0jMM63Bgs5CxKFQxqwIUu6OEM10iLnZLqX1YUFztf9T5f%2BdmqSMQK4q%2FD8kBlJ5j4Jla3lXtGEfx3Ygt6qHnJHP2V6T9Lb9aN%2FyiTM8nzjooMJhma%2FOgUEfXsXMLV5mTp4tZ71EULtkCR6AI4Fw8K602z8limzW5kdFkJYH%2BS1gnwNkWpXm1KHcKHA%2FC7dt3p0GcHFsygbzAO9%2FmK7PYvGzswqjASucbSE2Otw7fhohhHBNclTpJyZ9Ohk%2FGyHxff8SaCC4NoqzVPXNvV1O37JKhsnDaxGsD4dpbbo7pZRhCycgtUlnRmECtM4ygaPI5XZSQtiiYeQ5LljtU%2FMN82Yn50jg84mX7afriy41lA45xhsVHqg3Nygh7RfKY9y1ceEnP5MV16koETLGI0IdubdsnHeAMPfoss8GOqUBDRdIDzI%2BI0BP9ZjrJ%2BqY9m7bJkewFNhBy9XjMZZy3BSt%2BslN7nxyN1XRIE%2FO6bskkkJeZVw3UafVGVHZO4eRBH7gRxvqHXFmm31SSix%2B0yOMvrjHQYF54KMmBhCKc6wG7Byn2JhztBRYiozPjrgiGwY2b2QY8utQQr590ujglFRHwUFq0zOBeqCD6ELAtxbKf09wWYALQlbe1G%2BBYH0mUqydc2tG&X-Amz-Signature=53caf2f079ea020da012a0fc7151d320b19aac7bb809be61574076fe594efe02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLEUCOOY%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBvdPaRWIeNDomD9br82NQGShgRwogyK0TF6VLnKUyKhAiEA3OC9iCvhH7Bc6iilF%2BTZCGv3xyail5a1x3AGj4vE4wQqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMqkxs8QdV1sUWR9myrcAxGL4iR1hFYgBXjMSWxVO8PHqjxMhjD7AMGIPH0u%2Fgjxvi4EYtafi1ZokEr%2Bi1JI%2B6ax75XTq6w72TQauePKNUvYxH3R2LX%2BcHUa9QJ%2Fib6RkT1jw073c7s2UDe9TFX61GTCz1BsXvxdyNQMKtd9wXrQPBZXXh7Bh1pS71sM%2FUtqqkI6Kqk%2FaYDT2SGrZt%2FS%2BDmAQfxQtL7AWxlHj954oRpVQrunT7FZ%2Bd9FKx5AoMS61H8iraVof6u%2FIWEdn725%2FLqxwtxknNpEr3ttxaeIziS8LVXzaPD6iVey2kUlskFW11GRoSFlEWK8XJobmz5bHCU0AFhntfDt6fjN4e6dXE2Vnz%2B3uaxvhw91VY31OpXRZLytqCALtQLDYfxlWL9QWLyN5baZkwcHb%2BsNOrHWZjC%2F3iGejdYOpbkIjOLxxWSi3vvsQtP1GoPRMXkny2yjxu8hlaf7lyC%2FBuawqKiEfJczwmMKni8D6FApvVVQiIl6xx18IIWpGEMqDuRZcblMat8nAgsTS%2Bg1N9q1bzR9r1i5Ab0cEK6K%2BHuMz9kctuMkSFIF4s7Lvd1g%2FuJAT3oiPZOkJfhuXGkkG2wj8bs%2FGId6%2Frir78uWGLX2abzVPWVmM1JcmbgTLIwOdScvMKfYss8GOqUB4ny4XqFSj8vF9Cg4ZGUY2SkHg8vKf%2FwCn2%2BTiWGRdQojmfmhSe0zPV0AXT2OHmdHkLyq5apk9Sbv%2FECY94jkZ7si6FgGNXTRP3j4weiTzl5v7LKiRjGpNT1zBs2J%2BUbxHa2nd6Xm3Tk8aM9%2FMCIACTxiIW8nTPTHzOFlurJzHbcS9KEEqxO%2Fg1iNiiel%2FzpyPMTwHy9QTp2cxYdl7nEDaAPt3Ifo&X-Amz-Signature=f1acff76502b8f2839a4c2c07314e4abd2c7bca55aa4b6e4e01fd8d36b387e15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XLEUCOOY%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBvdPaRWIeNDomD9br82NQGShgRwogyK0TF6VLnKUyKhAiEA3OC9iCvhH7Bc6iilF%2BTZCGv3xyail5a1x3AGj4vE4wQqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMqkxs8QdV1sUWR9myrcAxGL4iR1hFYgBXjMSWxVO8PHqjxMhjD7AMGIPH0u%2Fgjxvi4EYtafi1ZokEr%2Bi1JI%2B6ax75XTq6w72TQauePKNUvYxH3R2LX%2BcHUa9QJ%2Fib6RkT1jw073c7s2UDe9TFX61GTCz1BsXvxdyNQMKtd9wXrQPBZXXh7Bh1pS71sM%2FUtqqkI6Kqk%2FaYDT2SGrZt%2FS%2BDmAQfxQtL7AWxlHj954oRpVQrunT7FZ%2Bd9FKx5AoMS61H8iraVof6u%2FIWEdn725%2FLqxwtxknNpEr3ttxaeIziS8LVXzaPD6iVey2kUlskFW11GRoSFlEWK8XJobmz5bHCU0AFhntfDt6fjN4e6dXE2Vnz%2B3uaxvhw91VY31OpXRZLytqCALtQLDYfxlWL9QWLyN5baZkwcHb%2BsNOrHWZjC%2F3iGejdYOpbkIjOLxxWSi3vvsQtP1GoPRMXkny2yjxu8hlaf7lyC%2FBuawqKiEfJczwmMKni8D6FApvVVQiIl6xx18IIWpGEMqDuRZcblMat8nAgsTS%2Bg1N9q1bzR9r1i5Ab0cEK6K%2BHuMz9kctuMkSFIF4s7Lvd1g%2FuJAT3oiPZOkJfhuXGkkG2wj8bs%2FGId6%2Frir78uWGLX2abzVPWVmM1JcmbgTLIwOdScvMKfYss8GOqUB4ny4XqFSj8vF9Cg4ZGUY2SkHg8vKf%2FwCn2%2BTiWGRdQojmfmhSe0zPV0AXT2OHmdHkLyq5apk9Sbv%2FECY94jkZ7si6FgGNXTRP3j4weiTzl5v7LKiRjGpNT1zBs2J%2BUbxHa2nd6Xm3Tk8aM9%2FMCIACTxiIW8nTPTHzOFlurJzHbcS9KEEqxO%2Fg1iNiiel%2FzpyPMTwHy9QTp2cxYdl7nEDaAPt3Ifo&X-Amz-Signature=9c241e55aafa076e1c624af52f4107be4f1167fb15dc91e45ef47f9aee793dfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V22NB3SR%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEpo1L9SzjfBVUi3wBxD%2FIXwcwdkPonwDJrb3302MWXiAiB3xsh9ck3nH2oP%2FLLmINAWG50Ae9nN5sY2PAHV237faCqIBAiV%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnPOTFIOvOMgP0rs2KtwDqxfIpFwLbNKri31ydQmR1ftt0zPIT41Bz1efmfq4Bx9rUvfAxjguEkUm0MPJby5hLb%2FABoi2TGaZJxMhlTODckkCNTxqZh33Y74p8dZcGORAoYh4pTymtCTEI2h%2Fsx0ToN0vlJIwd5SjTq7rdQpDgqnpvpm5BGZ2Up30zQO11JuGV56t%2FOuZ%2FfAK%2B3UtV64AdgNvMrwe%2BmXj9SZeoy3laOcfKdZm0M%2BzfL5NcXZefcLfHspobOq4DsOvVPs0XUyGv4oAcdPs%2B3%2FZrT7wjuEvQBpwNRzUL5%2BxD6M29BCTZ0i8YaTnGcQjIIYT870LVdVAOoGNxdMB%2BvqwPolxe3yjRIR%2FYiucMlIm7%2B%2F1UUaESLRd83bD6jLjkluzInF2kQM29vBVGKa%2FsBnoNv8pqrZAaQQolReKshAybQ%2F9kF2fDMkLKjfVunU2nNLuY3x8jsLnO90LB5Yw5iiQpDwLzlXnXlNJ9eunN4Ksm4C0eTKNBCaOOeX%2FsO9e%2Fp5WUVCHs2MP114S2q2QqbWOGT2CpfdDCLugwwOmkCEb1agdKa8PGEtY20%2BhireY9X6%2FmATUpZF4WwTg88VHKfxyZKMeDyB%2FZjMhqpgjUfQyE%2FnGkPSVoSRwHRUtW%2FaNEyMRgHIw8tuyzwY6pgEakrC%2FxKq9racc4bPO0nEqLhTHuNIDT85WaAenZhsvr0qI9bILhPOrms1ZFHYsZz6Qkg2rUUfS2%2BL4QSC4UZLQ0QrgfJuU3gtHFqSDudUXBPHQy8nn9pTr39QQwA2IJiodl%2BpYRr7G%2BpsY5lqu7SDUW3O8UNRZRT%2FSrG%2BrjU9n%2BOnyS44SBqVxEK%2BlKzFXuuGsyfeGJvaii8KH7oea7xzno%2BQS3UHk&X-Amz-Signature=69fa24857b873bc4459d6f3deb6dd0e6001cb75be0a03b27c90cc3cd69d4dc91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46632GQSC7Z%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDaRbuDB%2FloYgBTtk6nhV5Ic8GJzHfdTCI%2BSSnUYEY9DAiEA8JhKot%2BZCNfQTEG7DCKH%2FYZaazBFb1eYGloZDRuVOOcqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLPaXNEfNd8Jft8FVircAyw0COy1D9u2SZvARGqhxpJ5xn7GvvmwVVYyli%2FKPNIWlGWkWOzIwQPLCyoVnEEJDjedOfdwA%2B4XVXUuU%2Bv5MLgvKDl4Pclk9m3LRAVcBygfFwKnehsvvrQ4OkyIibz8t0KAobtiTQiJ436hcLcTqJYPePtT2BPERMkAvWict%2F0qodbfV84%2FUQeGx4iuq7yHQjFwI7qtUb%2FSZTu1V4f%2Fq2RmfCeqVlHKIT7QaaWVl1IV%2BH4QywwpJ7A3qMSg0wru5MNN5CHDAHHsRNwuFT2WffDxk96dK0RYii3iVplgbVmbYBDQE%2B8mwp8sbugFvpLvERMC%2BFlMZnzLuiU%2BcukI%2BtapjttkGLXjR%2FJ4DM6lsPVolWFb5MGwFFLX8mdKg8VW%2FhNXK9EzqOm51f9qjUItctXTzi6Q9N%2BDnptZ3wxn2ZPGztP5SXx00bcms5KWSpEk6Bb8c9inFnabJYcNqqtEvzv6hvPEdE%2Fa8FXZ14U11nRwpWXAyctZvvj9P9e864I%2FYh6KfQAOfN8kOeMAYIfEXSQbDkxLw7uRk3cIqFTNEtBmcw76hCLHPw04nUU1BiShpLkvPHL52qX%2BkYJzfP2UtBVTvDYuJXMemdjErp1CmMLJZkwRHg%2B6i3OPWuBUMOPWss8GOqUBYDwvTjT%2FfN2B%2Bop2uc2VHMwYn83Fh54myatdAbZ98OMxqTw1y2rtvaBhXdYURJdjy%2BTgE4vI1GYGJFIGVFftyvPh8d4SooLptYsxhtFpsmdQe5Wfs2rCTKwG3elr3DKcRxAZR%2B31jVmW%2BaoUZgiF8j4TgiRlxX8VfJN6MC9rp6PveiRxrxiu4YuhwXyrN%2BorCX4JCyb%2B3pr8bAZ2K9k7KX98tkr2&X-Amz-Signature=33db58368daa08c1db18d9c4d1521fb87e784d564e9a9ad2b23dea4573587477&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664I2Z4BAI%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135449Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHrDhsuIM%2F%2BsMg8YnxGB7Nx5m3tAht0d9sm22Z%2FBoiSSAiEAkPoB4qmBgsmmcSqexn5f%2Bf6nCiI4JV6%2BSifZ2IQjQf0qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFSl45sCwWbwSDOo1ircA6n9akCc67hISBR08J1%2Bn29a11wQCAQOxVfgQi5SvIiaQ0q7pQGIlmrW%2ByMxtYC3zY3yoxyEFvc3P2WZIfpxgdKf6oqMvEFmk0QH%2FeETDJjEbv4eFBP9TN9H3FfzvREiMHzFJ81rrC94TqwARJzlshsJ0EoCUInGNxJPoZRO2NT%2BPIASYKmLK0BF2rvtdxqYosPukXRYXmSVsTRITczL2AQZ5Z6l173NzDZdVwoxa5s%2FvGbSSlmEqwKfRubyPeo1%2FoQw7T%2BLWAd7hESAU4lvmOnAFrlcMPHGA9gi5CUw7qCkQE01ifgL4kPDg82UU2B3DwmuzVUJYsPGuluh8b9f3OYE7viTRi9%2B2e3FfL5XOYaaTgadzbJPeZF8E8z2iHaxsIgDnmdTXUrkHMm0Srw8BI8w7KUApVyKbHnSXhmnEvjbaG%2BZNcOtQtOLuselvVKYXbXX7Vw9%2BwpxcgXgkJ3pKXLeUlcA0Okle8a2v0xLXiX3oNiyB9Hx%2FVQ16GUg1ba7H38aNtc1oPL8DTIY6%2FHUr7nelLjBYsPDnIj9Kzv8wArOfybBfjLA68KOcNqMxtYGAsZL5iYlUrMKPP05J243HVpCFE6WCSoNRhOjo9TsN%2Fxm4%2BblDQjZfDdXGi0NMNjbss8GOqUB3WFdlm%2FWLyr4YWX7dlum3mxufPF5X0YY%2FKu%2BTiehvP5Wg6XsTvT%2FmObz3UuORZlvYASYpvq%2BgCINKQsNBlexuZV%2FSsMGly60SWnIMLrx%2FfYdkeIsKycx%2FBZU9EZgvfWXmrpItUcfbTwviMhWclEtTkOVWN27RdloMq5wqdNqN8gEOZJogMD3UdTTFnR5%2FrszZSpFcuMrwG8QepaGictzCBx0xQc0&X-Amz-Signature=d26b21178f5a52fa270ff8e1ac7d102bf6bf91ed9ed2afa74bf887e94a12ef05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X63BRVBH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD29pP6LY1dki%2BMMbZHJCmypzadQ%2BvjIvtpGqQ4E6ax5gIhAM%2FTYMTevnSgn9Bx5W930KxoiDMR9YhPPcDGCPVPwy9yKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrYNEwCGOoEYtyb7wq3ANAH1d3D0hVvZd53VoTk7uoz%2BmuKkN%2F0ztEwJ5BHG5bSsAY%2Bjf5xI%2BQ5zSMlTRZP5%2FNx9hfv2ZERvAnozG186%2BCWX5xgWLlBbxlk2pnuVwDTtm2VcgTtb9SXOsC%2F%2Bx%2BlEXyA6R284ylgHrh4P7Lezv%2BdGwc8jFotFNCqBRIGznmxSLk0cq0isPMCOUNRoHnaNlAJ5JEEFxRsYV3mDWBuMJRWdJdka63%2FQFtItFjHRGIrEA%2FyqqCVlV0yFWx1ElpmC4D1urJ3qcNgNCGNVHu23M5PSzJQf%2BO7CZFIM%2Fg43kGuB5pbSCcMGJwdNVcXThq%2FgjvHruO0ynRi4qUvd010CBN8TKMG%2FKGH%2B0385hIpSUoSn%2BJg1bwRH4zd9c2ISKp6j6MYI5kO2%2BpgF3YSeGqK4LazImotUGujz1BBD4CvcdwgsXXenQoxYmEBFf3X3EPDWbwQlpVBDZ%2BCBclO9aYhpS602io5RqeiVI7UBwSC2eDRnxwKHv0OsuWHFhIiR3M3LcpL%2Fpu7joSg3JglHtJqJ4ew6aRJjh%2FCdomaPhjK3pCqfvFWfBrmKOiKQ1wqeZFJHSpHPIPvjqDtpMjXOjnlN9iwmz5b8qG4CBlzfLkDvkToUn0c8zOYWFtRA2VwzC63rLPBjqkAUYm0gN04TIAf8OvowtVC2oUib8k8ZvCEB%2F3iclcUCGk43p28pF3VfpF3gr%2BVFXvxgMAVT1NSPXMiOXwDcnYozR9X83oS3qSzmexPuZRpmdKmtMfO2ix6t5M7hbZyJH8BH4bhVf7KpRtKLNqXQqeaBZL9oa19qrf369msVdrMSMuQxBjwV%2FULPUzyBXA6lbdQngx3%2F5FoMtY40xP33gbY6YAVHpB&X-Amz-Signature=c7d9a9ef3bced73916ae71752be7582100a1e885758bdceff1b98a3daebfc35d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X63BRVBH%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD29pP6LY1dki%2BMMbZHJCmypzadQ%2BvjIvtpGqQ4E6ax5gIhAM%2FTYMTevnSgn9Bx5W930KxoiDMR9YhPPcDGCPVPwy9yKogECJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrYNEwCGOoEYtyb7wq3ANAH1d3D0hVvZd53VoTk7uoz%2BmuKkN%2F0ztEwJ5BHG5bSsAY%2Bjf5xI%2BQ5zSMlTRZP5%2FNx9hfv2ZERvAnozG186%2BCWX5xgWLlBbxlk2pnuVwDTtm2VcgTtb9SXOsC%2F%2Bx%2BlEXyA6R284ylgHrh4P7Lezv%2BdGwc8jFotFNCqBRIGznmxSLk0cq0isPMCOUNRoHnaNlAJ5JEEFxRsYV3mDWBuMJRWdJdka63%2FQFtItFjHRGIrEA%2FyqqCVlV0yFWx1ElpmC4D1urJ3qcNgNCGNVHu23M5PSzJQf%2BO7CZFIM%2Fg43kGuB5pbSCcMGJwdNVcXThq%2FgjvHruO0ynRi4qUvd010CBN8TKMG%2FKGH%2B0385hIpSUoSn%2BJg1bwRH4zd9c2ISKp6j6MYI5kO2%2BpgF3YSeGqK4LazImotUGujz1BBD4CvcdwgsXXenQoxYmEBFf3X3EPDWbwQlpVBDZ%2BCBclO9aYhpS602io5RqeiVI7UBwSC2eDRnxwKHv0OsuWHFhIiR3M3LcpL%2Fpu7joSg3JglHtJqJ4ew6aRJjh%2FCdomaPhjK3pCqfvFWfBrmKOiKQ1wqeZFJHSpHPIPvjqDtpMjXOjnlN9iwmz5b8qG4CBlzfLkDvkToUn0c8zOYWFtRA2VwzC63rLPBjqkAUYm0gN04TIAf8OvowtVC2oUib8k8ZvCEB%2F3iclcUCGk43p28pF3VfpF3gr%2BVFXvxgMAVT1NSPXMiOXwDcnYozR9X83oS3qSzmexPuZRpmdKmtMfO2ix6t5M7hbZyJH8BH4bhVf7KpRtKLNqXQqeaBZL9oa19qrf369msVdrMSMuQxBjwV%2FULPUzyBXA6lbdQngx3%2F5FoMtY40xP33gbY6YAVHpB&X-Amz-Signature=532fc82514634c157d9ae0965abff9372de4e9f6f93419a8db03b18460a3302b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QS2ETL3H%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHs1BNeM65QlQt%2FycNH4ImuXE48pdJ5KTGtCYBQ0tO6nAiEA3eq%2FG%2BYMWi4BRqsXul8ZN5b4CIM4BUzx6vyS4Z6LWP4qiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGTbOookGDW8n43UzyrcA4g9d2W2lBM9IXz64jko3sZPyesSp0yG2j6IKNbxdcGKv0fCVWRnMtYnMTm2KsKy2CcKoJdDmliMcDr5SCbdaHxxoK7TEliA2sICF1dOQYSgH4Mqd6Pfl8dPpOtopNwMgwG2CewQApoRNGXVRKlbUiUWIvsScm3ydX2Qc3bW4xQgpUugunLSCsys9wUAZBtNtNU46H44L38NHwb7%2BHuDxQ9HpuFXyHVCeqbKBnp3G%2FVsF0egbt2L8tQRx%2BklvD3osBt1cuHGYEk4W%2ByiU7SDKf%2Bp%2FUlnfR%2FEtVTIC1u8BMDXSS1NyZEPlsmuPpsl1hWY02TD5hjhV1mVgFtTVEN12LeIqjKj%2BmIpIeqh9O%2Fb1CsjMzynNnkWtTdnaO2zlqC9swI9vuqPYPFNmmwZFf6seftJQ9c%2FyMS0rl%2BVVfAR39AQrWgvj%2BEefxauIBGiCJa3pWqn%2FJaHh8ZPTESH9qxbRqqXaZq%2BZVSN5z6SLQno%2FkSLEjOieKci5%2F%2BJ7xL3WPh5OrlNyy5DpJxUPiRBJ5ESQYVXXN9zumAodVRdK8wWQtj8hRZE5KkS4rk0XVkHYaB%2FzjyQUssoylw1sr7ltMGfn8ih%2Bhs8E7kOuwWhem7NqaVMu%2BMOt7T9Sou1B7GNMJvVss8GOqUBhZkXouzsBI6YgDi0715EnCFMKiHQ1io%2Bcg4btiY8gJrFLOuSWnwS8Pyum2I2Ra3NkdAFt1b0s6hkQotoeJeqXsrr8TiP7mJ%2BE2L9DpnlCq6NrGnLuu%2BlhttqdHF%2FRdQm8DLqpLBCD3ps3hRtQIpHGZw3zdEViczt80df08UTY%2BjH10DHxKQGi%2FvZcX10B3%2BVNsO4LrYmrknlgXKA82T1hm5s6%2Bf7&X-Amz-Signature=e8a976b6a337fc4e27632890a89f6bd48644534090687425b0e07a13fcffdc3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DR5XBIB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDkvPk2v5bSrko6oSCbeQbZzSCLG%2FXfqYb3bjtNVCuE3AiEA581xHoF9aAzDGOvisfe2RbNUqbgaMNOssCXjknhu87IqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEkJ%2Fvt2qGe1IKDEsircA1gJzDP3XpF%2Fm5lTEl6yRt3MQQnruM9swxkmkf7tGm0TOIaIB3mMf2UlMBCqTcBaypaHYN5G1ROZm4j9UH5zIqCLWg3jPVQ%2ByVMnNhQS20zp2ziiB5w6%2BlvTfGudezvVGWYNj9%2FYSL9rP38dHaKGKEZfbVHOeLgAusV6EGssn3%2BylsUNRcu2qkS9nziYFNM3Q7SiLGwQ%2FAI5amuZ4%2Ffgo%2F7UKvd1nH4mmOFrp4R8nENfJFN8vCWQrjLuvCTm2l2K2HLjKyn2G8jzrgTqN415TdQEl1rUqpRhy2enmmR%2BllOUqRQPBEI89Qx1Ogd%2FQeu7Bzb5jXaP%2Fu2uXqTrUhWOzQY2sQXShVrb%2FCtbR3E%2BUDt%2B%2B3teRAI0%2FefSZB1A0cJZ1JREEF78I8ZL8BWN2ufkeG5iTVFgdFK0srncPJ7v9EKr%2FSP%2BJzjzdb8m1ATg4bXGzAJ4jc0GvPwv5i3MKmCNdSgx6%2BfDakNLhhr1TL5osXXfcBH9kZ88zowwWNUC2rwViwCUi8v4lkf%2B5x9UrOXkP9KP9%2FPEdJr%2F0Vux%2F3Dv30BRGjrD30kL%2BiQtpn20n39Mu4npq0%2FI%2B2ccBRMjCPE9lnfTxuO%2Fz%2FhFGhfhu0zMygZupaGDmXiw3TZXZTpsMPrYss8GOqUBnTHp3LSByY%2FixKREFbM%2BhpSjTv2Q7%2Fjv07bKFGKfabufqi%2F3Oef1quh%2BBEpZZREiCuVX4UA3Ac60q%2FX3tISgtlIJDMypwcL2WkgMfliS0S8%2FdLyIkExjvBB%2B87y5OE%2Bll7a82z6sAxse6%2Bb5yYwJNlqXsWELRfZgdSVfFXfnWKUiTu2ymZhbIs2mR4FxnK0RBFEkb3JyWqaPf14HnbXEO93KgUwe&X-Amz-Signature=0bbdbd68310c224ccb64915ee9feb261d5b2b2adcb0f777fcffe11d5ed102ee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DR5XBIB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDkvPk2v5bSrko6oSCbeQbZzSCLG%2FXfqYb3bjtNVCuE3AiEA581xHoF9aAzDGOvisfe2RbNUqbgaMNOssCXjknhu87IqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEkJ%2Fvt2qGe1IKDEsircA1gJzDP3XpF%2Fm5lTEl6yRt3MQQnruM9swxkmkf7tGm0TOIaIB3mMf2UlMBCqTcBaypaHYN5G1ROZm4j9UH5zIqCLWg3jPVQ%2ByVMnNhQS20zp2ziiB5w6%2BlvTfGudezvVGWYNj9%2FYSL9rP38dHaKGKEZfbVHOeLgAusV6EGssn3%2BylsUNRcu2qkS9nziYFNM3Q7SiLGwQ%2FAI5amuZ4%2Ffgo%2F7UKvd1nH4mmOFrp4R8nENfJFN8vCWQrjLuvCTm2l2K2HLjKyn2G8jzrgTqN415TdQEl1rUqpRhy2enmmR%2BllOUqRQPBEI89Qx1Ogd%2FQeu7Bzb5jXaP%2Fu2uXqTrUhWOzQY2sQXShVrb%2FCtbR3E%2BUDt%2B%2B3teRAI0%2FefSZB1A0cJZ1JREEF78I8ZL8BWN2ufkeG5iTVFgdFK0srncPJ7v9EKr%2FSP%2BJzjzdb8m1ATg4bXGzAJ4jc0GvPwv5i3MKmCNdSgx6%2BfDakNLhhr1TL5osXXfcBH9kZ88zowwWNUC2rwViwCUi8v4lkf%2B5x9UrOXkP9KP9%2FPEdJr%2F0Vux%2F3Dv30BRGjrD30kL%2BiQtpn20n39Mu4npq0%2FI%2B2ccBRMjCPE9lnfTxuO%2Fz%2FhFGhfhu0zMygZupaGDmXiw3TZXZTpsMPrYss8GOqUBnTHp3LSByY%2FixKREFbM%2BhpSjTv2Q7%2Fjv07bKFGKfabufqi%2F3Oef1quh%2BBEpZZREiCuVX4UA3Ac60q%2FX3tISgtlIJDMypwcL2WkgMfliS0S8%2FdLyIkExjvBB%2B87y5OE%2Bll7a82z6sAxse6%2Bb5yYwJNlqXsWELRfZgdSVfFXfnWKUiTu2ymZhbIs2mR4FxnK0RBFEkb3JyWqaPf14HnbXEO93KgUwe&X-Amz-Signature=0bbdbd68310c224ccb64915ee9feb261d5b2b2adcb0f777fcffe11d5ed102ee0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JXBQUTW%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T135454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE8YaKC7IOtbsMd7ml8qhlF9s4kyqxMMkC0fNgUcOz%2F9AiEA%2BsQLsGWRcacgzqPUKOvKVFc5wCot%2FH76iwPdL4mA8woqiAQIlf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFXWqaPerEKK7T21ZSrcA9wi5jV2XGZQcGXR9yKKD%2BMb0ZVVEAv7aAKNvS5uQdoPmW6jOdsljJV3p1XQXhvErIwP1atZlf%2BCPhh9uZ%2BbdHsojLubztEFe3E18Zh3wV0mQ%2FAuSRbcg0%2BaGrLtnSBKdVtJDSlChaxOAw%2F%2FGNpB%2Fz1IAkhkxCLkMveDl4kd%2FxnyAQCXHdFYLa1TC4S4Nr2QcfCbD6eqsGhLuarID4q4qvDSWl%2FLsv6r%2BVF2MeK%2BMk6qBiSlcN2aW%2B2swWhS8sKTPSS2WSqyZThknLOeVNuylgb3a9TlBXWuS6b0U6KHjpm7n%2BTVT2aud%2BSg73jkgCemm%2BRA6gyUpcQLqu62UUd7GzwxdNgxYGTS6We6pxpilqI%2BT3lERXNDhB9UEXa%2B9bMrXeLwUvS3zP1QZySthtBk6Tn%2FVZu02gmrhnEM1wHclmYTrEZviJPoIFZLZ7wOawServ6ojGqDRxRYLn8zlxwIlE05W8Kb334Nh71aup6zgzBVwwlZpB%2B7HtsM1Vhgt7X88x7DvkWsOHLhbw52q3meQiIeBO7ls%2B10EpRhnbLlcMV%2FTSPwMus91Z4zduTiA6INLitNvylUW2UCc8zr6IpvovF%2BALRCmsAF%2FRFA%2FFzTQYKLwNBdjiOv5%2FYTsvdQMM7fss8GOqUBs6c9NnOlt%2FdnmFeKNKpBtjeCs3XjFuy7NLqssth5fMXA3oqEfCtwHadKyZ5iLgcH9AGv4CBTVrujzucOxx4R7qeXu1%2F0psuT2D66lQa6yBqGw524%2FUeRlZD58Bqu0Gq4ebqLMbySZmhAZ1YzqQtiHkH2LJfTpUIal%2BDdtnwgDTKbRcePkS%2FZlzSd9dd7DmrKooLoaT%2BEmMiMMHIutAGjVc6aLheQ&X-Amz-Signature=d903f0c318f7afb895c5ff05d1f69191f400bc8483a7873c5908227ab9107236&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

