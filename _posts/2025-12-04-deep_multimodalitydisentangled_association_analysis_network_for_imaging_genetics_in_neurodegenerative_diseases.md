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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3LL2KMX%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDCcp%2FQAgfIf4NK%2BCYEy%2FgZmH75WZ8A1dpDjAa1d0EQtAiEAu4fpwb0HojOcZf4mT8oYhI6fDACH7QDuJF5HcoSX988qiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPuRLjbujQS2QuwR5SrcA%2FLBi5M2H9DHglQYE5EgaHWrUQE%2FDvsXQ5JTS8vlUNgWxwN0nOrvyhfUA22cB1uNdrT3cSHsO6MtvO0m1toYf54SRmunRE1CZBdOIPYS6aBhVfTLJ65tUtYv2EK6uPrTMkARvKezEkzBHrhfIKXsErdvSzM8gHvZCq6DbMwk0dEmAIYX98hhEBTLOXwhPs7Wt6p%2F2fcJ4yjCcDNraXadzB7EsWm%2FgGnu2VzS62anURLtATTNdHWbCl%2For0tpZsJc2oM2jj07PzWV75rUsNRauMN40X45NETHDzmSTwNmmJYVpaeBk6AEY4yku%2BfzIdP10DdADfcaMwZVSvawJP98DTb1vZcHlOyX5dQGshEe8gNRfnpSZn1rI%2FJ8XObGDsMyUfpDD9I3GfH9wdo74c9JsI%2BQydmvK6khv%2B0df4XiCcWV2JSS1wf62wYlMB8bF9uokoeKIenf%2F%2FACra6sVlgYAIhymsfVaoZ0CprGydMJRtkB9YktnPyAJB%2BVXzxtrNagmF%2B38fj9xlMV8KPVBZN3e9JS2jjsu7j1Ff%2BVCAc53o%2Foi%2FOYIL%2F8Qsik3F1eyryZA%2F4ik1CQVf0hkbzcZSECzQvIut95fK6Y6ED2Vq8bgd2WWUbqoPBX6eUWtVxQMJ7RzM4GOqUB8yIw0qfEtDmmV6gzms6k5QRlIyD9OYqZty9d21HViwt%2BI%2BTPUrGCFD6uuZKp9ww1sx3sde8NbbvtP2gW9JBNP43JdM65%2BbF%2FmUgGkSpY8PCdMyo3Gwi%2BoP16J%2FegtQCcqpUJAQNDUgCrLfe8s68HZYBxPph75lNapTKlIvXCTSqBiO%2FMqboniEFLdGvt879p4gOYMUq54sCfjA6RGuRF1mAN1OGQ&X-Amz-Signature=822615bf6bfb239b16c7b5e414668f10d3ebcc2e913d4fe91920555e7f1a62ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3LL2KMX%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDCcp%2FQAgfIf4NK%2BCYEy%2FgZmH75WZ8A1dpDjAa1d0EQtAiEAu4fpwb0HojOcZf4mT8oYhI6fDACH7QDuJF5HcoSX988qiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPuRLjbujQS2QuwR5SrcA%2FLBi5M2H9DHglQYE5EgaHWrUQE%2FDvsXQ5JTS8vlUNgWxwN0nOrvyhfUA22cB1uNdrT3cSHsO6MtvO0m1toYf54SRmunRE1CZBdOIPYS6aBhVfTLJ65tUtYv2EK6uPrTMkARvKezEkzBHrhfIKXsErdvSzM8gHvZCq6DbMwk0dEmAIYX98hhEBTLOXwhPs7Wt6p%2F2fcJ4yjCcDNraXadzB7EsWm%2FgGnu2VzS62anURLtATTNdHWbCl%2For0tpZsJc2oM2jj07PzWV75rUsNRauMN40X45NETHDzmSTwNmmJYVpaeBk6AEY4yku%2BfzIdP10DdADfcaMwZVSvawJP98DTb1vZcHlOyX5dQGshEe8gNRfnpSZn1rI%2FJ8XObGDsMyUfpDD9I3GfH9wdo74c9JsI%2BQydmvK6khv%2B0df4XiCcWV2JSS1wf62wYlMB8bF9uokoeKIenf%2F%2FACra6sVlgYAIhymsfVaoZ0CprGydMJRtkB9YktnPyAJB%2BVXzxtrNagmF%2B38fj9xlMV8KPVBZN3e9JS2jjsu7j1Ff%2BVCAc53o%2Foi%2FOYIL%2F8Qsik3F1eyryZA%2F4ik1CQVf0hkbzcZSECzQvIut95fK6Y6ED2Vq8bgd2WWUbqoPBX6eUWtVxQMJ7RzM4GOqUB8yIw0qfEtDmmV6gzms6k5QRlIyD9OYqZty9d21HViwt%2BI%2BTPUrGCFD6uuZKp9ww1sx3sde8NbbvtP2gW9JBNP43JdM65%2BbF%2FmUgGkSpY8PCdMyo3Gwi%2BoP16J%2FegtQCcqpUJAQNDUgCrLfe8s68HZYBxPph75lNapTKlIvXCTSqBiO%2FMqboniEFLdGvt879p4gOYMUq54sCfjA6RGuRF1mAN1OGQ&X-Amz-Signature=822615bf6bfb239b16c7b5e414668f10d3ebcc2e913d4fe91920555e7f1a62ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOIHLQ3Q%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClMHwKVjtOsXiSviNqymESu8GT9xpTvppSpORfzBwP4wIgc1ZTEEUouVWR4YPEo0hNENm0hEwguqYrdNulrNKG%2Fc4qiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBRVb%2FnwuC9wlx4WqyrcA8cVLuHsJmhgGACIfp62GT52jM6EhyxMgtaP2yEABggdqZzNSw%2FPkqiOUeslTvCriVTGalq2qnbjOur9t5f99mlhPIGzU9cxsHr24PwEABxVofSEijb%2FYmoC78tsSmB2Vvkd8bUdsGDMYT6M%2BZ5OEGx4PA7EEX6ygx0QnhjQ6NuDGLDZwRreqR041GUmL4iwlQJDfKoS5aTj8cmlUrA%2Fm62p5cZil6qS4uUMGW%2BxCPTKSCgPURyr0le7rbFZ%2B2MaaizsRn%2FWC8zQ4arpHS3xGQDKP0tQe48gJtXB66DSMOfGCNAHSECZIdyuEQfOoJxK8ulWpm7UevyszFvwl58psSfZeAJoZ5xIaoMiRUhTcCruVEP2JkMslW4WEst8x%2FaBQro9H%2B%2BU6TWZWEP%2BFijHsVTdN6EoxYEvY%2Fvsj%2BtewltBsB7ouLLoK13euMCUdv1IsW6TkdizdJf9%2F27b96EXA3%2BUBnwNYDzsLJwvwVr7G9fR%2Fvifpn5JR26AMMzXZjsbNkaGcekqjoarUWPGeqKeadBHpgzM722HyJl9Sd6a%2F5S6CAX%2Bzrrtt1gD%2FlZbJVa%2FKxCV%2B3S0V7d9hXtWvIz3PoJKKq87S8bxnK0FeRt805Zmqa97HUsgVBzZmzm6MO%2FPzM4GOqUBn1ZX9RLlGVb%2BagrWrEORAbfI%2FXejvHRqY66AfBcNi0zx12hHYzKbwUaf464mtnkkVIBLvovhkvbMWzJltaBOKFZwl9vvCM0Ao0zjHW%2FUKNoiyGw1E3Q9bq1Ye8emC5f7zLrk0PZ8pBhnsjULDJeVK6%2Ff7GyPX5WmpUVZ6yMZaQ%2FEajfFRarnefRLkxj9M4pVFhCGaGKRi2TO7mXSlevqmgEtrJrn&X-Amz-Signature=332d29afd1184de0a83298b2eb37b80600a155972e2cf54ed349bf67a806a308&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FKHC7IF%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDAMLbIr8xnRC18RB6i0h2dVc9cnGrqmk0XuL4mPQIBXAiA1oMu07ZxFYEvETqefVzAwUjT9sj5G3QTX9G8lwO7eciqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMi9ArCe9lDelIQwhNKtwDuQltogBgq7q%2FzYFHesbB3UXIYtvOx5zzqWNz%2Fycc88hEzVd%2FLI8lr3V%2BWC4T%2FJHhFG0M0%2FMOKmTQmhZ2UDV%2FM0IAQdfIdj5ltcm9NYsu7k3%2FpKYu88i9XmZp9j54G6mHPMBbjwXnom5cQKMVYHUNK18%2FZt4elU52Sw2%2FSvz8NGgenfOHN5c2EPyjzXYjeOV6CfcAN3nCmEcwPxxH%2FMFjmYqalZ0kxLIF15uvlYtpPmABrAnbh%2Fzrqb86xQv9kO6oSss3z0osUmcRdDMCrLwp9ed87%2BvSWzhkNvlnrIBueKz%2BfkUwU7edsTPXhhQYGh4h%2FCpUh1sOAfAjU3g1zOhQwt%2FX4rNHNSuv1cEFcLTr8uiAi1eIFFTSbXzBVxNq7AbCm4tgJVT3NVd0Q4iteqfkI1%2BnHoM%2F6wx3Sgwx7f5tZmA3ui%2BDk6Lwe6EgAVSHwt639CHja28Hn%2FvNuKgu56T5lxLLMCYF7FIAVqjNwndbSzG%2BoqyAsbxEl%2BG9E%2BikeeVRqy7tr%2B5gMVmmu67n5rzFv1NgOfX3ohbuM6W9QjQ90y81VQQw73dCy01IQGtWvrQwCzAYjSyRYL11WRMwNRGMheBeKHFDHYj%2FXL5LdSmt23BUmPEMoitKnTVT3h4w89DMzgY6pgFfOCBuziAKECWeP0rl0hEjVWwL%2F0%2BQh%2FYcedyA1MgI7JJ9fEOo1wVlJfxotjBe%2FCszpLESN2zElRDWdY%2FRpsuHTLmDZt3%2FelETFDiv1U7UgxU5KZq0rZq5e0ztxVimRRyfxF7kLFS95EMhLElqat63%2B3xJv65r%2Fwl7EHIvEAj2JzksF9j9l0Vji98Evk2Iq5LUkquK8af6BMRBWl8QafMZADJyrCd7&X-Amz-Signature=955e35d3830f5db79184947635c43c4e520f36564c7709e2d8cea77bdc5bd31f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FKHC7IF%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDAMLbIr8xnRC18RB6i0h2dVc9cnGrqmk0XuL4mPQIBXAiA1oMu07ZxFYEvETqefVzAwUjT9sj5G3QTX9G8lwO7eciqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMi9ArCe9lDelIQwhNKtwDuQltogBgq7q%2FzYFHesbB3UXIYtvOx5zzqWNz%2Fycc88hEzVd%2FLI8lr3V%2BWC4T%2FJHhFG0M0%2FMOKmTQmhZ2UDV%2FM0IAQdfIdj5ltcm9NYsu7k3%2FpKYu88i9XmZp9j54G6mHPMBbjwXnom5cQKMVYHUNK18%2FZt4elU52Sw2%2FSvz8NGgenfOHN5c2EPyjzXYjeOV6CfcAN3nCmEcwPxxH%2FMFjmYqalZ0kxLIF15uvlYtpPmABrAnbh%2Fzrqb86xQv9kO6oSss3z0osUmcRdDMCrLwp9ed87%2BvSWzhkNvlnrIBueKz%2BfkUwU7edsTPXhhQYGh4h%2FCpUh1sOAfAjU3g1zOhQwt%2FX4rNHNSuv1cEFcLTr8uiAi1eIFFTSbXzBVxNq7AbCm4tgJVT3NVd0Q4iteqfkI1%2BnHoM%2F6wx3Sgwx7f5tZmA3ui%2BDk6Lwe6EgAVSHwt639CHja28Hn%2FvNuKgu56T5lxLLMCYF7FIAVqjNwndbSzG%2BoqyAsbxEl%2BG9E%2BikeeVRqy7tr%2B5gMVmmu67n5rzFv1NgOfX3ohbuM6W9QjQ90y81VQQw73dCy01IQGtWvrQwCzAYjSyRYL11WRMwNRGMheBeKHFDHYj%2FXL5LdSmt23BUmPEMoitKnTVT3h4w89DMzgY6pgFfOCBuziAKECWeP0rl0hEjVWwL%2F0%2BQh%2FYcedyA1MgI7JJ9fEOo1wVlJfxotjBe%2FCszpLESN2zElRDWdY%2FRpsuHTLmDZt3%2FelETFDiv1U7UgxU5KZq0rZq5e0ztxVimRRyfxF7kLFS95EMhLElqat63%2B3xJv65r%2Fwl7EHIvEAj2JzksF9j9l0Vji98Evk2Iq5LUkquK8af6BMRBWl8QafMZADJyrCd7&X-Amz-Signature=4e73dcb179fcb7af7a67e9e62d8ba6a1ed4d64316e8a3268da1b88e13412a248&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PAWZDFD%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEsqCgFjBqyRaWRuob67NeKhfbqk1GzNTNZkpD4jiAnsAiBh2mega3U%2BY6tE7aXkfMas6jlzG7lQcynw1bbgMV9K2iqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcwWZLbxGodxdS3LIKtwDlDqZnN56L%2Fd34RYxmjp4XdSCdk5GU2S2NP%2BVxHX8grrvZY3tnKhTYXgvwkbUqNu4vk4aTDw85eRlOtlxMjNPALcZUBYYd3R8fnqpHkzO77iF9uSiWVReJbbYMM6txkNcWIDmj9hjZ%2BRizC9ekwTwbS2up0j%2F%2FkPcEK0Pww8OTbfVwE66qkv0kXKU5yOqT3ZwQ%2B8hFHxNk37eoq%2FG1kHCzBqkawphy2JouQKaAgsL%2BzUGvi6L%2B7ll6v9lotyxxffJV%2Fj6oXW8CfXcKDVEOob7Az4weGbyx0wZHql01x9%2F6zJSU%2BhNsa%2ByLWQXycRoM39cqJLgp5H66iwfldA4riX7y8YEQqI8K3cBQRLM38HJ2D266ZeRr%2FC18d%2BRtO1BTUFqLfgJU%2FMlddQYoVfpQFSnwX8KiemhLqnF9QhamdaDKbk%2F0UYf6d3kOekC6cKaAjmrWEP5Yu3kdD3wKAFx%2FioMNVV6Xjq2b9X6TqjhtWsIH92ecUaH6KdxLd6lPqlB0mmi%2FzqSHD7ci7dBi20N7SpNl98XfHID9hp%2FSG9LW%2BtKzg6MbtpF9mjYuMIc3y5%2FyjEwCS7zpzhIxslRPff%2F22ktSNqupHsdulBXby5%2Ff1B2T4oN5ryFuHwKZE2r%2BCIwz9HMzgY6pgHKyyFDEZRsyW2T6WO%2F8mTt%2F8T%2Fatlte1ZIsN0UB8kzNGr7lTMG75Pe9s3uSvCeZGfh7lb4sn%2BjpVCxV0sCJtug0OmLBBvKjI0llpWh1wQM22PPP6IvUI0juF598dACVc0iRqb03OKWeIn9iVuuwX7HcrnKX2JMwJ%2Fm2VYjgU%2FHZ%2BCcwvBPF1eC9GVUNzp7yrI8cQH0O3qwG%2FavKi%2Bhbvu1%2F6TleF3f&X-Amz-Signature=2b376bcecc970ef006d02e6b56ea6b5d57bbf8c7d6f0598f9815bc1b97326d5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PLYX476%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDi7NT%2Bre%2F1oIwoIwizblKrHBb0kLpDq9ufsmdix9jbMAiEA1gVWj%2BsOX8t%2BQPM%2BLPLRwEvz%2B4S%2Fiv5Ss%2B2Unz9lRQ4qiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDTuj%2B2FL%2BFJRFLoYCrcAwtCW3Vh5DgHkEvSmz61weZi5nTXXSYKoydCscik3OGeubeLzospG%2BwQ%2FxZiuon4k27SH3YV0Tb%2BB2CwuA6QdHfd%2B4ks%2Bi2W7Oi2XFtilT%2FJ4t%2Bn%2Bagms%2BKoS0uyNSsJz4X%2BEs1EOawjCdkZZUh7z4s3opSuAZmIEyk7EW1Znjv9je3T%2BMW0PxAHrk67rDFr8IMoqF31T6rwthAb%2FF1HFG6wpTOmw6lK%2BIgbxdKfi7Iuj94Tvoas5GZCMoYnpRV%2Fzkw0C2HMjlVBCLAFxBYw%2BL62cdgDZjvtGmyOkI1rR81WEnwjzhgfStWOGovmAXh%2BLygXD38IlB7wDw5oueYcJBO2rMOIKIkvdKsyGro6rOmu1auBnoX02TE9E0sB4qS1tZi3jLya8Vi8sbMPsVIEjbmz3xVBT7ClNcHpeNF98xcmaV4chQu7BimIXm02U7PjxBo%2FLu8C9nnW18wmdr7zoE3w5yzmzLfxP3io3lCFTsXStHaIfNhKvsQ%2BrZHHSFsbTmO0h9KEhJLmDA6gSzTmb322HuJgu9GWOs1a65eiB7pCtAVyNc1VXJ%2Fv54KfSqj7UNKcpF473aZmDo8YbSId6WnfotwQlzZlIAq9A41vVR4l19c303DkGFMxVe0aMNTQzM4GOqUBuQpBY3I5zZNczeolvZ0F%2FzMrRozHGWmQubSKSuyfugSUMYOF7snbPZBfNl5Dx1hUbhF9yOOfUsmWRbsRjlrpFLbL6zIEBKsmamWtQO46YWpFKv%2FJpYywgncyZHK8YIhhPUjcYGS5fAKhiQ9oNgu0DnDbEr7UVzB%2B932%2BOq0orcXraB0%2BPFIu9f8Vw8ZKYEdY0jakOghaU%2Fk6av8zb65PiqxibrZ6&X-Amz-Signature=b3787500de0163d7dbcd4aa2116e0f13058fb5e84a16cc167809f29d1af29293&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBAUOYE2%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBASosV8irUSZ77snOUovgxjCRTl7qf9knGV6VkoZLelAiAgKhcv%2F0sy89r6B9kGDJRo8bXrls5e0BqYMbO1CNIowiqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BcxRctPg9U7OIo07KtwDDL5IRR9p5XzJcbqjU9JYd487lhc8l7J4gGbcwNcz4DFUvvjdRYY7Uvqz%2BfSZyKj7B%2BUEqINKax%2Bc5j39MGUKIdptoZ%2FUtVv7T6yZ4QYdVq%2FGJdUMfNMoX23uy7b%2B7cZJYjnU6U9wApegD6adV%2BTF5wFyGy340iTeeKT9HGMBnSwHtogmHPulz1kPZuxvAyrTvrp8Hj2Gj01ncXjlDJFsaEa9KGtPEbBEbGZn9nUulYlC312MzkBhSE4zUFURpTnSZaTxHRl%2F4xNxUySQ50e%2B6SjexLo2rsDNEe%2FnMqH5vfVrv9CnXFgUQcRqc3XwALZJmHLbHMi5GSOsQs6sNu6WsXKQnWj3FgFYrtShMS9MfcpVkqssTSPnL8z5TQNgPSA6kCzwR2lNtpBY5jPQnuLiWRakmqcQM5OvKQPY%2FZMiRsYGNT1df7zYVcUSbsseBqQ8iEBlV9R6WIHhf6ahepQC0pRGlW%2BJ6PDSknxTw7xHQ8TpjGMvQbSZfA6CjmtJxg1hCJes323A%2Frsjdt2qiHSiBefa3HoFtWPihjen44aqFvHpF0EGW9Pfl9R1GKBCQYXlEX1VEfgEBqS4Qhtp2xpsaloKJhkHizhNgGo8ZTQQ9inOPlCNDjorA%2Bd7Uz4w5dLMzgY6pgENcPDKxLH23Vs7cEVQvauj1%2BYqgl97OPFrjJ3%2BZmSYu9ODnqfz6vhJsps%2FEBO12hEMMMoDtnYaol1vhsHms4k9%2BKBKZxZUOdlN4BSRw8ghcThvHmqcnee%2FT5aqgJuoIQ9%2FBPbk9yRldq4Vyrrp34JEr%2BWTeUkIHg%2FK3ac%2B2K1i2f8NIWtu3qXW8Sm%2BhU0o9%2BnFE3zwuZRf%2FcwR5lEkKirbmVh5fCJu&X-Amz-Signature=f025524b4572c55d1ce12cb3d1375f80039750492f7f64594102db4d93139b79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMXKC74J%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCh%2BumeBoQafbTdOrChWVIRRjPiTA5KClnt9UY3ZedebAIgQvPHM81hCtp4r7%2BHbx0do2ZqVetXyPiZ3Vk0DgZgFHMqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFO28wKJt2bL17U9eCrcA3u9mRHEmltbS7n8%2Brm0ubMsgSKIxQeIEOi7g%2B5CqD0hlBY6N1QYtXLxX%2F3EUZMOTT%2BJT1Ok6n7LMs58jUyeZlBdMkKO8pElStz%2FvE2f9xAaePeih9uGYYETJx6CXcLOX%2BD1LotNYekryLdaQC4emxahHVzcjoZtDVOGkaWDUWQLaGn%2BxIiRqosh4X%2BoIop0Kvsm15s%2Ff2EQm6r3fSfg7JSHpRn21wpdeyZbJvuRBkSD5k8t%2FEu1Aj%2B9MCEkbHbzZRLqLFJ4Td8tjxSvPEeW86Uo%2FRFZ6GwgXdJVVwlHAwMbipmhnL5qNIdO4NUC4ARSf%2B1n9M6yH3MYtgEgCPNtqJYrh6yk11N76vrNBsDC%2FmICIISiBTSZVf5Jv6VyF8Hc7yNEoIiUXlB81i09BoAGBzKySlT06ROqi%2B8uVGVtjS0VoLN113toQG03%2BCgj650%2F8cQPwxA78hNGWFFvABYbCe5%2BBDOtlkhMhO62Da2ny6gbhPRRFUMnIpBXr6qCczXOJd0TfTInCV4H3nbgwxB4KX2ksosFqrYnNpeqoEokrdSKLDA9aV%2BDk2Aj11czqZgwA%2FrDnrVa0qqvQi1t6Sh8SKPiiFR9qGHStX7PpwoTDKboBQvx%2BHG0AVPmXZ5IMO%2FPzM4GOqUB2E3p7YEn90p8G%2Fiu94cmbZSZo81TUIvt%2B2eHl9KT4qwhXnl91PyjfaR9gC9p9i6yOX3RWC11%2B8uYbH6Qw4q5fUfsOOOsHvWw4gs3%2Bvi7FYhWDkXxuQ3lVA4gzJKOzm%2FNN%2BcSGp1HmJKxrZyo%2B0yhQ14qdTBMTOlIQNhQneI8KsYkyskzvfxXepjponKZq88UcJvX%2FCm4qIAqNjeQTi692eN2uP0Y&X-Amz-Signature=46df41b38efd9172889349faa032631f862894952f8d857807a178c2f065476d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMXKC74J%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCh%2BumeBoQafbTdOrChWVIRRjPiTA5KClnt9UY3ZedebAIgQvPHM81hCtp4r7%2BHbx0do2ZqVetXyPiZ3Vk0DgZgFHMqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFO28wKJt2bL17U9eCrcA3u9mRHEmltbS7n8%2Brm0ubMsgSKIxQeIEOi7g%2B5CqD0hlBY6N1QYtXLxX%2F3EUZMOTT%2BJT1Ok6n7LMs58jUyeZlBdMkKO8pElStz%2FvE2f9xAaePeih9uGYYETJx6CXcLOX%2BD1LotNYekryLdaQC4emxahHVzcjoZtDVOGkaWDUWQLaGn%2BxIiRqosh4X%2BoIop0Kvsm15s%2Ff2EQm6r3fSfg7JSHpRn21wpdeyZbJvuRBkSD5k8t%2FEu1Aj%2B9MCEkbHbzZRLqLFJ4Td8tjxSvPEeW86Uo%2FRFZ6GwgXdJVVwlHAwMbipmhnL5qNIdO4NUC4ARSf%2B1n9M6yH3MYtgEgCPNtqJYrh6yk11N76vrNBsDC%2FmICIISiBTSZVf5Jv6VyF8Hc7yNEoIiUXlB81i09BoAGBzKySlT06ROqi%2B8uVGVtjS0VoLN113toQG03%2BCgj650%2F8cQPwxA78hNGWFFvABYbCe5%2BBDOtlkhMhO62Da2ny6gbhPRRFUMnIpBXr6qCczXOJd0TfTInCV4H3nbgwxB4KX2ksosFqrYnNpeqoEokrdSKLDA9aV%2BDk2Aj11czqZgwA%2FrDnrVa0qqvQi1t6Sh8SKPiiFR9qGHStX7PpwoTDKboBQvx%2BHG0AVPmXZ5IMO%2FPzM4GOqUB2E3p7YEn90p8G%2Fiu94cmbZSZo81TUIvt%2B2eHl9KT4qwhXnl91PyjfaR9gC9p9i6yOX3RWC11%2B8uYbH6Qw4q5fUfsOOOsHvWw4gs3%2Bvi7FYhWDkXxuQ3lVA4gzJKOzm%2FNN%2BcSGp1HmJKxrZyo%2B0yhQ14qdTBMTOlIQNhQneI8KsYkyskzvfxXepjponKZq88UcJvX%2FCm4qIAqNjeQTi692eN2uP0Y&X-Amz-Signature=bb8bf1a8cc98c1cf423278678a5f5538fcfbf90295745c62e0c4d6b4ee678024&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBUAKCT4%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHp9BojiBpvEt8vFK6%2Bg0eJyp2ki797u0Mma%2FS8YkA1IAiEAhWdsBmZm3ZS%2BXBuVGydfB3KRNjkiGZmqOY9QxQAvLbIqiAQIxf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHPiA4QpHBB%2F24tMdCrcA3HVua4YVXK5gkh%2FlGpnRmrAUj3d8dnIcjMOVuyGOnP%2FXpdxxoOiMP344iCCGWvsca8vfOwhTfYOAiMrqgMyrgUPpcgdd1M%2BYqnp6a6RkaHteQg%2Fs5LiM9W5x%2F4PhN0KurERzxYcyIqFM3CmuX78KiKy4So6BeCm2%2Be4kvXoTHNA8krh%2BkrWP75CjJp5L2e70mAZ2lHd16fBH%2BChQNg1aZ9hcDDYPexePJYrbiwxT1h3b%2BRkyZpiFyfxIioT8VVVedpbW8Fvkefxoxv5qYsefsDWLILCgVsbPy4TDKqRnY4lO0RplG6y3ns4nJJayol2jSWeOLV8JB9OSoVKtypcj%2FSTHxyt6V2%2B8wb58BVMJ6dlk%2FB5RfiQ%2FxfBSX4Xg9izXz56qoJwNAcCWezicPhorlVZYGGspSbn0oyRY3PR20jP7s8%2FU1b3bjtkY%2FAXmnfZO0RfpMxAU9nFJ6AcSaiY5rE8kTOWteMxIo09DDxbHSHblo6aVq8lXBk%2Fmvcu0l1hsaimqisKAzEbc1Pubx1MgLQu68MBh4bEYUDRO67w2En3Rko1st6gKpr%2B8DqkTKxJ6F9Ti%2B4qUzZQ6L8AfiOTL9EzNxydDOjZ9FXCN5qp93DRmfCDA0y3ZJGqe%2B8pMPrSzM4GOqUBlUFpnP7r%2FoPHjdmQfmeSWIlD%2F5mddliJc%2FIFUc0GmYylizKPWi5p92gS1osRMHiTnQ4nr8%2FSjFd1zfjBMOC%2FNYM%2FEa7U0NEyiGS2ODm5KKoksiIeQZUl0A95MwjCI157zxNw2Fkmz%2F5ZQET4gxgep8TxlMrVtqgWGw9PcQex%2Be2nAsm%2FXpjtV7b0uDDtxFkNZtwvFbv2l4zy3vE6y5qdSc1ASNTD&X-Amz-Signature=db98a4b7ef7e6fb9efcaf00be3f096aca016697caa3a1b86d5e6de7e624c9374&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7DOS7JD%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDgahzxgQnpiQl5lid6ac7HLFLPCNKIzOQPDy1mREvsZQIhAOheNhaiJJMbW%2BPFIZ587o97YYPb9f9S%2FhcAwbKbHQwwKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxnc%2Bjc%2By23bgFm9dsq3AObfiLZ18y6XDzhsRDAlaI8ttCTRJgkMVx3UWS0L9OpBIk52eJ0qcsnYDM5A7WV3QK3pgmvFLDyJA42Oyoj8xGK6Uf3rQe5e2RRW1f26kgiTsnTUWfyXIz0vjPIwNyL02C2p9cj3qCWvn%2BFTu5Onu4GkacVssobx%2FlYvbxapX2Q96a2aR6kz9cHL%2B3vC%2BJw6HuEz3T0zXfedrjk8gghwJRBIjcC5NtWfnvlw4wDyqdGyKqlzVRYZdO4s%2B34nPyO%2BH2i07sB%2BYjO59Z4rT9GjxVHkyUhZQACcubbtzXWTvEQ%2BtbGoR36br0ZiH7Qc33DH7PyZQI3nSgjU6%2F1rEhcbFZaEbYmHos1zM1UAloNHzgC16kG4NYw%2BNY3ukuunZR66HNzq6v%2BZBm75RoJX5sDeJcVpL1iYt0%2FSnBE62Z5AnXkZqCHafF57pD0sCGnGrVq3knfL3sDcdrnUs2RSctHYIE%2BmuGFHfpqbb1iuKstCWHwGgGxUol3zY1EUpyjHzwI73DNSUpXmUWexJ%2F0cMfzNI1nF4NMq0r%2Baa1p1KrSaRrJ8WDfQm6Vj45CYg6HCe8SXl3a0H5V95V1nPAjQrYqnkuc6XU6XT%2BOnv5SGBwt6p8GODM0HDigiTQS%2FAnrTDCi0czOBjqkAYJbik5vbzY6iXnMNljj6z1xyruifNvBImKeNGbCLoRNDO8H%2Fn7R9fAFsJpQ5842GSNFczAvuOD%2BvL3gl%2Fo8orGoD8EVwu4JOKSg8zL3B%2F3zLoQwbbKflL4cBa9To7Sec101NygjUBjfpbnAOpGDk89KqiKLD7vIU9A495RnoxM14xro6kcezZMilcwUWqsv2CZr9fK76vzQMUPiClW98TKWmgwf&X-Amz-Signature=a5e32831d084f8692fd57e444bac8e6dcc82e8d090d5a1b9eff889288cd4af67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7DOS7JD%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDgahzxgQnpiQl5lid6ac7HLFLPCNKIzOQPDy1mREvsZQIhAOheNhaiJJMbW%2BPFIZ587o97YYPb9f9S%2FhcAwbKbHQwwKogECMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxnc%2Bjc%2By23bgFm9dsq3AObfiLZ18y6XDzhsRDAlaI8ttCTRJgkMVx3UWS0L9OpBIk52eJ0qcsnYDM5A7WV3QK3pgmvFLDyJA42Oyoj8xGK6Uf3rQe5e2RRW1f26kgiTsnTUWfyXIz0vjPIwNyL02C2p9cj3qCWvn%2BFTu5Onu4GkacVssobx%2FlYvbxapX2Q96a2aR6kz9cHL%2B3vC%2BJw6HuEz3T0zXfedrjk8gghwJRBIjcC5NtWfnvlw4wDyqdGyKqlzVRYZdO4s%2B34nPyO%2BH2i07sB%2BYjO59Z4rT9GjxVHkyUhZQACcubbtzXWTvEQ%2BtbGoR36br0ZiH7Qc33DH7PyZQI3nSgjU6%2F1rEhcbFZaEbYmHos1zM1UAloNHzgC16kG4NYw%2BNY3ukuunZR66HNzq6v%2BZBm75RoJX5sDeJcVpL1iYt0%2FSnBE62Z5AnXkZqCHafF57pD0sCGnGrVq3knfL3sDcdrnUs2RSctHYIE%2BmuGFHfpqbb1iuKstCWHwGgGxUol3zY1EUpyjHzwI73DNSUpXmUWexJ%2F0cMfzNI1nF4NMq0r%2Baa1p1KrSaRrJ8WDfQm6Vj45CYg6HCe8SXl3a0H5V95V1nPAjQrYqnkuc6XU6XT%2BOnv5SGBwt6p8GODM0HDigiTQS%2FAnrTDCi0czOBjqkAYJbik5vbzY6iXnMNljj6z1xyruifNvBImKeNGbCLoRNDO8H%2Fn7R9fAFsJpQ5842GSNFczAvuOD%2BvL3gl%2Fo8orGoD8EVwu4JOKSg8zL3B%2F3zLoQwbbKflL4cBa9To7Sec101NygjUBjfpbnAOpGDk89KqiKLD7vIU9A495RnoxM14xro6kcezZMilcwUWqsv2CZr9fK76vzQMUPiClW98TKWmgwf&X-Amz-Signature=a5e32831d084f8692fd57e444bac8e6dcc82e8d090d5a1b9eff889288cd4af67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664X6YTDBJ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T043146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGIDiFlzhRFLotbnjNHNM4ePbaJJQQGl%2FzZBJ3rWlj2EAiAOj2Y6MYPkb8iLxUgsJdlaEc00Jtv2OsIEW%2B6re9U9XCqIBAjF%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLuN7iJ9yT8zNNb4xKtwDGr8hriVRwVK22GGNz1LMJR9nSPWthmo198SYQdbEKswttMAI%2FhR0RlziyY0Y81qqRBRjOV6rr%2BydF3kh5NFI9QBKHrvJC6EBiPVCW8Fomn7LiluZnQAjIUIPL%2BQydb8D7fQSjgvfPfgFREuowtiSOWgpQAGv2%2FlBbx75aWi8Ao4esdPn314ate5eO2P9DaqokEWtzdjB409Zh9Dl%2BWaJlBhl%2Fec9SywVv5kADLmSpRgxpB4nLiUIDrvxkhkDRSZY05weg6T6JuO50NCAHnI9pfR%2FzOYQ%2FYiMBOCaCb4SFqgsk4m885B%2BunmKjmJkwD0JxiTlSwRg8sAHFWTMZlSSKoz3E8%2Blngqh4IUyDRbgGn1rnXcHHjyUiMwh2vNRDQWZIHlp6Jw8EGH3wWG%2BrLclEHHoJ4SgQmf1hdd4EYeB5NFt3gnuodmCZTVkVaHcOUqc6FvgapVmcRPDhw%2BavXFX2gW6Vw6hTKubWtj%2B1Y%2BF6TpX7oM5MKGv9V4XlpCs1a9FTeXQuwDRNuuTWPr4FiNwGJdON8pIiOUd4so9hXRfLAq1%2BNO%2BgAp4i4aWyn4%2BWEct9k8r8Qd5UIQLs9aFM5E7HFhJ9p5X%2FtpOaaK7regNdvs4E0IHB6sQVWA32yEwzNHMzgY6pgF5FCtTmiXm1LOxrGl0wLfjzKSqoF2TQRSvfmE2QukPLFUl9KdwFAXJ8flDEcSNq6c7dAsnZBw1vb7iUjij%2B%2F60jXceU75kBd9WMJ8igSqiTLr0TAZssVUlQnZQTd%2BGA2jEf62GDlZpGQDroWcXYZF%2BI6cIcxegVXwaCjWDcZEoispWPnUbNVnNLvEhxB5L5L%2FQRbp4u6gJsQOHCzsprAr%2FV%2FdCEKf9&X-Amz-Signature=fbae3b68438c4508451760c603b1792d68e82201aba339a7bd83b0b77b8da908&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

