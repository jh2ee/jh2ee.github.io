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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNWLJWB6%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIF4bBSE%2BtOD39tMJ9Q%2B2n16Q3e%2Fu5IOf5YFUpWdLqg42AiEAmPXcPtUNXA9%2BArt5MfOddvY3jEq5Gr8wc9%2BVLY2lSZYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDJ4XEbd7oC1qzSEgWircA9sf0f86VpEVp0eK7reMJqHFl9T1s5aGM%2BpO2FwLyzgiY8s2m8J4kyJXj7TfpakoT7mo4cqIJANwyC6p3Nk8fWpkEi%2Bt94oL4%2F%2Bomg%2BqL5vOStT0HDz539r4%2FJS73xK%2F4%2FgQDaAh%2Bh6m9KbikaQTuRgyM9WsYDGjY3iM%2FDsLQIA0iproCvz3NMJcIZ%2FO8l%2BxH%2FIMPkBOafRhFGy82Vohr3M5%2Bxa95r%2FzxfhtpioBROCsK79zzMK6ZpAfz%2FiZ4KDGj%2BDRL7IBY07GGRqA8CC1FbDfAy%2FOWzQE4iDd0cw900viqB1%2BYikDFCDIykZqCwanq71aCWOMuhvEGmFMkkyI15vAPsi0fJJX9DSmgKINN8F9YMrgCGSZHXGyALth3v2n9EwuLu%2Bb2YrtVIv6h4Wuh2DCcSWo1FNXxkgeKhG729gZ44RdC2Xvzt9OoCzyJkRiCa4xBhPGRreBk514sLUP%2BK9jJNgm48igbDxoCFvYXQiuE7GmNAWU%2FYfMMXoChzhwJ3QS7kd%2F17Mr0pnNBKPx3N8BTC12%2FLxuHI6JLOWfsyhNcLcbWMogQVcdexXhFVYXRQ9dd0EuC8Rhl%2BuIGg9k%2BM6RngZaY2UyPidVL%2BdAYii2a8WuPva1AYHMxythMJCk3csGOqUBM25OJz0Mfq%2F3Zb%2F2WPZ%2FlA1b11lpuwyBTrBbV1Y0dtWQaDyPsU9vTYtl6%2FloPskfjNBAlgvnwLAMBEQxdF4ONJjzWISv%2Fw6bCtkCDc6xi%2Bies1fH3KLF0YL1dLx%2Fm2XSCuHpfpf2mVah6xE5NH8QdOZanyaebDyw6AomF8Tg4jegkVIL2WLftvXgw1Q3oF2kc1BNpLqOEgGgP4QD054UZXn7PNIp&X-Amz-Signature=25d80a12f064acf11588139d02b0c3887eb0c025eaa67a233d107de97ef78cf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNWLJWB6%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIF4bBSE%2BtOD39tMJ9Q%2B2n16Q3e%2Fu5IOf5YFUpWdLqg42AiEAmPXcPtUNXA9%2BArt5MfOddvY3jEq5Gr8wc9%2BVLY2lSZYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDJ4XEbd7oC1qzSEgWircA9sf0f86VpEVp0eK7reMJqHFl9T1s5aGM%2BpO2FwLyzgiY8s2m8J4kyJXj7TfpakoT7mo4cqIJANwyC6p3Nk8fWpkEi%2Bt94oL4%2F%2Bomg%2BqL5vOStT0HDz539r4%2FJS73xK%2F4%2FgQDaAh%2Bh6m9KbikaQTuRgyM9WsYDGjY3iM%2FDsLQIA0iproCvz3NMJcIZ%2FO8l%2BxH%2FIMPkBOafRhFGy82Vohr3M5%2Bxa95r%2FzxfhtpioBROCsK79zzMK6ZpAfz%2FiZ4KDGj%2BDRL7IBY07GGRqA8CC1FbDfAy%2FOWzQE4iDd0cw900viqB1%2BYikDFCDIykZqCwanq71aCWOMuhvEGmFMkkyI15vAPsi0fJJX9DSmgKINN8F9YMrgCGSZHXGyALth3v2n9EwuLu%2Bb2YrtVIv6h4Wuh2DCcSWo1FNXxkgeKhG729gZ44RdC2Xvzt9OoCzyJkRiCa4xBhPGRreBk514sLUP%2BK9jJNgm48igbDxoCFvYXQiuE7GmNAWU%2FYfMMXoChzhwJ3QS7kd%2F17Mr0pnNBKPx3N8BTC12%2FLxuHI6JLOWfsyhNcLcbWMogQVcdexXhFVYXRQ9dd0EuC8Rhl%2BuIGg9k%2BM6RngZaY2UyPidVL%2BdAYii2a8WuPva1AYHMxythMJCk3csGOqUBM25OJz0Mfq%2F3Zb%2F2WPZ%2FlA1b11lpuwyBTrBbV1Y0dtWQaDyPsU9vTYtl6%2FloPskfjNBAlgvnwLAMBEQxdF4ONJjzWISv%2Fw6bCtkCDc6xi%2Bies1fH3KLF0YL1dLx%2Fm2XSCuHpfpf2mVah6xE5NH8QdOZanyaebDyw6AomF8Tg4jegkVIL2WLftvXgw1Q3oF2kc1BNpLqOEgGgP4QD054UZXn7PNIp&X-Amz-Signature=25d80a12f064acf11588139d02b0c3887eb0c025eaa67a233d107de97ef78cf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666LDRV4IX%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQC3AD4fltojgCVmq%2BFdnn26M70L95ykSL5RNf1TIh3s%2BQIhAMZGJbSywsC%2FciimOKZCpzhDl3vyB%2FafoLTq4zLHGLROKv8DCD0QABoMNjM3NDIzMTgzODA1Igx72kZwe0RYoV%2FyspIq3APN9D3tdkTBJQ6yk59PUufqqOAr8anLY9ZHA78Iq7HSWJmddpH9N7zbP7Eh2hj0jN85znyN57xTA0a4nFLnICuylugkvr9l8TREP9hWR37MRHpkaYRnNKUOm2Z61h94JEh1%2B6G0oQlpl4dpcHjvCP2nw8m%2B7EFSag%2BQYGcMrqZRzXjK9RxwinhlHx3Tso6qjW11qFQ8mPnk7r2Tuv7E1ctJSW3%2F87xst4CrJzJ4p8indtvdzBWfq05j37x3irEqLOI%2FNDP61YdWT93G4PII79ES1VVuwuXtQSTQI4O0hP9qIrqcPpTIh%2BeUcgipsv8iBuCMYIPZ9V2zYQm03pgsdS2YcIbQsz%2BbfT79XPGono8R6EZqXPE98LDHBTFoGosuznKcbGavg%2B3OAaQEgjx%2BkreIWVnJ6hidQ8ySmCuxdo6ZmIrPMPvedXad8KR8SqnI38%2FgLJDAtvKglBKoQnIbrVclwjKr6ohOHaKhW3%2FHG2MZKpaS2ffT2WOsPsGwuIjYMoERJqeZxmZAvEnT0e2NFZ8AiEL5OaVcUX7wmfNSAw1Un0gfGlJR2P8z80%2BdLVBIos5fjMsEzxxyICSYC6SaFIrH9odEYuZdkj4tSCCh9Q5X2hbbZzHcx7lp2i7zxTD%2FpN3LBjqkAZyzNoZ2yWJ%2BPoQx3vQ8OthjGb28kh3Z%2FRMCYtLDa7owXjK91yYMNEEP1YtUCStJwKmtI%2F5ovQImd2Qvd8B%2BrrxBQ7Th%2Fi2Lntwzqm%2FdDURS7QA1%2FoRYzjqw0EkYal7Q4JTDGQDUYtMbFhATTxjYR8sANgTzEsiP06p5MxCeYJmP29W3527iAlmnuF97LVOOEEt2KLik9IgM4GA5ODKbmifZOfsH&X-Amz-Signature=412f1d17398e446ed55beab88a9bd1aa9f47e4986cbd7e0b95ef12eae5665c7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RB6GT253%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIEaD2H5ssARgJ1YlF0g5B%2B4p%2BkipWGvGrFGz52iW2T90AiBhlsVUkw264CbXewT9uUVkr770SkS7QBiOGPBy1y0LICr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMCb5UpJZZ3KMB2tacKtwDPKh8afmbEGEfM%2FYvKAst%2FJbKH7sf8aPubXtuZviH1XLlP9OkYJ3zbfhRa56cv56bJJ3kmqS27y3KK2UJt0gxHhDm8%2FWNH%2Bvg%2BKWY6y2ebqQgdHZAtk7WpCoyzOsZDYclO8lbtpm8MpuFx8vKMYoGUpuAup3alT5E4PtvAKl7IMWKAJMiTy7unIimYaYFYDFGSZxETs7bsix%2Fn4rLSTM1%2FhGcQYlHdwEgtUJ3iuPBiAwkYHKlKFPDs0hMJ46Bx7t4Ix1vNGKte2%2FGxrSf037BeuGya0jI%2FdevVCQZPNUXPDR8z%2BiVhx%2FyX%2F7XMchSTGATv5nMjhd3j04L0jV3hs6DCpycx1jQP3oJhh%2BQ9Gjz0vcQVkyNPtTApBZbObRdNoq0xOsNgiN8keVnCI9HA9f3H%2Bnbr3MPdN5RixwBGmekWn6dMRtnnLccG%2Feq0SZ%2Fd0%2BBfHBFn5ik9xduR9MQG83TPxrsdGj3f9AMdhOUs9d0cEx2VQ9AWPCZWkL96Uth5QJr3NCWnOpYCzP3KWOK2MR3PeqKK8h8cpm%2FsKP8xSTDcJGBmZXAb%2FVN06IgPKh11SBodYfPIfAORNzPY6pMf2H%2BWaozisfLNoL1PPfCfOO7A5Kuy9qQr3SSfi9ulf8wzKPdywY6pgGE4Ev64p8YbIiNSk%2Bn4V5QRutX%2FdMudADqJH76y8a0ZI81Wrtgj9t5D%2F%2BhYDPS02zkcv0HtsydaPRsJC4HTWCIZkjsKZJONZYKHl4HIiaD0pdf%2FKqsXz2PEQ8TWYnnh5d5gkJCOyuZHTsrWSdgFhUvu%2F1cgWtqixbLCfO6psXvQanQ2bKPusisXZ2Ke3C7lFdI080GABSYTM0iU9RIlx0TlOaZrp88&X-Amz-Signature=033481d866ff4722989f486fd77dd2ee4f890afcd8b8c1702069fe27c5a237c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RB6GT253%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIEaD2H5ssARgJ1YlF0g5B%2B4p%2BkipWGvGrFGz52iW2T90AiBhlsVUkw264CbXewT9uUVkr770SkS7QBiOGPBy1y0LICr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMCb5UpJZZ3KMB2tacKtwDPKh8afmbEGEfM%2FYvKAst%2FJbKH7sf8aPubXtuZviH1XLlP9OkYJ3zbfhRa56cv56bJJ3kmqS27y3KK2UJt0gxHhDm8%2FWNH%2Bvg%2BKWY6y2ebqQgdHZAtk7WpCoyzOsZDYclO8lbtpm8MpuFx8vKMYoGUpuAup3alT5E4PtvAKl7IMWKAJMiTy7unIimYaYFYDFGSZxETs7bsix%2Fn4rLSTM1%2FhGcQYlHdwEgtUJ3iuPBiAwkYHKlKFPDs0hMJ46Bx7t4Ix1vNGKte2%2FGxrSf037BeuGya0jI%2FdevVCQZPNUXPDR8z%2BiVhx%2FyX%2F7XMchSTGATv5nMjhd3j04L0jV3hs6DCpycx1jQP3oJhh%2BQ9Gjz0vcQVkyNPtTApBZbObRdNoq0xOsNgiN8keVnCI9HA9f3H%2Bnbr3MPdN5RixwBGmekWn6dMRtnnLccG%2Feq0SZ%2Fd0%2BBfHBFn5ik9xduR9MQG83TPxrsdGj3f9AMdhOUs9d0cEx2VQ9AWPCZWkL96Uth5QJr3NCWnOpYCzP3KWOK2MR3PeqKK8h8cpm%2FsKP8xSTDcJGBmZXAb%2FVN06IgPKh11SBodYfPIfAORNzPY6pMf2H%2BWaozisfLNoL1PPfCfOO7A5Kuy9qQr3SSfi9ulf8wzKPdywY6pgGE4Ev64p8YbIiNSk%2Bn4V5QRutX%2FdMudADqJH76y8a0ZI81Wrtgj9t5D%2F%2BhYDPS02zkcv0HtsydaPRsJC4HTWCIZkjsKZJONZYKHl4HIiaD0pdf%2FKqsXz2PEQ8TWYnnh5d5gkJCOyuZHTsrWSdgFhUvu%2F1cgWtqixbLCfO6psXvQanQ2bKPusisXZ2Ke3C7lFdI080GABSYTM0iU9RIlx0TlOaZrp88&X-Amz-Signature=6af34194f65fe0be7c98377877e4992ed96d527e2817443d635d6cf6c85561ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664GVBZLKE%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133554Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQC%2FnrlPE0scgMVJ81IwwcXSLt9Uc7cny0osDEv7FuibLQIhAIs6l6kx8Edm65Gtmvp6thVC9Um8%2FsEQT%2BeKilxsO1aaKv8DCD0QABoMNjM3NDIzMTgzODA1IgxjhzYzC7pS2B6HTAIq3AOXIWUt7WXSVQcRjHVq%2Br%2FTGXH5XruXOWlBjPYGM3bAMPraoCK8952k2LvPqAn096FOk%2FdegP%2FKFvKz%2FUrb1Kt%2BFL2bKZasUafI162OMalYJIH89wSO5Tiw9c%2BG4PnWBpU7rHBV8WHfaM5RO6VaAG6iBhsFuRe4rZERVdc50ukT50d5A18lqxCoo4ewMuBPRFOXJD6wNuQrwA0aGPvTI2xPwTqMVkbTl%2B3hYGjLjKVarIyMkUUCcjvf8DVnsJ84EYwkKVwZkq3rcTbEhd%2FTZda%2FG7ne17rvotBCm5to30CU5nkGxzcXozxXZFOZ8J14Rvid8GCZCEJDsZ1hu9Pmw0U3VckH3aYItD%2Fx6Bm3XIxRTrdAPg5G1bbQMMIgbDKeCt3%2B%2FgJ35dTi%2FWl7it3tdSB7rwOH8HzY10RxZfOPZI%2BNXSXYUYSQN8w2urS1MH2KRPR%2Fn%2Bz%2BfJtQGSTzkhK%2FyPbq9BTnkS1sUJpMejBFRo0x8wUQVX6DBXkYaUaQwaBBAr%2FFNeRWYCDV9J%2FRBMr5OGKPHeS%2FZEh0B9xMTY%2Bxbz%2BsqoyOJmqGn5EV3NtTh6wdKtcaCx3pXqaKHiP7z6FLOnj%2FZzxsclBYpthww7w0MwAGRXfMLF8nagaqNz4U0TDro93LBjqkAWS7iy0CuXNZyena%2F5bLlisH4jQV1OoFpptk6%2FtaTIC5RY4rhM5h975vMIjSw7lyUK4xoBk5uBZU0wiRp5u1whVrx9RRYgjX4B8fUxJkQPcpPjgf9sr%2BVILyIWB0kjk5XTJpH2IzXMGiVcAaO9Ot0V8MyLVfxDJyJCwvLGmqttSFv0XnbJvyi3kZ1YS6lCacdLTdqLymla6VxQKtEqg5kvqnsdCO&X-Amz-Signature=87be5e71e14ef1b98cf264e59ec1f519ea6c8e8be22306a6cf46ae210ca8bc08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AWWV3FH%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIAvyjgOSrP6LsBoiD4D97Epo8pj%2BOoQ%2F%2BhpI2mWVBPiVAiBuFmE82ETod%2B0UbDEpi6v9Qda5JPsN3dxMzSRpKM3reCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMXmpaMIjLS2a37qX1KtwDdr2asisQzxjC4s%2BH%2FdHN5rkFplupbhnmFHh9Xjo4F%2Bt35b1vjvs7%2FU1DQBLQqYZmRMzj57epWTxcO8X9pcYm5KUl2DQSMo1GZuCcNdrmkW%2BQkd6vcOaXOdSEupYoxFF3Zu5biWWtkAep8%2B5HasRpVsR4w65rEl24cVBavw0P4ikQagwGAQOTawiqN%2FAIDASNHjeHkEAJhzWtmcE5g%2FORMIrm8etEHUs6y85yd7tKG6Cpc69vL4fv78zwnzRyJDENLDa2B9GvZMF0KY4vKDpjwRigPBr%2Biyl%2FPxCuTFSH4UPWmKi2lYaFjbAWPxaJDDu2Qbs3zRU0YV0XxNO%2FbjG5pmEJg%2BxYvyZENj0xZV0KhzjPI5cd4G2c1zfk8u%2BRMb%2BDwTq6PNsyIzfUMD%2Fya6xYOwaFe0koJRzGZKsp4vNSJDr%2F%2FjTtHS94mDESAPvmEZpYY%2FqeHtbxMtYplFmxy6ufdFYqdpo7%2Bv8PJ22opwXSgw6PZRLCSbO0kICgYzmZ%2Ff%2BFSLjfVwB3BAsxl3G2S7Og%2Foh%2B8z1H5ONMwwCP89QrvZMoj1RpIy6XWb9j%2BpJ2vLlmyBBTxrPM%2B3e2I8ZHYNtU48cQUdhBaqpl5x2MGhHm1VnJIGQCwtJiqXlOrDww9KPdywY6pgEB5JmMclwG0VqH%2BZ61ppmLDYt7vX1y5zDiouXXm43DLHQXqGqlsiINcUrjJC%2FvxtZJHvRNcKPNCe2yTDYoEGJ6Yl6Eb69XefhMaLJDzWf06xGjWCXcjPVHOoKf5eXopS8c2uISNLo6UIvKdDRV5mkAQqzzAeX%2FDtkCCRa4WlvkWPR67kVbELzHo0z3n43tNJJ3HRGgNC8NYPcNEh0wiYLzR8haH7yb&X-Amz-Signature=57c940909a375bd3e25ebcdd2e5d1ea11d8fd84053ffc2a0d8895510a8884a5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3XEP4I5%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133556Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQD8BaRarnsGOuLcRjXEuMNqwG7wvtv4Dxd%2FoDrkI2GeHQIhAKfUgDYImdYdgcDYI2KXgSUx1J1Nb0L73KyRmvarehT2Kv8DCD0QABoMNjM3NDIzMTgzODA1IgyK76%2BIj%2FSh5pI62s8q3APj3R2pZCMFPzhP58afwbtcpMF9vDs4Lzo8nhi44dAq5x5ahwYvuoXc%2F3ROUAQMDCegnzXtU9wn4dGmrtm2k94Gm%2F5NYXOL87GXdT8IGXMLkrJASrWkOa7fCV1gVzLvtqkKGHQ0dXw5WnVvmAC7poN8LVMc6LJQKNhXO1WyZFUa0MbaX%2Fe5icRRm9EMw014zzxxGtuaYNYNR%2FTCgUY9TY4Uez%2FV9gchC%2F0z6FimEfYn5AKyJUzvd2ncV6B9SF%2FkGpsl6f7SiPcjrVfdGXmx05JtpYUAKEz%2F6nt3of1Hiw7KQwcEd3rOPHHAAsIZeJ3TB%2BsMfCxnnHt2v1qluzj84GO4TXD4knFhGn3bZli2alVwblBdM%2FFryhvTbgo%2FoaSNR39pyYfqneJb5eplmrN8Ekx%2BVwgO4t1iMpTsAbhcC6dp%2FSbk5NLz98dAIwV82GSzqFkVKb9F9c9q3MiaY5EZF4n7yW7%2BAFTgXTPZTtHaWFWCZeDDR8%2FWkmgJ9OJ0YZE%2B6qXC8EkB0Af2R7ao4w%2B%2BK%2BsDNYLmj8iI3TrzbcQ1K0m7jVLeDFhIw0E0tEKxmlChC0W9izZHgUZgTpFN2prtAJtY7HYsn1jqBKSfJxjjLWgZCzYOWsgGtjdxu0QKgjD8pN3LBjqkAToJ1qVkS4E6EMw0N6%2FL10epbUgTeOy43AsY5rlaNE0wRzgUMk6ImQ5tGah1orYC2nw%2FFkml1jzvwF3KUS%2FoJuP9K6UMZPDuy7HLysCJRPBZ1EDXZLlmc2dhfMFF3pQb3W0BAbgVGApGs64hEoX6e91Ft9DkHAX3XRTDn0yxOXdvQQO6RwgvUmmTsZOUmATTWWvAvcsxN1qjzhB4oAlV5%2FNOqos%2B&X-Amz-Signature=b21b5d19b5c46e6950f36209ef4e96efe9188e3860c805d440355de56586afac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y55ZP2D3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDUSpPZG1%2Fv7upzWOUOT9NFC2rj8mNZAn0s3Nr6KYLVlwIgZGL%2B2B1TNP%2FS%2Bq9HAOPqETQliK7903HnJGtshO4dCLMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDAOl%2Fi%2BeKEYYKoSLJircA1iQEVPGhv%2ByEaNAymOHW%2BnaYaU8q0ejW0FEaKZDQd%2FHRd988KHu8lBlCEO5PJjcn6ZvB5RdYh1PTjovLTMdba9jthG6WRsTnUDlbZiEDu27sCUx7N8QRA0yoQdO1uiq%2F0Kg6h0kXrLTmDwWCUT%2BgwT2MKs%2BpkVz0ZfZimOlVxSDrPI09DKgRWV%2BpC1mTQhZxo0zmHDpoQ2TzaDOAXgkYP9kFnzGp8cFl5r5iIx2wXi3w0FW7E4%2BC3GcB5cKo04iDqDvT8uv8FTbpOKABKKQihhJAIG4BAmWYXEFyWa6MqnQr81UMH9o0Nr2%2Btme6CKPDv53KuOwY4z%2BI32Ti6Dq8GsTAhTmYY%2Fqq5PAmC8IHkQAI3%2FvLxnbagXclctE37EHaZkPsJchoakhIS6YhULqPjs%2BWepyFSzHoIj9M4cYntNmlNt9IR7%2F5hSJNApxmLPK07Ab71xOAViwXpy82%2BD7CynuOESs2K8W%2B6XMTigLntzDvh%2FcP4xrROH23JZaiE9BuL62TIjfmDyCnBwIVIa6XW8eSFY8p6U0XVnuIg%2F2cXuACJ%2FO7I9FIaclb8AfBaTik4qW0tH6TdYNwtvVa%2BvDVbKkUn9ORmgJ36oOtx8atj5Op5uSsLOOkP8Ec5GJMLGk3csGOqUBOLmmHNCEqebDolMdXD%2BS6vJQXZWFkH1G%2F2CemGqLdpo8mAynY86M6bf3sXu3fAM5MuaojcNo4i8mMkPvsbSxlsOzx1DJL1t%2BrTC39EiKYJuZA71AwbKk13BEB%2BaqCeARLiByq2mGDXnZDhejEppiW0T8wJ3wDOgk2rs84u8Zs9qVJX2BSb9XaHtHII5SsZRav0UoYxsbpmqI9ZwpMiH5Ib%2BvsRgK&X-Amz-Signature=8979981134dfaf5b144bc52af93a85b82e81f14b4b228dabe557c8a87c0da03c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y55ZP2D3%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDUSpPZG1%2Fv7upzWOUOT9NFC2rj8mNZAn0s3Nr6KYLVlwIgZGL%2B2B1TNP%2FS%2Bq9HAOPqETQliK7903HnJGtshO4dCLMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDAOl%2Fi%2BeKEYYKoSLJircA1iQEVPGhv%2ByEaNAymOHW%2BnaYaU8q0ejW0FEaKZDQd%2FHRd988KHu8lBlCEO5PJjcn6ZvB5RdYh1PTjovLTMdba9jthG6WRsTnUDlbZiEDu27sCUx7N8QRA0yoQdO1uiq%2F0Kg6h0kXrLTmDwWCUT%2BgwT2MKs%2BpkVz0ZfZimOlVxSDrPI09DKgRWV%2BpC1mTQhZxo0zmHDpoQ2TzaDOAXgkYP9kFnzGp8cFl5r5iIx2wXi3w0FW7E4%2BC3GcB5cKo04iDqDvT8uv8FTbpOKABKKQihhJAIG4BAmWYXEFyWa6MqnQr81UMH9o0Nr2%2Btme6CKPDv53KuOwY4z%2BI32Ti6Dq8GsTAhTmYY%2Fqq5PAmC8IHkQAI3%2FvLxnbagXclctE37EHaZkPsJchoakhIS6YhULqPjs%2BWepyFSzHoIj9M4cYntNmlNt9IR7%2F5hSJNApxmLPK07Ab71xOAViwXpy82%2BD7CynuOESs2K8W%2B6XMTigLntzDvh%2FcP4xrROH23JZaiE9BuL62TIjfmDyCnBwIVIa6XW8eSFY8p6U0XVnuIg%2F2cXuACJ%2FO7I9FIaclb8AfBaTik4qW0tH6TdYNwtvVa%2BvDVbKkUn9ORmgJ36oOtx8atj5Op5uSsLOOkP8Ec5GJMLGk3csGOqUBOLmmHNCEqebDolMdXD%2BS6vJQXZWFkH1G%2F2CemGqLdpo8mAynY86M6bf3sXu3fAM5MuaojcNo4i8mMkPvsbSxlsOzx1DJL1t%2BrTC39EiKYJuZA71AwbKk13BEB%2BaqCeARLiByq2mGDXnZDhejEppiW0T8wJ3wDOgk2rs84u8Zs9qVJX2BSb9XaHtHII5SsZRav0UoYxsbpmqI9ZwpMiH5Ib%2BvsRgK&X-Amz-Signature=8a9c3d1bbeeaab0d2141e0ff0bf4da50deb91741be1349060e468670c0cc679e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AZGAWLS%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQC10eEgyjb12g8Ts56tLbovJvzIX%2BcnylXRgVYsJuGS7QIgWcaE0Omg9Yah2J56ixsQpiFjYq67YkRO95E5pRj9UtMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDC68XWmYcVtkgKp2xyrcA33kwKVD69M473ayRhvtNUcc8jVh6efeF4uJ207eYzdqfDrGD7Mytct7KPgp7Blmd3bajqz8iMWfp5rPO%2BtcHtKryVC77ReCq%2F2jYVI1xHROdxnOsdDyASrlS8OrXxNsJ%2Bhye6mI3EbodmNeHBxWU6tcq7hY3F%2BVEfBCJThkzue6L0wLpp1jy9ygXIzIBDvCZ%2FjrqngMTrlniJGO5MD%2BUitTRRdoBYRhJ7O0n9wHoqrL%2FEl7E2t50j3NN6rUMMbh1CXmp04cUeLbwRkjbUGh3nWlRsq2Qd8AMBVErK9fDuil4WFcHcwQXQp7IPgt38UXMSnQwcckA%2FOAuW9DuPs7gGOgqcA8bocf9ubVbQp2Z2G6X2yRQdDryQvvC60ZaOmUUWnkW44uKD%2BK89WJUOXgJ1rasDd0NkHABjrAP8zIl73Fjn%2FXPwwXP6T1FPKXp1jvAJRwwDhl3m0kaw4MOKzUdF1ZGkPUhpA9AsCAhI77IVg2fFnNY6uB6Qg3WiBNBvVcHybafDrhXK1o1KDxl3PXntl90bD%2B6mwmoWP7EukAFLa1awbBHdaFGtr54Fb2AVllH7BbUkDBgega6kfF4XPp7KFQSFU4WIpDgGYDrtRUDUuqqCZbTwMWuNeaTBbpMPqj3csGOqUBGNH9jLKt%2BC5MCXTTl7qhUbPbIhzMGvVe3aVpzKMTE%2BnaybsaDZ%2BxBqiJPgdlnCHHiyiK3UPbilNfNRQRTbqPhF66TZjNUetTVLi%2Bxpx%2B18oHKp8WqpIS2mOoKAeGNgYiMk%2FmctV%2BuKOX88ewnU7Hu9S2hDXq8G2tk4gPwVxrWHmGxa2MkOYy83zItixVgA%2Bbgt1F2KqGIlPgH9mHPbDhFwjqRfFo&X-Amz-Signature=fe9fbcfa9a53213d52e71958a07125cbf3bc8e21886c1eba33a68584e1957807&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654OLHTSU%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIBFSqWW8YE1hZciWJQ42HimAihOmdzbsOOKhZSPmcCcpAiArU4rOaEYkS2gSA0Rll7tNUDR1dT3k%2FXCsHznEvnf7Iir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIM1Vx21Qg8DcSHx9cJKtwDREkcvoXQHIxWiWXVcwgaqPzAYq09gDrhP8rzm9NADIkwdnPXlpoM8nZWkN%2FDdmr5CWPqWUWsJ1hgbFHQyUMAD7U8fBbxrKbGV1jZ0UX2lov9o3Er%2FylELjnHyrAlwNZLlMUMXWYXVL4LE3m7krT1sdDXYMaFFrZwjGTS0M7jJImtv4WkLV8LTq9QMDTnzmeVJWbP73kXPwtSRnRG2O86nmyt7imFWAXCmKpQzXXYQEq4XVIudtnZ91m6OhT4L9LWoGilTTnZ8C%2Fds8nwEJhs2q9tzHoVUC0hfrHjjF%2FvBwbNPpw51d%2BhWpSi%2BIdcaXaTa6y4Xv0UAYXAbBKbFQMxgbBo27ehWAjm9H%2FaFAqbcnBFC3cF0ec5jxeazqdaPYuKndfm8A15euewzGGkeif1k5C1ysBS3hrNmxSZ6rXS1Tp5DtPz0PLgMb%2F2G3e83tW8vIapp0ct2muiyNkDBNedu5ydOFhNHQ6ADH3L%2BosqpftZ7vPTXwPAsLMQkHBVl38xKMH9tbEpENuroEToqpk1m3s1jYLM8BoWFImiAPDtREMdJXs%2BjYSbrlAyknv6GSZHL7Kqvr%2Ftrtfk9RUTI82K%2BtTbD5NaTNKSJGpzEwZY5Hb0xKdG8%2B5n74gip00wi6TdywY6pgGSWeqlEi9Efv91%2FbbVSap%2FJTbC9%2By2FM8VRnEy8JaDEaaLxL7xWuC15Ebpaf3Bv2xBB0QVAiR7nm7n39l%2Fi73gaZIMjdui8ApYPYdDJddWgUEGQqbXlaU7l2siUo7Z11WfTq74blRxvKqicacBjmUZxXCb3Qp0NZOBqJLOglLl3NQTBvoJcdlEQ2Pv4%2Bi5S%2BV9biSUyVQl2q2Zz7VdINugXg%2FePYmY&X-Amz-Signature=db173dd6875c5d1252a4852d0ff23b2c7688f6db2799e0b8d08e616c26259a34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654OLHTSU%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIBFSqWW8YE1hZciWJQ42HimAihOmdzbsOOKhZSPmcCcpAiArU4rOaEYkS2gSA0Rll7tNUDR1dT3k%2FXCsHznEvnf7Iir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIM1Vx21Qg8DcSHx9cJKtwDREkcvoXQHIxWiWXVcwgaqPzAYq09gDrhP8rzm9NADIkwdnPXlpoM8nZWkN%2FDdmr5CWPqWUWsJ1hgbFHQyUMAD7U8fBbxrKbGV1jZ0UX2lov9o3Er%2FylELjnHyrAlwNZLlMUMXWYXVL4LE3m7krT1sdDXYMaFFrZwjGTS0M7jJImtv4WkLV8LTq9QMDTnzmeVJWbP73kXPwtSRnRG2O86nmyt7imFWAXCmKpQzXXYQEq4XVIudtnZ91m6OhT4L9LWoGilTTnZ8C%2Fds8nwEJhs2q9tzHoVUC0hfrHjjF%2FvBwbNPpw51d%2BhWpSi%2BIdcaXaTa6y4Xv0UAYXAbBKbFQMxgbBo27ehWAjm9H%2FaFAqbcnBFC3cF0ec5jxeazqdaPYuKndfm8A15euewzGGkeif1k5C1ysBS3hrNmxSZ6rXS1Tp5DtPz0PLgMb%2F2G3e83tW8vIapp0ct2muiyNkDBNedu5ydOFhNHQ6ADH3L%2BosqpftZ7vPTXwPAsLMQkHBVl38xKMH9tbEpENuroEToqpk1m3s1jYLM8BoWFImiAPDtREMdJXs%2BjYSbrlAyknv6GSZHL7Kqvr%2Ftrtfk9RUTI82K%2BtTbD5NaTNKSJGpzEwZY5Hb0xKdG8%2B5n74gip00wi6TdywY6pgGSWeqlEi9Efv91%2FbbVSap%2FJTbC9%2By2FM8VRnEy8JaDEaaLxL7xWuC15Ebpaf3Bv2xBB0QVAiR7nm7n39l%2Fi73gaZIMjdui8ApYPYdDJddWgUEGQqbXlaU7l2siUo7Z11WfTq74blRxvKqicacBjmUZxXCb3Qp0NZOBqJLOglLl3NQTBvoJcdlEQ2Pv4%2Bi5S%2BV9biSUyVQl2q2Zz7VdINugXg%2FePYmY&X-Amz-Signature=db173dd6875c5d1252a4852d0ff23b2c7688f6db2799e0b8d08e616c26259a34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q22333YD%2F20260126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260126T133559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIBVGrtZv8I7xXLNyjxurCTf%2Bys39l4pv26JLhozTQHzXAiBiUMj0hv1tEf4ia2SkG2wXBc0qAQJ1WIe4BpT2RzZ6iSr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMc1zUiiBz%2BELMAmA%2FKtwDxQCSa6oPikPjGa6rSTvxWyTQFf%2B6%2BfoYCy28CnPV40yYky2yKYXw%2BvSlOq7RzziStTdl%2BMhooQG%2FVKgWpIhHmJJw0tcwa%2BE9StLo1z%2FDL5txtlYk84Keb%2BV0J3o%2BnTDgRKd18pogaMlpG%2FMfPceZq6w0O7UXnouidnWemabj0yOqqsl4VEvTu7Mt%2FDN4fIwgCZLYBHblCBpy3FFz3vmEo0naBKF2eiTopiPtVLS5ycBAcWo46zJsuSTnhL1x1sVUYWokM%2FKLL8QQQ5VT3sO8J0ObPF2uQAy3i72fJw97kaUk8ZVk3rdMRB2Pa47CuVnmip4YGWRi77w9grGV2jP8uBH6Vpu8AuLxywfgCf3LTq1C1VqtXxKuhwgP0sdXNVja2CXBcmtA9I7gUO%2BzGJfgD%2F6c8Kd%2B1Hi516mzSHTTh8gjeZgjr6ZUCOR8iIJYYABTuWIKsWIzR3c4iSLmKpyT1nNtfpAXoHOZok5pmnUgxtD9OVDjG9LGLA6mfVMr8PhtkLHAvPT7aSJbdPDCuP0Upvzx%2F6vvyL5tO8%2BBpR%2Bvvta75u39A2EiE1pYmkblDoXxXI4wo9AN544hjpB8TWMRMZ0BdSpExYgiQgbg1SaQG%2FYv9cOtG%2BLlp1JBsbQw3KPdywY6pgFwp7DMMvnIEXMra2Nb7l0kjLwd82YPFxe%2F1h0Uym8uK3vWk6J1085BVJIccjqtwg3kUEIgidoRgba5Y5ZQnOJ581IBBj%2Buwr9I1x9LKd5VnYRa98HSJtKHUZxvgRAbWvYtuxcmW%2B2vJPHCn%2F5S1Lv0f%2F0IctafJPtVWrhIZz%2B2w%2FLk8rQHEMBncX61wN1PUXEDZ5VLvpDY4Xt7hHI0gNRl1ZhjIxt8&X-Amz-Signature=e63e8157888673fc6ea70ff5e2f7d97d1ca38a4c151ed7255e4ba5f9d3e024b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

