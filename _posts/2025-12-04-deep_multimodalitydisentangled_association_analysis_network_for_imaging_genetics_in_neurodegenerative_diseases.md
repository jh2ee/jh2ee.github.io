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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHA2BGX7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCB6YkenjvL%2B1OLRKt9YaeWe%2Fbch1T8dFEW%2FRbuX%2BiniQIhAPll6t9BxjIynXjtNfFRWGk2Dny0WdwWVw1%2FQ%2FlH1UO5Kv8DCGkQABoMNjM3NDIzMTgzODA1Igx9tpUyUCVOhgFYEOsq3AO3Rfjg%2BLeJxig1wSG7hrQjGM24GHYJeCRxbWJRaicr1bRjGmNHgSQbBVYbLszA5gu4U7%2B9Mn1ITXQe%2FOQTImjjTgNcmM1cNEkg%2ByhXGQc%2FKCYxJqq6FWxg7i2KeY8HWBgXIY8SLXbeY15u%2BVuJbvx6QHe1pVPY%2BpKvb42F7sNQT%2Fcc%2BV76vSTyzNo1NHi%2BiE5%2B6gTMhKJn7RD0UuiKnVtseEuod6KPBatcYuGbOooQZKrBlLVLLHVc3L%2BwXi%2Be2TStYHIY8kQ7QSSl9WrCLHRLimkn%2FmBMFU7I%2FWC7AiEUZtq9JFuj4IelXJtsJtRRRLH0tBeziCyLJZn86jE24uEPGnvKO7feInNfcVY8OlcYmF5G8CrmNetc8gzjAWbpeHthRno6VoKeVNmwE3Ys18ot7WyADJQjpBUyQsTho3MD%2FFLmPlqDm7lbxAE5yxnAFvQdCTAAxdvTxYnSYjVivksOBIfqAi7N22PRwurn%2FAde81elYEffQBqRcohRXzlEHcSHync4xlCgXEiu1uJuzX%2Fq9hRIhwy3PT8%2FotgB%2BVzXLCojnG87PSLGTxciWe3f%2FXBeJrmRUtgd9csNChaOM3Haf859EfepAb3YAm0UfSw7XWT%2F%2BYgelxNA0Fvy2zCTzbjOBjqkAXDkysPNV9zVmPxWiytiW9S7OPxjSq%2BtbZ2UB4Dyj13YHUFM81qYHOgJHrUrEVy8yJRZ8pCdHvKVnrDX%2FBM9%2BmcMctbotvhn8jPyDp8pGi9RBpOpJN6UDKeLcdYMIpHxhxqfdu0mc0BPze9hwPX7U55D9ZPLSH1EfP7iCE51lj87f0mOJBgKWIzNuFnZywVQwHtfL7MwBj1LFkLDkZu3d%2FovoXNb&X-Amz-Signature=7cef3ca1ed1d4a411adc4f432bf58ec62164d2d48a5a1156b88b3348472f544b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHA2BGX7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCB6YkenjvL%2B1OLRKt9YaeWe%2Fbch1T8dFEW%2FRbuX%2BiniQIhAPll6t9BxjIynXjtNfFRWGk2Dny0WdwWVw1%2FQ%2FlH1UO5Kv8DCGkQABoMNjM3NDIzMTgzODA1Igx9tpUyUCVOhgFYEOsq3AO3Rfjg%2BLeJxig1wSG7hrQjGM24GHYJeCRxbWJRaicr1bRjGmNHgSQbBVYbLszA5gu4U7%2B9Mn1ITXQe%2FOQTImjjTgNcmM1cNEkg%2ByhXGQc%2FKCYxJqq6FWxg7i2KeY8HWBgXIY8SLXbeY15u%2BVuJbvx6QHe1pVPY%2BpKvb42F7sNQT%2Fcc%2BV76vSTyzNo1NHi%2BiE5%2B6gTMhKJn7RD0UuiKnVtseEuod6KPBatcYuGbOooQZKrBlLVLLHVc3L%2BwXi%2Be2TStYHIY8kQ7QSSl9WrCLHRLimkn%2FmBMFU7I%2FWC7AiEUZtq9JFuj4IelXJtsJtRRRLH0tBeziCyLJZn86jE24uEPGnvKO7feInNfcVY8OlcYmF5G8CrmNetc8gzjAWbpeHthRno6VoKeVNmwE3Ys18ot7WyADJQjpBUyQsTho3MD%2FFLmPlqDm7lbxAE5yxnAFvQdCTAAxdvTxYnSYjVivksOBIfqAi7N22PRwurn%2FAde81elYEffQBqRcohRXzlEHcSHync4xlCgXEiu1uJuzX%2Fq9hRIhwy3PT8%2FotgB%2BVzXLCojnG87PSLGTxciWe3f%2FXBeJrmRUtgd9csNChaOM3Haf859EfepAb3YAm0UfSw7XWT%2F%2BYgelxNA0Fvy2zCTzbjOBjqkAXDkysPNV9zVmPxWiytiW9S7OPxjSq%2BtbZ2UB4Dyj13YHUFM81qYHOgJHrUrEVy8yJRZ8pCdHvKVnrDX%2FBM9%2BmcMctbotvhn8jPyDp8pGi9RBpOpJN6UDKeLcdYMIpHxhxqfdu0mc0BPze9hwPX7U55D9ZPLSH1EfP7iCE51lj87f0mOJBgKWIzNuFnZywVQwHtfL7MwBj1LFkLDkZu3d%2FovoXNb&X-Amz-Signature=7cef3ca1ed1d4a411adc4f432bf58ec62164d2d48a5a1156b88b3348472f544b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZESVU5JU%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIATU5yRaVRGCpASle%2FABOMjpFn2UwNkeW39biAvBg3UiAiBBvp6fd9ynUAORt76pQiIeRV2hky%2B8SSSBnw9SX992oSr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIM3c5C%2BO3usvYInQAeKtwDfv5BW0NEOqZWDMktDOuyWP1E2Epe4oMWKAxvXwunPBt7MzXTJ4o5dnaHO3bgpXbh%2BXl9gpyyYNF5uuTyWV14mI2hvc%2Fxb1myHmvefDkxKXzZbz%2B5jp7qMbrwZQRbAJT6jAhYsDUtju%2BClThwNHtDNWaihnA%2BCg%2BzZSg0t%2B1BQ0%2FFIMfPKkcxOzmjW5uv9OKdhBHx1uKgu%2FZN2sMe2g74SuWqI8OPFjvCgKDCpTeTqFLk5%2FHH%2B9zY%2B7QzcBoo%2FbYGoYbZSawTr2OJ0FbbN0LgSrTf5C8qkfA2N8EITqES7A2vq6QjTZi8zHbMIZUOgj8rZRnK%2BZHWWeGgXao%2FyFKoSSN3Wu4vIMNMxIWD0QeqYqwvUKB%2FNl%2FkufVgp8rvruFkaUJ3MiJVClKagXl3CrEeqv%2BDLuS4RoH174Bmjx7NB0Or1G%2BgIDm%2BxV%2F8y7PCfqT%2Bg4nLEcctm%2B0Vlu9TMgvjdrgrU%2FSSIK5QwWQunWJ5d8Bcyemv7LQu5QVAf71lGf5qlnFwnwShBWvaJsc96CqFIvhhH4h%2FWjR5Lpaewa5DLqrodHJRSQFqAWImRQ%2FxzOtcCwHjh0PLTLlauaXaRKRqs4NTVCdEj%2F5I3HSlq1Aar31G1w%2FWZtVWA7oLJycw18y4zgY6pgHgmaYy4dZ6X5ni9j%2BRHU5lBE8oOD4q6cU8tY%2BDLh3lAm%2FyY7gigHO37kCuXwPXcT8SNnDx0CrPP5Bv7Rm0GFElzgVJCpWZ5bchoS5HWRUOJSGJxo9kNd%2Bki6%2FACf4ndqhaciWx9xpp7AfHdxgas5OvZFFJmXeUUedNJHXZtc374tr8l%2F6qhyQ45RlKBFMh33ylV4dYtVlLvq%2B9TW8WZBtnJrB%2FB4j4&X-Amz-Signature=fdf68c834f3f479f6eee04e055c66d3cb17f064e5b344d44d88cd50ba5cce086&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAF3BRQN%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA1TB6f7k%2BdBKmV0tVlpAHS4cFgnA91KylkBrpOmstolAiEA5TDo8vnfASgvWLJf866SMc2sRVykxIbWmJvgpJSArmQq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDCwRnlLRa86%2FPviAaSrcAzG25PJC3RY6Wk7e90nLYKLE1v5CvW07%2BaDcFqFXj4yVOqMb9iimE01xaqUnDKJTuol9mC0TFBDWaSFIGCT1Sm6I5T6MJp3GQpLQTEgonyB7qZayoUurXve3ZW3bG5RRYWJ8N6%2B5sM2TOD1JN4PHw4snYVONeZ8tlXVk%2FJxdWpOnNLwf%2BqZk06JRZVd146JBacLK2g3YovfS4By0hRm%2FeJxnsqYoev9o4SYzwm28pn%2BbdxsSebF20q7dkW2skwzeZgb2uztagW5%2FaGvPpeC%2BX8Ock8aPiD5CO5W6Xv1YdJAbB3UWs0NHWllfVddNFxQgIWBYLYLmXFcZN1yGegG%2F%2BTytIpOJKokOLcbpKT4IbkW2JrDzPscq%2FU3DkZ%2B5rRG5USPE%2FtYH1memqj6xqXCGNhvkWqcZ7UPXmz0rgJPfTUnSaDTcV%2B%2Fy2BCuvP6eN7OD4OpV6YyU7%2FZqae8jpOXyCg0Zxguw0820D8l4vF8Zhv3R%2FN0qkHhR7zvltIK%2FCWKp7r0Q%2FcCSwIjt0NB1DcbCgVrfs%2B6HAA1uv9aUSoVpCC547fPoPApLinh5l6zE0Gir74Ja5rLAoSMzF8SDv8nCbjSWI7KrCv8wA%2FkU0FbuBdmFCy96Oz4chsGAGGWcMKHNuM4GOqUBpU%2BJBmZrys9uN5kRdV2l3n%2Bdbf%2Bu8V%2FA5MMARyinSGNd6mdeBmCPwbBOz6WSZ3X1zOxVw2NpAlNfS%2BsofpAWRBWKEdjAd76giGg%2BkbtfIZQZX9QsFES3nGlpvKCFZwNQ4hzD8d1nbIU02i%2Bo6bgmJHx5UE0m%2FXalisBVpeSDf65VN9xjqB0SsSUex2LvS7tZNllO9MFFG0dVyGYZC8kJc9oyNaW8&X-Amz-Signature=11bbc59cab6096be889d4f140971558f8627bafdb832b81e019726a1e2558a27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAF3BRQN%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA1TB6f7k%2BdBKmV0tVlpAHS4cFgnA91KylkBrpOmstolAiEA5TDo8vnfASgvWLJf866SMc2sRVykxIbWmJvgpJSArmQq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDCwRnlLRa86%2FPviAaSrcAzG25PJC3RY6Wk7e90nLYKLE1v5CvW07%2BaDcFqFXj4yVOqMb9iimE01xaqUnDKJTuol9mC0TFBDWaSFIGCT1Sm6I5T6MJp3GQpLQTEgonyB7qZayoUurXve3ZW3bG5RRYWJ8N6%2B5sM2TOD1JN4PHw4snYVONeZ8tlXVk%2FJxdWpOnNLwf%2BqZk06JRZVd146JBacLK2g3YovfS4By0hRm%2FeJxnsqYoev9o4SYzwm28pn%2BbdxsSebF20q7dkW2skwzeZgb2uztagW5%2FaGvPpeC%2BX8Ock8aPiD5CO5W6Xv1YdJAbB3UWs0NHWllfVddNFxQgIWBYLYLmXFcZN1yGegG%2F%2BTytIpOJKokOLcbpKT4IbkW2JrDzPscq%2FU3DkZ%2B5rRG5USPE%2FtYH1memqj6xqXCGNhvkWqcZ7UPXmz0rgJPfTUnSaDTcV%2B%2Fy2BCuvP6eN7OD4OpV6YyU7%2FZqae8jpOXyCg0Zxguw0820D8l4vF8Zhv3R%2FN0qkHhR7zvltIK%2FCWKp7r0Q%2FcCSwIjt0NB1DcbCgVrfs%2B6HAA1uv9aUSoVpCC547fPoPApLinh5l6zE0Gir74Ja5rLAoSMzF8SDv8nCbjSWI7KrCv8wA%2FkU0FbuBdmFCy96Oz4chsGAGGWcMKHNuM4GOqUBpU%2BJBmZrys9uN5kRdV2l3n%2Bdbf%2Bu8V%2FA5MMARyinSGNd6mdeBmCPwbBOz6WSZ3X1zOxVw2NpAlNfS%2BsofpAWRBWKEdjAd76giGg%2BkbtfIZQZX9QsFES3nGlpvKCFZwNQ4hzD8d1nbIU02i%2Bo6bgmJHx5UE0m%2FXalisBVpeSDf65VN9xjqB0SsSUex2LvS7tZNllO9MFFG0dVyGYZC8kJc9oyNaW8&X-Amz-Signature=6cc49e97521bb358cea192aee7af8a932963389003e92e3d7b083650ff93ace3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6WKARLE%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHbudLq16G6yWtMiIjuVWxh0OIFgvN7m1HXGecY42ui5AiEA1N2w1XY0OeqyZ7ciP6Bl%2FVGggYZuOYlHcmloWe0CfUUq%2FwMIahAAGgw2Mzc0MjMxODM4MDUiDJbtRGf48bVQIZCxuSrcA9KBy5AZR4ujAGfbUnpAdp9OFOBx7V1fJgzJWC7VPNQ6I5hRDOkEWrZVnS4gbnStXCb%2F4JcfcKY%2B0dAumwWPzcQwVkpKb2EnriqxyevvmdyM9pCSZMxJl7OrcphFcOOB8gKKi93lQSEDdUYEE7oKtUf7d4mOpcq1DM%2FpZs2tM35c%2FK4JwpLLsNIzFAqxxXjJ6xy3up4kxZNdp3PqB0FVjliMUsxY8DdT8qCL9b3zVEqQFAYySRFKE0OLaroNv1ohfrn6awXvtlBmiScYHNfbPt%2FIQqVKxpZJS8gvbtbl%2BW6D0RPJ7xfZ5F8Hfjl%2FxNEHsNc4J13dXod1j4uAaKgTs3bblidDelWjTunK556cIrOp2%2FM4nyRcnxSUlCbiq8ozPdm7N%2FtN%2FvcJKWOj1VdyGmh5GhadfFp%2FXsHJtQPFYTUVeZo%2BB18JrKDhaISBb4McZmY1dwdT2i0rpLMfkajUqi8bLrOvdlDLy%2FBySOiNNVs93t0cg0WqJwuvduBS%2BgZxETcf%2F6FUhnV8Xv%2F5g2V%2BGv2F5yGvdJjHFdmLKEqKhTilFiXXtQiM2c2ylZNAdmPxcH0p5fPNhBu4w0AkJoKbnoG%2BgmFKOARl%2FaiBxHK3wlDd%2F2UtZ%2FDeVoBS0l%2BlMMnPuM4GOqUBN%2F0mjrt5LovcdM3ADn6%2FYalWddhyrnkhaZCT%2FqfXKW%2Fx3pXb5oPeBSdt7Qj5EoXtaoaKj0YYPybXzqzjd%2FkpcG70kVEqz5Rv%2BIYgapRX1%2B9YOx6MSPc6%2BmzbUHPHTJ%2FyFQEVi1G9fKpBLb%2BB%2BAefS0iAWpK3k5xYhNdrikBReLCGhrq1gCdedBuwlXArJrSDvBUhX8mGFlbeWlB%2BFi8yxtVDf%2BIy&X-Amz-Signature=a75fe5aadbed0138d4d9d701b8a39ee7a4355298547c8405c7ce5fe5eda38ba9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665G52L7BR%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG7VSa%2Bd2UM2V4AZOUSBbcGFOpFjrDH5qLBEab0DPJ1ZAiBFuqnaFmmXRCc%2F46u4ahWTQrHPlSnny1G4lmA%2FssgxKSr%2FAwhqEAAaDDYzNzQyMzE4MzgwNSIMrZuSn7oG4TGGZkT8KtwDYBt08FLW%2BghHea%2BvlTi1yRhHCj1uP60DK5NshStynUpi4ApZn75DO70N4BglPa%2Fq5IMQw6Dgr5wJ5nQoYKFPjfvkmNar1lSH0w%2BTcg8LsmFQFwsTuXvdeO76LJMd36SCgIDRRlNZMDLnmTV4IHtSVrT0qNI%2BoHC5P1OZnXOyTxkxP%2B%2B4YgViEqwtkp8CjrIij0aVk96F2y%2BKJEKlUju9xGQZLOSecTY%2BRVcEgEJKqr3GmKZnjMNSknu7bduvP4AVTLgotRweavHLUOecdnOAvFDnb9LTfH1XR7rXg3Zs8Lhf7CEX0b5%2Berbp5Bys2Aa2ilxGCPCDEoaVX1ClWD6vLCYdecfz8JEZ90OYV%2BRJTX7DUSU4dlE3sh50GPdGrBRcpyJMmdRqilUqEwUvjtPuNe7d76VVSuLx%2BzmQCBdoArZTkOg96TL%2BOslK1Nbv2Q%2BkW3f7xlRnvt3J7v4HLBaFSQIev98LYhm5d5qd2tNyHQfVBg9Ax2iqbdth7jd%2BaKz%2B9fgMpNi%2BhGn1KoT4axoTTplwl1PnVHSDf0Z8PmtylPc6CeGW0biocXk%2Bu3i%2F5%2F4CKA7QDp9s7fn4SswbSJ%2BhPhKH93U5RoHlACajVNHL32j9z993SII9Wdju%2BZow3c%2B4zgY6pgFBQ6ru%2Btq8TlqoTT7yCj3Oa%2FTWV4wUit5XjY9QUDDlQ5y2RmDsgsShnZAeY%2BmMJlHn15vm5OwUMuWdY2eTlsNhsTZpXhXnWAnpq5mfPmudgPGaPQt%2BUIHAPVkXM%2Ftot7sRGL6G0AoeymPgisziyiBGv%2FLBo0nPu7Mk4AXoy8KK9OUUyPC6vPzXisoc52%2BjteX6x79Llo7FUhOiwYIRIiTXACz7UTEI&X-Amz-Signature=3acd5b3f4d0f8ed55319b257077b2d466321de8e45f2ec1713ec0f9424f62a51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644Y6GHEI%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID4WRFVhFTlZrEGOTp8YedRvXBGW1k0lpVLTegNud1RyAiBodLXQ6HQWql1cqNsypXlzZ4nM2NFe3IXJO8MZ%2BFdHMSr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMxivpcggOcdNGYTSmKtwDVB5bqdmh4iKYQWPVoz8UQaUiPFGJz1z6%2B%2FwltTFxap5BcBu80GXSICmNVJAh2UY6tGS4ejEVDAjjde4sOr3rqLcFgf1jHXlemxnoDn7YODSeSIyXPGTGmwTD7MFFxaQLDM7niviRZaBGNVoW6tNlMCjt5zDLOYWcgThdwgvZ5Hnq2jyEV0t05LrUYU%2BW3HcYVzALxrG32oKUc8WuKz1bEZdLSLKp%2FzF5KxZHlHZwI8adIPj2zwmPYJeOK%2BAWXwOIbw0TLTUzJ0%2F7FOp%2FnS9GazOWpxcjcqabZksH863KFk4J1fbWPSdOnpmwm67UVc5PDvNGBzS3FpjJEHIfgZoSDfATFSfYwW6xnrobROJQNbnEasz7Cp7cQk%2B%2B%2B%2F0PjTkHP4tRJCneVz2tAqUPv7D%2Bue4Gse9vj9dr0uyyAXQYm339kl0QlSyqbylg0gRosWq%2FEU5x1gUpeyw752qiCT0aS7sO8DZYiy4T7x0s8y07gOsE5vvxaSZgCf9NOJlbE7VdFTKVBZ35fuBxKgaYjT9F3JsAZZyjUS3l74u20KVu3DTh1VQ28npcQUjkf5AMZjYY2Fc5gjlnr76ga%2FJdOoGcJz1iN92Sjf4G14ONMmnHvJg1XLkzsNsjXOKnzqwwis24zgY6pgHCxemNNeTiVsBNlF70RL7Mg0UeRLhNTNbiTXcZDZk%2BWYrhzFRqcEWvx9sznenQf%2F2uLflRN8GuaCWXchoKYWk%2BjOPvQ1qj%2BGs%2Fg4TxV9uhhHqjr%2FqPPTX8TCKssOALeyDmIoo6QIqUY2fujHufe3r6XK6x2ILn3g%2BEr%2Ft3Um434w9SqZ5tLImPbfyqxHX6QPUU37Pp471kFUBmCPcNl%2BugLD0gYwo3&X-Amz-Signature=e9ae9fb649f6676cfcafed69c8f502fd496c15fb550b3ced8689e3889f026a8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMX72D6A%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGVUJRrEjW66wKjtBVqywnYlxrgI23o9CwRhHybxNjKNAiBN%2BiFF5nIuTLnui8Z5WZ2xk3ki%2B0oP4eESgPlceYWEJCr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMSI3ErVakkjR5D2UOKtwDkxb%2BFiA56P4ykJLsNhU84Rd36tSjbWMdHh7QWRVgW9N8rKuZ5Qc6gLl3J3Y3pqrhrF1dtvD339ic1lIixW%2Bo025ULGqg%2FLPczN38oHx3%2BxeLKtmLuRjs6OuYHdrHkN4LGml3JTU5twF%2BwFi2mGyoLjIrY5NO897vJosh%2FOdC4poS3SoyRfDMLtPt2X21S%2Fjbif9I%2FPqQus%2BfP5l9u%2FXnl8UFRHnK%2FGhj9ANR1lNdo2AGaklk2K%2BHqc4kMUeVfzviTkq9IsoMsmHir1EwACQdUYDJF57XDCI2VEg1IuehoiQF2EmE7PKC6gVZfpPjmIWVvN9%2BKBAlIRAC3nE7WCAWWhWlDgzNWegLQAPLxt8WBcyCm6Xnrv7iVnZsu%2FOlyiGrJLyArkSutfDHkYcFmJuXh3dtmR9yDo4fWcw8pv%2For6SijFKnKanYimIv6Erf3M88Mi8ALJ4ZAcFnPz4gs7onjfXl6kRPG1N6tsZH1dwvMgwnL6xIxqq4%2F6AUq%2BwM5jcO5Q%2FP2FLy9a44Oq2qS%2BT0ziJF6AJu3JB8TCP%2FTtZZTxh04H7Ks%2BdvBspszJT2zmp7mIDTJ3HOxBUBQFQLLgIdtTRap2OrXTYsQBjcz3s8mCZVktuYpjpklOnHvIIwocy4zgY6pgGtJ5va0VvKx0ndlJAzSvIUyLm5K%2Fhw66ZvT2WGh9qSqOz%2BxWUZosCX5Xg%2BNU50UjPt7gBXRi8KtRMAIWUbPTqSEJ7uIti6DFosd6yJ5lj%2F7ajZeEUTgy0r4JlvYM2ivVzVhWs6ZhHpvqNpg6BGWCgp5BHLKvqbraaOD50uETT9KFsa3pFBO4RYgA22s4lSaSUdHTM581UAF6HPQtPM2z4BskaGhgDE&X-Amz-Signature=83fc9d115837c37ab4a8defd4dd9124befcfdba4c9f9df1ce61f019f8496cc91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMX72D6A%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGVUJRrEjW66wKjtBVqywnYlxrgI23o9CwRhHybxNjKNAiBN%2BiFF5nIuTLnui8Z5WZ2xk3ki%2B0oP4eESgPlceYWEJCr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMSI3ErVakkjR5D2UOKtwDkxb%2BFiA56P4ykJLsNhU84Rd36tSjbWMdHh7QWRVgW9N8rKuZ5Qc6gLl3J3Y3pqrhrF1dtvD339ic1lIixW%2Bo025ULGqg%2FLPczN38oHx3%2BxeLKtmLuRjs6OuYHdrHkN4LGml3JTU5twF%2BwFi2mGyoLjIrY5NO897vJosh%2FOdC4poS3SoyRfDMLtPt2X21S%2Fjbif9I%2FPqQus%2BfP5l9u%2FXnl8UFRHnK%2FGhj9ANR1lNdo2AGaklk2K%2BHqc4kMUeVfzviTkq9IsoMsmHir1EwACQdUYDJF57XDCI2VEg1IuehoiQF2EmE7PKC6gVZfpPjmIWVvN9%2BKBAlIRAC3nE7WCAWWhWlDgzNWegLQAPLxt8WBcyCm6Xnrv7iVnZsu%2FOlyiGrJLyArkSutfDHkYcFmJuXh3dtmR9yDo4fWcw8pv%2For6SijFKnKanYimIv6Erf3M88Mi8ALJ4ZAcFnPz4gs7onjfXl6kRPG1N6tsZH1dwvMgwnL6xIxqq4%2F6AUq%2BwM5jcO5Q%2FP2FLy9a44Oq2qS%2BT0ziJF6AJu3JB8TCP%2FTtZZTxh04H7Ks%2BdvBspszJT2zmp7mIDTJ3HOxBUBQFQLLgIdtTRap2OrXTYsQBjcz3s8mCZVktuYpjpklOnHvIIwocy4zgY6pgGtJ5va0VvKx0ndlJAzSvIUyLm5K%2Fhw66ZvT2WGh9qSqOz%2BxWUZosCX5Xg%2BNU50UjPt7gBXRi8KtRMAIWUbPTqSEJ7uIti6DFosd6yJ5lj%2F7ajZeEUTgy0r4JlvYM2ivVzVhWs6ZhHpvqNpg6BGWCgp5BHLKvqbraaOD50uETT9KFsa3pFBO4RYgA22s4lSaSUdHTM581UAF6HPQtPM2z4BskaGhgDE&X-Amz-Signature=c94a9ea29175418ff39f8b628cb369dcfbd11365f5370365df625ae93997636e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCMQUP7H%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHWStfzW4EpYGoxjdoUqArnj0k2xIoNuh9OiKwrs1VasAiA7P2B4MTNhlUWcyCwi%2BB7mzsB%2FeVOYfY2u%2BX1Yl6OjgSr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMo4%2FN0C%2Fx5qmGHeQhKtwDL%2F1zKs%2Fxi%2FFp2FZKqn5m%2FHSBwEOx4LBoVJXBN6630P6Qh16SvWbNEE0xRwxNrPsetQ3jUpjeXCKYLgXMzH2e5yn8ZAZBffi7Agq6TYHiuu5y9GiiBMbyhEFVcIil%2FMGnry7Hf3Tn9wQdppeySV%2BuK72DwJ%2Flbc5vXyzJ9QZ%2BZAW5ON64CwgK4S07%2Bx3Ds4a9CZSySvCFwF1cPAHA4SUR1a5OHc6U2WSQHaxLwzssDpEIiIHLFzJOS3aWM72A%2B2MvtADKc6tgstQs79vJOCcsCzyRP0YxBB52G7b59ce8s4O7tW0yRulK%2Fh9LwJy8%2FJ%2BG2g6Ke50v4KxfbebzC%2BQoTXuejlRxiBANglwhjkqN%2Bm6wwzfS6%2BYax7frbnpQTdQ5Z%2Byh8q1zVqePe%2FU5dPgKbQCbkYN%2FQFpjZgbb5XF8oWTrokNM1X0g0x0KLlJL5nTqA%2FXWnGM6yVpA0vWXv1Yo6oca8yz%2BlMXyDPKHK%2FQlNU6yVLf3eOqAcKKlcHJeLpeMMGlQlo5gJFmp9F29Za%2FuY4Qu1TgvtpHICWKXXwDV7PZolJNZRaAq1nvLud0me%2BUN8n4CDh0tyIhNM0sT2Vrfiyepff7M%2FZ46tJTzufJfFSELPtKW9jFsIwE3sJMwts24zgY6pgHdhw2v7heBPvxcrhNHWIEh1Ak1jv4IHeSb9CVTEsOq8tTAiO0A%2BiEeDdybsZjcIzQ%2BzfF6i6bfbC6P7aw3Ze8NFv%2BgFMZ%2BmwRZzule0Uxnzv8yRX%2FKceldm5KxYrz3CYgDo9oOuBU2fyYhdReY3tppTg2nSrZ9l17evpfDyP9EQLmiG67oL73Wn2qUhFr7TWKVGoGvXJFzDYBz%2Be6Hz%2FvVM2%2FiKBu2&X-Amz-Signature=1c8aedf6a48d09e21d486cc5d64fd5755a4e84ab5be7afaadd685086100122eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVGZANPN%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDw6pjjJ96I9BNUE5LNL7vXrW%2BlFmQENGSnzOi0OmiWGgIgTYijqw1HrDBHtfc3bv9zZlDfN3rkIDvxTJyGxxK84E8q%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDHweZuOCrimvpgcv8SrcAwawB63cvPpvwbw8to1jX0Zj2yfYW7g5ry8GuMcLJc0yg9PAg7TuvmW9L2fKIsPJyquvSo502mta8qNEygKKj4xBkGk0iwwN7GPcIfqFq%2BsRRUYr2slX4zUUAs83%2FJMCYXaV0DxwDstJjQ7bpdr6VepICr0dqzQzPOjL8Wan3GjsaOrgPCtXcK%2FuVnHY8Z3hwmkdZ4IcbRoZnFvZ4aEQKQTJXzRgObwQxRtWEqSils8dPsZTJyL5tXopaKaPtTFtMeKPN5mUBtr7YVV%2BBO82VGdjDo9ibXlj5ZSS%2BWa0BFzFS5XmGW43Zl0Lx6K%2BwYtjJ1qAuJbSI%2BydPQVQjurRbgTpty66W6pIUaoFpKqyIU91y5qMcaTSgYmeW4vNjHJkjvqGqmHIAeIgPIl5Sn6s93rKiymg6a6sJcqxAbkuJmyTla%2FTW5I9jfABdQYqlYdTapfCKXgf%2BhSUdn5%2B7EkbjCA1YdfnakwmVwLapR2KwACUwGWo%2BC90m5ReEWQ0wG5VKSNrBWfvBOA%2Ft9rqMehfZJI9V7bsGWKJapQT76FRGwLAuqzonysnYnrbrCONV53mLWcKMhApATsJ1ldsdWukhauyi3bGq0%2B3E64E%2F8aa9g7MOnvBYmWOeS1CdwkBMLbNuM4GOqUBA%2BCULpDPCmEPOG2U88mdpHa9KjHJMCJOAUgsH7rTM70bv%2BNklceugUuoufc01qhVYIr62ggeegIcsYZqQNizlPc3mS0ivNpctkvTlQV2r2ioQrNBNvcS2Gh%2BAcuJREnenCHVm649M%2BSKGw9jcdRcAVbd0JPAnLlVyizJ7JOHmrXtaAxGG8JmGtHlQVgZqnqAkzzQJuzq6pUkbHQs3JKHTHH%2B2gzD&X-Amz-Signature=bcb0fc1d1f5f5253db4a3cbeec3ba287e37d0a4f46dca00be8583f2b5c629f1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVGZANPN%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDw6pjjJ96I9BNUE5LNL7vXrW%2BlFmQENGSnzOi0OmiWGgIgTYijqw1HrDBHtfc3bv9zZlDfN3rkIDvxTJyGxxK84E8q%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDHweZuOCrimvpgcv8SrcAwawB63cvPpvwbw8to1jX0Zj2yfYW7g5ry8GuMcLJc0yg9PAg7TuvmW9L2fKIsPJyquvSo502mta8qNEygKKj4xBkGk0iwwN7GPcIfqFq%2BsRRUYr2slX4zUUAs83%2FJMCYXaV0DxwDstJjQ7bpdr6VepICr0dqzQzPOjL8Wan3GjsaOrgPCtXcK%2FuVnHY8Z3hwmkdZ4IcbRoZnFvZ4aEQKQTJXzRgObwQxRtWEqSils8dPsZTJyL5tXopaKaPtTFtMeKPN5mUBtr7YVV%2BBO82VGdjDo9ibXlj5ZSS%2BWa0BFzFS5XmGW43Zl0Lx6K%2BwYtjJ1qAuJbSI%2BydPQVQjurRbgTpty66W6pIUaoFpKqyIU91y5qMcaTSgYmeW4vNjHJkjvqGqmHIAeIgPIl5Sn6s93rKiymg6a6sJcqxAbkuJmyTla%2FTW5I9jfABdQYqlYdTapfCKXgf%2BhSUdn5%2B7EkbjCA1YdfnakwmVwLapR2KwACUwGWo%2BC90m5ReEWQ0wG5VKSNrBWfvBOA%2Ft9rqMehfZJI9V7bsGWKJapQT76FRGwLAuqzonysnYnrbrCONV53mLWcKMhApATsJ1ldsdWukhauyi3bGq0%2B3E64E%2F8aa9g7MOnvBYmWOeS1CdwkBMLbNuM4GOqUBA%2BCULpDPCmEPOG2U88mdpHa9KjHJMCJOAUgsH7rTM70bv%2BNklceugUuoufc01qhVYIr62ggeegIcsYZqQNizlPc3mS0ivNpctkvTlQV2r2ioQrNBNvcS2Gh%2BAcuJREnenCHVm649M%2BSKGw9jcdRcAVbd0JPAnLlVyizJ7JOHmrXtaAxGG8JmGtHlQVgZqnqAkzzQJuzq6pUkbHQs3JKHTHH%2B2gzD&X-Amz-Signature=bcb0fc1d1f5f5253db4a3cbeec3ba287e37d0a4f46dca00be8583f2b5c629f1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466522DAG25%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T084150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC99SomwwDrLLZlZWYMjvr9K%2FYGdUfFxsz8Y4KH24A2UAiEA2giGFjzyjZ48%2F303VRNDGkMZFMAG4OWtvjfglcBx%2FI0q%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDKfn9mU65GqHnDmlgircA4mqckdyGOwMXE5O31rUG7jEmG%2Fu40%2FBEBXVrIFNZlz9OHGsdryeny%2B6vjAcdeaMJhe8A74KH4jWq8u9EEXMn%2F80RC3Qc9p5uCyvQClcm65VQM0Q87ZXQEzIJgG0VGB3nTWp7mWV4%2FE0bVRopxFUKDsVDz058So8uu9uv6%2FYi9yFyFVuTFHWkhwEddYLQUYsi7jR4HiCmWclsmeV7hBtbGPVXV5VecitBq97kEFGeUZuw6yNPkyHT0xe2TaYrhUsd3QPjArsoqvOl%2BMfMHETT4eXZdFOV%2F5Qog23KCVJyc1YIGZ0X4%2F7S4g1d19aiMU5g547OhkXpQNBJOqkKsrtCnlUpR9hTGumzxFy4RjIJ39ZI9a8%2FRB1gVusYxaVYQpOm9y9jDPDl7mLjK3g3%2ByxMWcEjZU8nv8MtlEJmd62EEMWD9Wy7ei2DEFg%2BfrCym%2FyaiinG%2Flxf1CWJ33VBi%2BbGkVRpQ1hKRTGA4ZCQbiPEsJwVzxlIsEgP2xtfHExE1Bqzukcf95HnvT3fOM3OF3CHbkK5BjJNoKRepd3uxZDBdg6Q4kXz5nEfwm5qc9XSVrcXfnYqW2YYiOaYRwVhWfQSpi0%2BVSHt7liJiJdhHrbmCpfULJDAEOk48tPzbyWMKrMuM4GOqUBmlcEwDBPiOLQ6EnWmbTRrHdVNjNypNujUjSKF0WqhEIBa5u%2BnMWHltOt2c7rMBYl0b9AWacx7FGIEpdcyOSQYYlr9%2BEspGDO%2Fl%2FeG%2BSV%2FzE%2FRZpYHHFlNHytUjsZ2RUsGPdd9nbehiiX8phK8LfsC5JzDm%2BgK5LDNUqfk3bwC1%2Bmdad0%2BxEl%2FI5QQVtqac6yTWAjwWzqO8Mk945ExU0iywGUPsax&X-Amz-Signature=4457bd1d85cfa1ea5091ef7cbf24d47254b0086b8b873115882095d309f3f2f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

