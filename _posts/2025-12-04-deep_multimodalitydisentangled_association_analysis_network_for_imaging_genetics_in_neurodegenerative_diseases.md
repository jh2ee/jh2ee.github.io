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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4HZJENX%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICZGH3h%2BJSW8vu%2FbYvC0ZGd1SvZZKohXKjtUm8Pj8MwWAiEA0AJTUO7VWkXcehyXQlHB%2BBQKh0dWbfiMaWhUUFOMphcq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDPgukJRTD5sUYHY50ircA840jVtLrwH4ZKtySQVxA1SmCBQtuTxcCO3aCEDGVOa0zS1JOJ7xpEhtMvijr8fr8EgMQYbNb9EL3%2FbgYM92gH4te8OXZVlXQtND9fTkKmWZ4Ke4HlMQJS%2FXLIeV1yxEuxodLfdRUW%2FgVmbeuSgszT8FyiwjP9NosLh4EfrHEb8BckJ5ZDgPkezKt8un%2B1e41aVg9NeEIm%2FbyIbNwSU6zEIzWT7%2BNBuxAkfX9CV0PbkLRGLLvMLlF7SBTKOkzI%2B%2FnirFOOnQO4VJWwRmvGbdN8hvAhJaS74G3vLTlpqJawsM6tOEQT4zkMHDMKvLMOhA21uZyHb%2FZ%2Fw4fhfMlCzlseGrnBrW4GbqdqTIGPVU9wv5wk%2Bj5vPTr26VnAiuZ7TAqQMYnHrRHF22VtkN1zb1BEpA08dzetOjib0HeuA8YAZXAjvqXyE4a59%2BOo9Z%2BQNVBerPZ6rLuuj9nBZ4eyYYgnziJN%2BW0HbBBXnOaPqwGVb0oK547M6%2BR97ULn2D4fSbCExC6lIEeuFbDZLLU1lISremTC4%2Fx9TXhZQjV0kZzu97fcIas%2BV830MYQkiTAS0f8AsjJ6mSY12udkAmkON2sWZjNnyfXfahdOknhInmFXJSfD2q0QQYaYANMDc3MMKysM4GOqUBFtU5LT2y3Nk5DK1mox0aEcDX7Baa5UcAimhoW1poTzt%2Bwek8M2LPN%2BUgzh6XGSY5oD4pAkYig5WCih3ZQuHJnkZlL2lqaUlFEIFJmKdS6vR5AIrPHzNC0KOepexZT6miFGn9WPyWkus52RT7n9Z72IgcMAU95o20cT9F8iI5g013Eyasl2HyIR5YsFGaRS9iZ6VVjgGsLJL0qIhv8fBDKXc4DBlx&X-Amz-Signature=853201c0baf095752bc849283ecd61cbbf08a1d326a74744a46c4b1a145b5043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4HZJENX%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICZGH3h%2BJSW8vu%2FbYvC0ZGd1SvZZKohXKjtUm8Pj8MwWAiEA0AJTUO7VWkXcehyXQlHB%2BBQKh0dWbfiMaWhUUFOMphcq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDPgukJRTD5sUYHY50ircA840jVtLrwH4ZKtySQVxA1SmCBQtuTxcCO3aCEDGVOa0zS1JOJ7xpEhtMvijr8fr8EgMQYbNb9EL3%2FbgYM92gH4te8OXZVlXQtND9fTkKmWZ4Ke4HlMQJS%2FXLIeV1yxEuxodLfdRUW%2FgVmbeuSgszT8FyiwjP9NosLh4EfrHEb8BckJ5ZDgPkezKt8un%2B1e41aVg9NeEIm%2FbyIbNwSU6zEIzWT7%2BNBuxAkfX9CV0PbkLRGLLvMLlF7SBTKOkzI%2B%2FnirFOOnQO4VJWwRmvGbdN8hvAhJaS74G3vLTlpqJawsM6tOEQT4zkMHDMKvLMOhA21uZyHb%2FZ%2Fw4fhfMlCzlseGrnBrW4GbqdqTIGPVU9wv5wk%2Bj5vPTr26VnAiuZ7TAqQMYnHrRHF22VtkN1zb1BEpA08dzetOjib0HeuA8YAZXAjvqXyE4a59%2BOo9Z%2BQNVBerPZ6rLuuj9nBZ4eyYYgnziJN%2BW0HbBBXnOaPqwGVb0oK547M6%2BR97ULn2D4fSbCExC6lIEeuFbDZLLU1lISremTC4%2Fx9TXhZQjV0kZzu97fcIas%2BV830MYQkiTAS0f8AsjJ6mSY12udkAmkON2sWZjNnyfXfahdOknhInmFXJSfD2q0QQYaYANMDc3MMKysM4GOqUBFtU5LT2y3Nk5DK1mox0aEcDX7Baa5UcAimhoW1poTzt%2Bwek8M2LPN%2BUgzh6XGSY5oD4pAkYig5WCih3ZQuHJnkZlL2lqaUlFEIFJmKdS6vR5AIrPHzNC0KOepexZT6miFGn9WPyWkus52RT7n9Z72IgcMAU95o20cT9F8iI5g013Eyasl2HyIR5YsFGaRS9iZ6VVjgGsLJL0qIhv8fBDKXc4DBlx&X-Amz-Signature=853201c0baf095752bc849283ecd61cbbf08a1d326a74744a46c4b1a145b5043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JKNJV34%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIQCqS8f4wgDl7XUJJjsnG0Cmbqggt6tguWWkm74COJpsAAIgb0ApPxfEMdzRrh8%2BIWxaw6miOQQFoEHqXibTXktGw8cq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDFi9govbG7N51DilqircAwxvPVNRG3UapZRAlC1JT2%2FdallZ%2BtIuAFAtmc5siPyk%2F6WXkhEdZsVdI2%2BeQxs4N1lVGBrKucArkd23tesCuYZlWbsXVJMgZ%2FYRCVQSSjL36N926DEPgLCidpHfhe0Sxq20foWFeCjp1SYlcn9xbRLDnxE2BXVwj8aNNCSbS45DwUqx3v9gZEvEe%2BBNQsDjIsn787sz9rccD669TwQytaZb1yvM1h%2BiEh9HQeWKmpFo1KcO3D%2FN0p609buWVMaBynCYqO%2FIgbMAU89j2HAlKmyzti9FvodGTUeqPwJIflmOFEcohy%2BETmnloSUahXDvL2q2ZHxzXclyWYwGiPT1E80DMIxUDMWrYPszM0JdmRW26DmnEP2KvPe7CL6pt3yFvgTJOBjOvT%2FBp1jpC7dUcAq7t7545vhrCSplyd1OyO2ore0CsOKf%2FeY090EtcN%2FwKiGeFB4pcIw%2FDVEoTW%2BFjrMiRWeygd8SSy8I7tPXQPCBWATINuRGjuWefkHJSZt%2F%2BoGyxlUZ2lZ%2BWVnvz1P85Pq1%2BY%2BlvoS0LsR656qqTBQvqv%2F6e7iorfXEYgia0KfvbIXhHQlGKDQNL8C2h99b0ac67oJJU3LOSccuacE8iYpYrhdOGDKhu04gyk3%2FML2zsM4GOqUBrc5zg%2BQ9KC55zWtoY1XEdNedA5%2Bn8Xw8EdGEy23B1dSpHEghpSlH7Of7D0K09cQ6tmpq5rEi%2Fz%2BLHIpFTBVmYKyC0oJij3kVlWsB2ohDRT2cnvHpAwdUCKp9bI%2FVZcrBl%2FrNjeSeh8gSXJgK9wHCZee0XcQzwUJlv4reibXxFGZ00ybL0HJqjhrUjToHxw03RTQNOac9FymRA9qQTjS6mi4sXYkd&X-Amz-Signature=c8ac70467bd0d73c914137a6c7fcdca32ce9993c70bde9debd63824db4114de1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGEUGR6V%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCICtIjq%2FiMlIrilAgfS%2FvxXv8DS4%2BlVXP9V6y8Kq5Obo6AiBGaQsBkEUJtEYc35AnOQo0gmpvm%2FYYJQoyOs8kpZGf4Sr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIM26snfx31MSgm98%2FMKtwDE8m%2Fa%2B%2BqZv3fxveYW5%2BfGSidnctCEEvs%2Fj6NUqMqy8JysHSoYjyIOHbi1863iohIApT3Pfwyo4YMe%2FsIaxSKp96uPp%2FDeC5BVFbxbeK8noIh4uqRW5yitLaJ20xRL0gP21LecIChp41Ti3siFijfLQH9JsLqmANosMjaSQcG%2F2cauebgg609nA9Rpmgr8q5I1dqWew6VcHYVjJmvVmZgdqGsMLv%2BQwSZg%2FOSK0iWO7UDdgjIlRJeV2dmJIhJGN%2Bi08JZWX%2B%2B2VZXfHPXFfhx9dmeX8euMytOXs5aL6BFayB3jv21kfRl6OkB9hk0YvhcR%2BsIk58L8r7GgiF368pKP1535TYSVNkT3nLW86vf2x6MWh5B5ol9feEi7EaUyEpQTWpLVn%2F72wLO8e6xmCOcQ3UCXVqwYVWBwvghWBqiR3CA11fcJqDkW2w7zP%2BZvjfot9Npy3vfngMWHrwlp%2B5vT%2FLDiScCQg2fBtTOqRpH2sOcJHRnBfXVHgmn7KXfBRyxEnKOD4%2FnQ48T%2F4n5KybrUoL0bcZSG4fUy6IHvvIyeTsQyNxlI%2BmUeTR3PmaH1mTe3Cr3KQ%2FLUE2cM9hdzI%2BKcmY6b1zKgX4pWZpxkHIdziTNgt6XFSbbBTmQc2Mw0bKwzgY6pgEyB8hPS8y8bSA8OTJOnA7nTsxIK0s%2B0X0wrW71UaPH8Kmdoypi0fwBpTTFeYzOHOvcAy2XMnH80IKUOKA17vQob2PR%2FfeAuuTU18REsoqPMiKlsUQgeEDuTGDMB0mVr5TpYoW88EU9qL8XQ%2Bcb4k0xD7IwgETvnPTenA4k5bqsxNrORLBinxWuIQaxt7TjndxiMuUyDF6lf46Tumc6YgaovUVVygO%2F&X-Amz-Signature=e0b1be5ab2f9b509f6e136b1115a911f17cdb541e87c241008b749e2c79adb83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGEUGR6V%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCICtIjq%2FiMlIrilAgfS%2FvxXv8DS4%2BlVXP9V6y8Kq5Obo6AiBGaQsBkEUJtEYc35AnOQo0gmpvm%2FYYJQoyOs8kpZGf4Sr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIM26snfx31MSgm98%2FMKtwDE8m%2Fa%2B%2BqZv3fxveYW5%2BfGSidnctCEEvs%2Fj6NUqMqy8JysHSoYjyIOHbi1863iohIApT3Pfwyo4YMe%2FsIaxSKp96uPp%2FDeC5BVFbxbeK8noIh4uqRW5yitLaJ20xRL0gP21LecIChp41Ti3siFijfLQH9JsLqmANosMjaSQcG%2F2cauebgg609nA9Rpmgr8q5I1dqWew6VcHYVjJmvVmZgdqGsMLv%2BQwSZg%2FOSK0iWO7UDdgjIlRJeV2dmJIhJGN%2Bi08JZWX%2B%2B2VZXfHPXFfhx9dmeX8euMytOXs5aL6BFayB3jv21kfRl6OkB9hk0YvhcR%2BsIk58L8r7GgiF368pKP1535TYSVNkT3nLW86vf2x6MWh5B5ol9feEi7EaUyEpQTWpLVn%2F72wLO8e6xmCOcQ3UCXVqwYVWBwvghWBqiR3CA11fcJqDkW2w7zP%2BZvjfot9Npy3vfngMWHrwlp%2B5vT%2FLDiScCQg2fBtTOqRpH2sOcJHRnBfXVHgmn7KXfBRyxEnKOD4%2FnQ48T%2F4n5KybrUoL0bcZSG4fUy6IHvvIyeTsQyNxlI%2BmUeTR3PmaH1mTe3Cr3KQ%2FLUE2cM9hdzI%2BKcmY6b1zKgX4pWZpxkHIdziTNgt6XFSbbBTmQc2Mw0bKwzgY6pgEyB8hPS8y8bSA8OTJOnA7nTsxIK0s%2B0X0wrW71UaPH8Kmdoypi0fwBpTTFeYzOHOvcAy2XMnH80IKUOKA17vQob2PR%2FfeAuuTU18REsoqPMiKlsUQgeEDuTGDMB0mVr5TpYoW88EU9qL8XQ%2Bcb4k0xD7IwgETvnPTenA4k5bqsxNrORLBinxWuIQaxt7TjndxiMuUyDF6lf46Tumc6YgaovUVVygO%2F&X-Amz-Signature=ca576dfbbd8fccac3e3f3b435d67851f7d317f7d8c5bf057c43576dc1542be2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URMYYHBS%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIFjOiIoICVXvw9vDTSqPHGtWDW3lipvF2AXO7KPVpkb8AiB4Bpf0vJ51yo5lz7iwIq6%2BXaJ0CxTNcrfXIcLVvLWhLyr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIM6rfNzAxt6PAwf%2Fl3KtwDPcjaMUf7eaz5%2Bwigqd0d%2BEJlEn4hsqLH6gwnNHSxYQZNFsBBSJYujoM2K01n5%2Bay27WZ2Nw2zt%2B8IafxNl4THQvcOW6MC9Rl6%2BId7P1iTowzeF27AN7mGbhR%2BAGXe8feq0r17Y4V%2BauPZWYajwDbOg0sRUWOTd0yRz5bVsqfmGxOJfhGqh3eHa5KVrrUfgnLpdEd9zghQGQjSSlHHdAXR8OoxheTUb37F164TSLhCn88dVKUpdh6OLLZUkQLJ%2F%2B2J%2BjA8I48zZ5mrAPketdYHJ3nv68OAUgjRt0tcJYAnUyIA2fa%2BVVSmJDp69rGRT%2B2DGH4heBfm89QVfc9aJIogaOhbPZrXhtts71vG1DLldL4w9MbJvN%2B6IzqxzDtMVylhGj7%2BWXYl8CGG26O6gmntNwMVU9QByuU3C1B9kVpeUHuvdV5P6gtqIoSoZLc2yGjn89RlBMZpBaM2zQBBHxbLoj88ebnRZpdq6r6aJmqSLuHCaq5Z0cbXXd%2BnMGR2Qg6Dgn60b7xg%2FYONltvYTpap%2B1oWdlbZlpj48gRDfb3KJcKIEloSsgdbZOL4y38cLefipZ4i9V78w%2BMynO1zwccY6S7TsV0RNuq0HxKhtArW1CvyL4%2BXFIH2Xu5c14wkLKwzgY6pgEGhk5S6w2w3d8mKlZW1%2FXuKXAn6lIOHleoa1PT%2FsfyyAQ%2FgP4tlnOrHhBJVh%2BTgyuug2HegCGdzwWL%2F1ygWReftRos6suibdKeh%2FEkljQhzaUdRroKXg2c0fsGLm%2Frq22iNqIKjCTR9OCzmaF6iGqbtbwA%2BhUBUdcKjQIPJ7v%2FoWfkPhHW0KqbYLrVhRApiJgxw4OonLURa%2BIR75FNbTD0QCdMRo6x&X-Amz-Signature=0305671030fa3cc130f9635e64076eaa3197bd3ca8b8efffeee6b1264b8d089f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CI7FQUL%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCID49S1XyUKqS16JGFh3POxEAi9lIZXDP4XrUkAkk1cdqAiEA7jsaF1%2FAAFFHIFALgX%2FCl7meh9q%2Fc8TzHSgVkkP%2FYlEq%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDDmsahqxq%2Bs4HObT%2FircA%2BN4wkEfszsSvC6SvQewcQkcMBu9rZn1fK7OSyX8oH5sytm2GnxUlVcXniMGNrLKsqHt3mIQ51zaBC40u5IK%2BBw8YebYrJpDK%2FYyLIoz%2B9hfi6HSrN%2BvsgH1pC%2BqMLes7V%2BngCgq9jBGtEgnzEG3pWUPc8FW3zTrZf92OufZbWSgHIxFFKpJpoh2NLE6WW%2BWhzaGj%2BEnUcLu3bmDtUFxfns7Qsj3H6cUkHrOZfeSpC3dEzpNLqXd829mD38v4AM8msq%2FgoDpSjo3dBgfDsSfYZuMXuJJq4iWZpBtDmWcC35zJYzZV1NbWPINCrQ09TxseSg7%2FwFZvGYPal3JtQlLyg%2BolMWGaROdBId635WKhW611eYGoB10dWWxSDcuM2reeg9wAypcM3dPReceMox4Ilc0D4NUVVkadgKr7A%2F0M9Ydy3kLTtODCcTrWaco1Scl3tN1H%2BA%2BTjFVsRdI8CDccRj4y9dxl07lh9xE03hNQXiLPh6drb%2BM6fO6p8wHfdPrecA9XXSGMSUDF6AMn25Eha3Hnh7hZ7KBiGjPRJETxPPOAS8r%2B4vzE6kPK2GQEp3cAdLWI4QMQ72he%2F0xUUk8d%2FFMzKUNnl55iuJe%2FcjJ%2FaP7f5Xb3%2FautiAy1gDLMIeysM4GOqUBHgnkBIh6cr%2FkTewEFrro5uGMd16YNYQTDQHvjhQRXIs2smzUl%2BclzyRDM2SdB2V1XBiBe3Tx8liHMx3ZiuOVGP5%2FlDr5A0xPABYzCw4ZmmNxiL9l%2BlAZ1RwboTx%2B0bENriDQf6teWA6pv6K%2FbUXq%2BGzlI11lRmIbPFbBtrLsp4s5CXBZJwMLwCT2jVLuI1nBPL5Ots%2BKkGB9T3m6TGIXdyJufz%2F%2B&X-Amz-Signature=ee417609f6487b7d024681798c1d08b0ce96dec88e2c7b6be075d89bddecbbe4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665LRYFVWP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIAxGiUSGoWXKgFBRwWSc3ktiJ7zJ6%2FAj%2FJOSNwpBpfTUAiBWVI5oKv3LIAuMBVm3ia1H1hK4HI%2F2mcaJDGT6UQengSr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMngj1PRcjUelnvUY2KtwDdLb0wepLO9e92RAkE5WyMxwadHobP8bYf46AmzPIQQDY6rsc%2FvI2SaC%2BIh%2Fil32mRLSUrECoM6UiQv0sAgDZ2vV0cfmIEHt6FhpamVRYiTGYWE%2B3lCIZw5hkKS4I2uBYOrBTi33uWt1SCTPz%2FL40%2FLs0SbMI33HcfkqVAyyx6Hwf1fD8AEQVepTldMKlMuIHVMmHUjvcGSMVyXk6bmLqdzEo%2BxMygrMVct8SujgnEeqQuCidYmHzHMXUCiiMWKZmPTjA0UenZ0pSPm4XsxRsuD2S8tXLgHuKRYEaMMmGlIJjpI4rwg7qkMbjNTUdbsoZORLIZPbi%2FDCUJ9zjWjPEC6YClloBkpvwR%2B5QBtPRjjJ1BDZwffJtWyI9SFFgg%2BrKZFvsFVsul0519GQzXOG8c7Q7WtPooGj4rq8gr8UknCBAmMbK4B1P6tepoEYdhA05Oq4SQ131dgWePNRfufgfdueLyVm1ct%2FbBxaiFnAXIRqpSC36vGIrsr%2FAOvhUO1rrgMCU9IO%2Frjkxgs3Qb0f0r6C%2BhN5WpABMwu6hnzsNFccrgr6s%2FkESPmtRcLMREQjpfeqfARjTAEf7igelIPHE6zTuk7nuQsJ34MS294KaeUlaXYzSSNLzWsQ%2FQnIwnrKwzgY6pgFy56TYONz4Cws5o8NHFErNbJ0REofw7KmIYj2YuAB5R0E8yHjyzQyDJmCaD3gkh%2FTAjFmU5T0dDKdC3vI4eM6doLRQN%2Fsfj6ZmevO3UVFOuBHt08HdCEzb%2FFsnEEIPPNHYVAWltaLMskmDPRStYRagwnyJzHBQsHTBL0Tv4%2B0eOcujTMP%2BHzBF7S1qvvd4LcthMVUcvAyhcoi3mMz4oGw7f4sFVejR&X-Amz-Signature=0b15e504b4eff964c99f65444dacf6cde1e31f2a6622c2bf5b1dce4cda42c271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPX4MJKC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T203002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCDG5rEJxXRqg6Z25IOtYpkCCzwZz5E3pAiQl5Ji%2Fvq8gIhALquIn8Bg6FiCxpnXnxNcCaXI5MeUzvK2j6zmyA5M9daKv8DCEUQABoMNjM3NDIzMTgzODA1IgyH96RWbHiXKABysM4q3AMgaWayOkilExRTTv2jU5W7hGp0JJR25V0dv%2Bj4FyRfXj%2BGenAu2avnW4DMxCjdE0fi3O232fNk9qL4jypuBauXQ6Fvfzzc8zOgC23dOibjeinBt%2Fr2y7Fr2VDIoGfnhYtOmIr%2FrJqaVtXGRCQXStWBTf%2BtRXMDyOuLB6HP3DAr5lo4uq2M6TliA6Wbe9eySStaf4dBvirczwXecrkbPp1ljm5a44skJxQjaUsx5%2FVc873bw%2BwXrEvlp3%2FwTM3MTaW93w0A4yJvVbgpFkFS%2FynpXUcqJ%2B%2BQFKQ%2B9UZ24bWmqPQYTCAgcbN7qEu84wsLfc7CJou8hwyVv5OzhZo56I7057oHn5%2FQRCr6RPI%2Bxwy%2BsmUDYhFbaNgDmjwcIsGblluD7SOymwsLH8qmmV7TdGbO5%2FMnD4gxxOl%2BNdQvW%2Ba89OnC6TDx4uynnEOzDTNb%2FWaQm6X7cVh7qPQmyQI2dNrLG88UCSciwEo4OY3xo3leT73d7l6hfQ9ZXDny4Qvb9zcKXoWDDKlnpQB2UeJxnGZEBPra%2FYRNw3W0nQ10wmpDJygrzMVczk5UQZ%2BdCmvF3evsgLcKe4d7jLbymEBtzKuAjm3w%2FFdXOcBGNd0eQ1cLHdW5srFA6WqgxF3ZkjCWy7DOBjqkAS3ealG6s2Cct8qvRnQS5o9iIJ6KEQRHKuhm27uI%2BP579nsFlf2YOwNYpXpP6b2yTo%2BnMiYyMTb9xx91T7793OsVKbXet9RCwu%2F4G8k1zWqCwC8oOr%2FVx%2F5IAYf3Xi5GLCcPj23J8DJsJtNC5Gg5O4N1qlBMxr69Pln8EI6dMdKxg00S8fim%2BQmvHTyyRis5ZUWuvcLmeE0uPg%2Fl3WmgBAg7jAIz&X-Amz-Signature=829fba3dae9887edb9d19268b39f944f7345cbe7676d1fd52483e8c8efd62759&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPX4MJKC%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T203002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQCDG5rEJxXRqg6Z25IOtYpkCCzwZz5E3pAiQl5Ji%2Fvq8gIhALquIn8Bg6FiCxpnXnxNcCaXI5MeUzvK2j6zmyA5M9daKv8DCEUQABoMNjM3NDIzMTgzODA1IgyH96RWbHiXKABysM4q3AMgaWayOkilExRTTv2jU5W7hGp0JJR25V0dv%2Bj4FyRfXj%2BGenAu2avnW4DMxCjdE0fi3O232fNk9qL4jypuBauXQ6Fvfzzc8zOgC23dOibjeinBt%2Fr2y7Fr2VDIoGfnhYtOmIr%2FrJqaVtXGRCQXStWBTf%2BtRXMDyOuLB6HP3DAr5lo4uq2M6TliA6Wbe9eySStaf4dBvirczwXecrkbPp1ljm5a44skJxQjaUsx5%2FVc873bw%2BwXrEvlp3%2FwTM3MTaW93w0A4yJvVbgpFkFS%2FynpXUcqJ%2B%2BQFKQ%2B9UZ24bWmqPQYTCAgcbN7qEu84wsLfc7CJou8hwyVv5OzhZo56I7057oHn5%2FQRCr6RPI%2Bxwy%2BsmUDYhFbaNgDmjwcIsGblluD7SOymwsLH8qmmV7TdGbO5%2FMnD4gxxOl%2BNdQvW%2Ba89OnC6TDx4uynnEOzDTNb%2FWaQm6X7cVh7qPQmyQI2dNrLG88UCSciwEo4OY3xo3leT73d7l6hfQ9ZXDny4Qvb9zcKXoWDDKlnpQB2UeJxnGZEBPra%2FYRNw3W0nQ10wmpDJygrzMVczk5UQZ%2BdCmvF3evsgLcKe4d7jLbymEBtzKuAjm3w%2FFdXOcBGNd0eQ1cLHdW5srFA6WqgxF3ZkjCWy7DOBjqkAS3ealG6s2Cct8qvRnQS5o9iIJ6KEQRHKuhm27uI%2BP579nsFlf2YOwNYpXpP6b2yTo%2BnMiYyMTb9xx91T7793OsVKbXet9RCwu%2F4G8k1zWqCwC8oOr%2FVx%2F5IAYf3Xi5GLCcPj23J8DJsJtNC5Gg5O4N1qlBMxr69Pln8EI6dMdKxg00S8fim%2BQmvHTyyRis5ZUWuvcLmeE0uPg%2Fl3WmgBAg7jAIz&X-Amz-Signature=a72e8c52e179406f15d40865b234042422710cd7b589503dc05805b9e9a03f26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662J2WUMMO%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T202951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIEGMxjwC4A3ESfyVOOiGLgBwz3ltbS%2Ff0walDsvFv4E3AiEAzIiYYyoISw3hT6aI2au2epAk2RMn%2Bmoq3SZZ3ks%2Fp28q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDPxEE4Ur6Xt%2FOFzqzyrcA9if5hYGyTFut8UePPuclVVOkcJ5Z5HMFfcVB0URe6fVOlE9hlLAnMdlc3hjIc%2FQFwLlAI0xRViEfPcU4%2BctzD8BwsjehtfnLGOR0KvYYJo6phXhRDYN3dqrkNAq6uSIWT90PgYaDU2NqpqQbRiN4%2By1OMI%2BFRav1HNAGJN1EKm37Or7N6GEOxv%2BEPR%2BlmaDOalWMECIqQjkZNMMssX5or8py%2F8Ce76RdNFptql8GNuA46z9fLinBUnoWaJKc61gN%2BXiTqLBNJOo8v3c0lDphUBRSJaXx7ks%2B1Rj%2FhZQrD7%2FeFNbQxM5FABv8jnHFwrU0QwASmjs5DlrOJF6cu47W5Bh8S%2BAs50bLpV0RtUqFaJ4kA02PY6FaKva8Dmkya%2F4%2B0SFpqofaeuLMNbeWQxg%2BdvV0bXOshzZoAY5UpMEedooG%2FMtNQe3t6bV6E5VhwO2ncA%2F%2BGRtRiW%2BiYIBZx%2BBY7HwmEvoB7PJ8%2FvvMc%2BcsoMgBdrVRj60bTYvN%2FOWJ3p8H3g8Dm9zkD7DGI1TDhae6smI1%2FZmePiMTfWxb4s0r7W8uMnBirFofBN%2B7D2%2Fn%2BEFvMYwSHBPbEZPNTd70RdMlwPp1hl5A6NxwujG%2Bq4UJNpnwidA%2BIPx0BMb%2B17vMNqysM4GOqUBUZ%2FhUHyjppqzRrmbAbpbc%2Fze%2F77j0Nh0Ho0XhNmstROt%2BXWD5vCAn1sYwCBkchpgMGgUBwzqM2oy8YMDhuLF3BwCZDMguyfeVgNFaDa2RRzbEi9seada34gtQ45lj0WJwsP7E0lc%2Bp21tmXQAKqz7ln%2B3kEWV0CkseCRn8n3HBmElP12nwtHUcVKoR%2FRVvcEceIT8RP2KGk3tu7juux0O%2BW9VGuX&X-Amz-Signature=bace2b011a119422641028c837e29ce11549f82948e8e5309e123922bb02ba57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYN4NJ43%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T203004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDsvzX7%2Fhn2BfYiT%2BSqChf%2Bl6W1FEAdYLaR1YsE5JHkIwIhANIxrQ06jR59S7z4bporqbraSUo%2B38MedRTOsrUVuchDKv8DCEQQABoMNjM3NDIzMTgzODA1IgzboE%2BVFdvD9zxL0Fcq3AMMs0bDbWucFIzkwraEhYJMc%2FnWWSwjMFDZACDiuvj2bPU2UqIDUchDiORSI7ffKLNvaWG6IIWR%2B6WDS1T2MXQLdNgRax32tbO41EAOPvirkLRp3G0KIWai7P5bRJF9dN3NN44fb4JDFfTNifD6WoGm%2FL66Kp0ycMTLP4D2LKDsiZ61usRgmoPOVlFy%2B8b6kRY5db%2FL83zATvRUA3FlSfTEf90IJqIrulaNxQMmVn14IiQwJGx9FN7vKDDDSi9FjZgLJUJPjr7eRJtC7MYAPVv7%2BsxuefVu6aSb04WPX5cMY%2FfL%2Bk4QIw48CogxPUs1NmB9i3bz%2F7x4FhxrUN776mCqKsCe0faU18IhKmxUMBSVh0ehBaiKgkISpT108DLcaLiPK0cRbLgUDb2BbkuggCI24U%2Fb0%2FLVLgTfRU9v8CSq0Pmu%2Bjliq3xeLzR0C%2Bvr2JU8LuQuhwdYRVY4Rx4GcAkcLCyNhsgHDmBbpaU5NiL0vKh1QVD3GkCG77UBQ8knfO09nZwFsLzJlL3uJrxygJTeALhK8qIYjVyCHtpux62o3qvMLvL6zUA%2BIh7fkHK9PuhmpmrpjqPVZW44PNLbwZk7tLOE9NxbkyKNHx2H8z%2BceacggFkESjJB4EJ6EjC5srDOBjqkAZNsvnEiyaa64jPwt60e8sTS1jU5iJohJOr6dlNI5BzaMVeAdgtsObTpUolOOZqVVrvZkkWIqw16GTvtUissLQT0cA9B4lH2ribOzkEzANmtVTu%2BHdgDE7dZFVlm7U7NoiL%2F2WkyRqZgyaTVWcG10DZId9henxj8KZA7bLJlK1HrZjo6NHkird9kyBhnHVAWFWkp33j1XKOLvRMobEW9Z0dikJzv&X-Amz-Signature=d53c997f930de467dbe4534fdc7d4986f82e1392136d763ca7c30c91cc2f5ba1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYN4NJ43%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T203004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDsvzX7%2Fhn2BfYiT%2BSqChf%2Bl6W1FEAdYLaR1YsE5JHkIwIhANIxrQ06jR59S7z4bporqbraSUo%2B38MedRTOsrUVuchDKv8DCEQQABoMNjM3NDIzMTgzODA1IgzboE%2BVFdvD9zxL0Fcq3AMMs0bDbWucFIzkwraEhYJMc%2FnWWSwjMFDZACDiuvj2bPU2UqIDUchDiORSI7ffKLNvaWG6IIWR%2B6WDS1T2MXQLdNgRax32tbO41EAOPvirkLRp3G0KIWai7P5bRJF9dN3NN44fb4JDFfTNifD6WoGm%2FL66Kp0ycMTLP4D2LKDsiZ61usRgmoPOVlFy%2B8b6kRY5db%2FL83zATvRUA3FlSfTEf90IJqIrulaNxQMmVn14IiQwJGx9FN7vKDDDSi9FjZgLJUJPjr7eRJtC7MYAPVv7%2BsxuefVu6aSb04WPX5cMY%2FfL%2Bk4QIw48CogxPUs1NmB9i3bz%2F7x4FhxrUN776mCqKsCe0faU18IhKmxUMBSVh0ehBaiKgkISpT108DLcaLiPK0cRbLgUDb2BbkuggCI24U%2Fb0%2FLVLgTfRU9v8CSq0Pmu%2Bjliq3xeLzR0C%2Bvr2JU8LuQuhwdYRVY4Rx4GcAkcLCyNhsgHDmBbpaU5NiL0vKh1QVD3GkCG77UBQ8knfO09nZwFsLzJlL3uJrxygJTeALhK8qIYjVyCHtpux62o3qvMLvL6zUA%2BIh7fkHK9PuhmpmrpjqPVZW44PNLbwZk7tLOE9NxbkyKNHx2H8z%2BceacggFkESjJB4EJ6EjC5srDOBjqkAZNsvnEiyaa64jPwt60e8sTS1jU5iJohJOr6dlNI5BzaMVeAdgtsObTpUolOOZqVVrvZkkWIqw16GTvtUissLQT0cA9B4lH2ribOzkEzANmtVTu%2BHdgDE7dZFVlm7U7NoiL%2F2WkyRqZgyaTVWcG10DZId9henxj8KZA7bLJlK1HrZjo6NHkird9kyBhnHVAWFWkp33j1XKOLvRMobEW9Z0dikJzv&X-Amz-Signature=d53c997f930de467dbe4534fdc7d4986f82e1392136d763ca7c30c91cc2f5ba1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVC4X3LU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T203005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQDPonWuaCbXpExSqD5oN0DHUrVmN4IqihOAwT40sCcy1QIhAO7fz4jnp1T%2FbD5OFfu9Vn22MnghEGBLx0b0DdF6iBsrKv8DCEQQABoMNjM3NDIzMTgzODA1Igwr2HmL7k4quwAn47oq3AMaXz700zu0fE1H9js82WsNdq1hH0QAQeoniiH4%2FXEhONjmVrSKNEoFokHzAgQpRi1Sclfj1mt7tzrcmE2QY6x0ao70W8ouASFLpKwHi2xljT8kSI266dtowbXI1ELlsCPuqTN%2BCpDa7W2kV1Xu2xo3G1PcaY1EjQBdu2VkPnwo4KRoNwyK5tgkebNW8XOZKHfiMqrdVD9%2FHt6rk2BS8zuEy%2FL%2Fgv%2BORuGxgwLUNibe%2BIDo%2FWscdYjS0s6aYVGit%2FGpGjmzHExRZN%2F1TsCKLd%2FRaB0koq%2BLI8qlxu%2FBaRoxaUE0pLApXN0p64msys2e09b6v7r6JKL7xwyog7qIXpsMb9sgpZiX5ZwoTkmalRalMyh63JUSB%2BrcgAe8IXPN89equz3ktC%2Br97bmP8gHz0Dqg%2BOZ2l%2FQcp8zrBnKCu6tim2RPUQCix%2BEpDxCDQvHeDf32ASUrK94qrtSoA1Tj0bEGWpHWVvApIfT5hgh%2BAEDp8ypXMrvVF72wasVNVISCiFUAXjCXq82J5fLdxtqN5tEu6Y8CdOalcSWM9W389k%2BdydUS%2BNNcTw%2FLbGcYEjVa4erZN9y%2BWZdHTWWFxDT7kmjXIsMQ1PUzztqgsGWG%2BIpduJWhtHOsNyfEbLczTCYs7DOBjqkARIhEvhAvABQ%2Fg5mDW8ayWioh9K42SoTsXCUQh9fmWPTCreL0E6kM40LLrhuYPRp14WIJssoalDBJmeyyMJt%2FW9lPwgnmFxuLkwTSlVfi3uy3I3XDAM054t67FW64aPYgxnf9IBXzM8CpGqmTBpEqk1DOCazBXOEnBf8FKKSA6W3hQRR4Jve0ZdPN8RNv3AhYrFbs1EBlxDZT2qiT4121qgWn1Jv&X-Amz-Signature=7ce3094a8d062a33a6fff5a437b12a9b84fc563f7cf7c4ff617acac4935a92bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

