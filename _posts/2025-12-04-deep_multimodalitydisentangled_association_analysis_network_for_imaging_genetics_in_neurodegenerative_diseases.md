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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLHYYOVK%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQC6VPMM6O4YFNbVytqM9eUPxO6K%2F%2Bt9O1IJ8nwMd8oWxQIgFK8%2Fr9E6zVlIs9y1d8B0pUCppmsePuZ36X03KsCyKd0q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDNlRljYxKlr%2FGsyp%2ByrcA5j%2FnnPMBSffHImauZ1jXOlKsjFdTCin7kQ9o4UiHfOOH1FZY%2F4jPx1O6avDsyXOABDxC0%2Fzh061Tyqi0sbddE33j%2F9l3ALGyBYio2LqFyoaLnxDdaMwX1c0SSSF0WGzutgFzlwxYA8Jm8V1dFoOFKu40mc%2BAW%2Brf%2F%2B%2BBwFYL2VIy9ObD3nwUwXUEjFTHVcStxsxyQYblirADYaBps0A2Q%2Baw9HJg1RXhMQKPIRSQ9zXd4UNrGienMgTwNjQY0GptFUzZTuLG8LBoRrzKsdiofQR4oPmO3ij18tjeBcz%2BLyefaFph9TK6zTsbKZADgDotthPGDr0qnZzIsQ5a8D4ftXgvx9REEEXkeTlPhnFSv2%2FOkSjQ%2BQcMwHsdFa8bpCm%2B%2FbDKZSFDyV0eYtdBBG%2Fa6uXwaqrsIZCGTqH7VrfrwJKcu5Z739T%2FApe%2B0ZgwjUG%2Ba008ppP%2FSgRLnaEG7%2FouL0GJww%2BVJ7PWB5QiZj5xT0XuMsyD55tJCE9zyJJNIC7CrYSZVzJlKc0PjbOvcE13%2FAxGkH4BIJs%2FEwT5G%2Bn%2B0b8Pzq%2B4Vq9GQNxfuaWPat7kbZ9hab3v3CMS2QYSbwj6swfivInl3jlwhdKvjYZxKY46Lpk%2F16YomBH2syAMOHC4MoGOqUBax4m3SAVGgEd7zAV5d4Ix7ZSjqwK2hyOzfYKlS%2FOS7BEGg1seHgDK4sckmoVriuvVlMjy0hLqhR1UNbF4wG5%2BVN6Huo0nnWTaXuLEhY4HbauE9J019IHSlhrCARIWe6zmr901kqYf%2BEkKEj%2FznON%2Fxl7psnse%2BYpLQlRLnQE%2FQu4kwzIFpfoEppE%2Bma%2Fet0us42qNlMC7YwzQjO5Tj9VjWfjwc8f&X-Amz-Signature=c479650d0f1fd50e051b79756dd45bb17ead7a62f63e7e6018e484786f893bf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLHYYOVK%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQC6VPMM6O4YFNbVytqM9eUPxO6K%2F%2Bt9O1IJ8nwMd8oWxQIgFK8%2Fr9E6zVlIs9y1d8B0pUCppmsePuZ36X03KsCyKd0q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDNlRljYxKlr%2FGsyp%2ByrcA5j%2FnnPMBSffHImauZ1jXOlKsjFdTCin7kQ9o4UiHfOOH1FZY%2F4jPx1O6avDsyXOABDxC0%2Fzh061Tyqi0sbddE33j%2F9l3ALGyBYio2LqFyoaLnxDdaMwX1c0SSSF0WGzutgFzlwxYA8Jm8V1dFoOFKu40mc%2BAW%2Brf%2F%2B%2BBwFYL2VIy9ObD3nwUwXUEjFTHVcStxsxyQYblirADYaBps0A2Q%2Baw9HJg1RXhMQKPIRSQ9zXd4UNrGienMgTwNjQY0GptFUzZTuLG8LBoRrzKsdiofQR4oPmO3ij18tjeBcz%2BLyefaFph9TK6zTsbKZADgDotthPGDr0qnZzIsQ5a8D4ftXgvx9REEEXkeTlPhnFSv2%2FOkSjQ%2BQcMwHsdFa8bpCm%2B%2FbDKZSFDyV0eYtdBBG%2Fa6uXwaqrsIZCGTqH7VrfrwJKcu5Z739T%2FApe%2B0ZgwjUG%2Ba008ppP%2FSgRLnaEG7%2FouL0GJww%2BVJ7PWB5QiZj5xT0XuMsyD55tJCE9zyJJNIC7CrYSZVzJlKc0PjbOvcE13%2FAxGkH4BIJs%2FEwT5G%2Bn%2B0b8Pzq%2B4Vq9GQNxfuaWPat7kbZ9hab3v3CMS2QYSbwj6swfivInl3jlwhdKvjYZxKY46Lpk%2F16YomBH2syAMOHC4MoGOqUBax4m3SAVGgEd7zAV5d4Ix7ZSjqwK2hyOzfYKlS%2FOS7BEGg1seHgDK4sckmoVriuvVlMjy0hLqhR1UNbF4wG5%2BVN6Huo0nnWTaXuLEhY4HbauE9J019IHSlhrCARIWe6zmr901kqYf%2BEkKEj%2FznON%2Fxl7psnse%2BYpLQlRLnQE%2FQu4kwzIFpfoEppE%2Bma%2Fet0us42qNlMC7YwzQjO5Tj9VjWfjwc8f&X-Amz-Signature=c479650d0f1fd50e051b79756dd45bb17ead7a62f63e7e6018e484786f893bf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUYAOMHA%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIA2mGaWR30p3tueum44SU7qN%2BUbz4MTY7Qxkg9c8gsg9AiEA72vL3GFYReO8Lfx%2Fnf%2Fgdp1mlNkC0160OIe%2B4UM%2FiSwq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDChADArYjgLKLy%2FCRircAzghGYMVq5lwr2lH09H2LwznIVzOsYIocfPKN6iLgGZOE7Au97zrwO%2FTQKE9Yda0IHsg9BcBOZmd%2BJtuw%2Fn1haqERS%2BTH1oC437V0W6PpADtUIZfLaWlwNVBHH1Mu%2BIlqe2JkZezzCIRy1yjH9p0v%2B4%2FQWrQKh2afg94mvSbkcqyjAWifzYsRxUOPnwN6bgShwhHXJeGxLQ0wKOQX8RHHFTGXoYFN35xkcSeqGPHVnSv19yf1dVktLvAArW4DGM81vLK%2FTBl9sH33Az4W9qWe6pM%2FWhTRJrIIBwU%2Bktt79lQhmv8KV6I5HgWU8jzizm4vVDAYdZwMnLR9FNwhIOHxjjVbu8n3g53QaP%2FWAtjGmxvJGDgs6FMd8yEeQFgNjmfwPcsOjkCqP1Ti3GSzDBzbmtdYFSTtuUyWhGGB8VzqoRl5ErQo01GuKuDnlHOAfkh8KgraHeoWXJa5PH4%2BJlOwIogt5bVD5lqrJYQVnaMkc5mmBmvvzRedC%2B0ijU89FV9YJMHANgckisvJ1RE4M7CMhlGwPYcg1aFQcv%2BRo9IYuvtozTS8IqpO9vG4%2FWG53FbhtD%2FbP1ZTaGAjNBy%2FF3NSExsToJ88LpxP110f23%2BRqF1dv2ZVJzoGmSz9dWDMMm%2F4MoGOqUBVRKJGrFQ3Du72HYen3LI41uvYmljg6pJgKZDtLj5FY34ClCQuc0hba1ZWYI820tf18T1W1riwAiNv6qLUq3JuHa2tz5EFqH9mxNdEmDPWtNz6jqToAvBTLiOXb9i%2BHXvme6e0gLHAf2TjESRhnF%2FvtXTA3V%2BRbVK833gqfNvvEjBWVu7%2BbnrnSj%2FNsLTkl5L2163XPa42nIfd7xNUlF%2B7vwgRihg&X-Amz-Signature=0bdefe58289a5e96034f618c3edee9104dc88ddd5f20e17502e370574b563f02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VCEZO5O%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDXlU21l%2BLHN0%2B2yocKp6h4SeAG3YGeMVjy7y%2BVSoYUDQIgLVn5iaf2iyT7uvHRwEj3fGG3gIQhwjnz58SGMGvjqDwq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDFb1uEUnFu9SP5ZiCSrcA2KmIFIsVHLQZjoRtY4TkTMyPhEOJFzoAKb%2B32Lc%2BVWvlDVSOxL30MzKPDGR3YTPt20YlXDZngDdiPAfxkM5Mvyqihdovu69QHzA39rZ4CufA6zak15nDKCSqpHu1SYLnNuIipSOtiKMQD1p%2F1%2F5znSXpVvglJIpQU29eOcxwBpYel2j%2BxqHRx8Rb1owtcwLtp3SR71QSUlmClf5mrc%2F5MnjFY2mSqt00DJ%2BnWq%2BlGpKBGlkhM8SuaeYrNTKcV4kMfobUFGtTK6ZZFSehnjit4fn8pzgeWzhWnV9AwKdyBvFZf4kfC9EZmef9ClFvfwEMQpmVxxTrXfFujTLCfUM8ytMgr%2BEbU0hFcSvoT9V%2Fp6kayMTOvY0sq0JsoU3%2FzHxmrMJBMbZUPMrb98vvBAuwi4c2I1q0AYN0lUX4v5Y6Szcq1L1AG95xgPb%2F1KIoXSbMlT6sShAP06TcQa%2BzTBGvvuR8u5sqtD09R1N7hIK3fn89kcvS2EuytqfyuLM%2FrTBkkWv389b7W6hZxzptwkP%2Fc0stUvGwdoolrx0nMKVyhfJFggA8DTb7cESHNVnAbRh27wfrzgCist5WWUqsiwSbcOKfiICPLCE5UtwmcPBsqIFcqIxij7IvvlHy2L5MLC%2B4MoGOqUBg6gcw3w1noPiQFYgNiExqsqRI4KgD0Uw%2BO1zz5h6VcZMptnDg2ZKZ9HooYsT6cjzhoogG2np2ksZkvZw0C8WY%2BAixsD8uR9d3G7lIqYJ%2B%2BX7%2B0qcr1vtgn%2FxvonYhDwd3Ljx%2BUbfD8OTDd%2BR76xHS9qVyFg8rmlzioS88be0YrOftPltqiVCPU4lIbEn8UdDbS973nyx2j93VMVRlsrNJEEOPYRY&X-Amz-Signature=a4200a947ca1144eb75bc0a7ac46a72a46e53b333ca379a8c8396f5bc55be1e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VCEZO5O%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDXlU21l%2BLHN0%2B2yocKp6h4SeAG3YGeMVjy7y%2BVSoYUDQIgLVn5iaf2iyT7uvHRwEj3fGG3gIQhwjnz58SGMGvjqDwq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDFb1uEUnFu9SP5ZiCSrcA2KmIFIsVHLQZjoRtY4TkTMyPhEOJFzoAKb%2B32Lc%2BVWvlDVSOxL30MzKPDGR3YTPt20YlXDZngDdiPAfxkM5Mvyqihdovu69QHzA39rZ4CufA6zak15nDKCSqpHu1SYLnNuIipSOtiKMQD1p%2F1%2F5znSXpVvglJIpQU29eOcxwBpYel2j%2BxqHRx8Rb1owtcwLtp3SR71QSUlmClf5mrc%2F5MnjFY2mSqt00DJ%2BnWq%2BlGpKBGlkhM8SuaeYrNTKcV4kMfobUFGtTK6ZZFSehnjit4fn8pzgeWzhWnV9AwKdyBvFZf4kfC9EZmef9ClFvfwEMQpmVxxTrXfFujTLCfUM8ytMgr%2BEbU0hFcSvoT9V%2Fp6kayMTOvY0sq0JsoU3%2FzHxmrMJBMbZUPMrb98vvBAuwi4c2I1q0AYN0lUX4v5Y6Szcq1L1AG95xgPb%2F1KIoXSbMlT6sShAP06TcQa%2BzTBGvvuR8u5sqtD09R1N7hIK3fn89kcvS2EuytqfyuLM%2FrTBkkWv389b7W6hZxzptwkP%2Fc0stUvGwdoolrx0nMKVyhfJFggA8DTb7cESHNVnAbRh27wfrzgCist5WWUqsiwSbcOKfiICPLCE5UtwmcPBsqIFcqIxij7IvvlHy2L5MLC%2B4MoGOqUBg6gcw3w1noPiQFYgNiExqsqRI4KgD0Uw%2BO1zz5h6VcZMptnDg2ZKZ9HooYsT6cjzhoogG2np2ksZkvZw0C8WY%2BAixsD8uR9d3G7lIqYJ%2B%2BX7%2B0qcr1vtgn%2FxvonYhDwd3Ljx%2BUbfD8OTDd%2BR76xHS9qVyFg8rmlzioS88be0YrOftPltqiVCPU4lIbEn8UdDbS973nyx2j93VMVRlsrNJEEOPYRY&X-Amz-Signature=e49d2e172f9aa74477677dd43f37007f88435c5ca24bf523b375247a3e35c0b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YG5IDJA%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCCZqaZE4doswh1oAyYr6VpI2uAZx%2F4pdsJOCXzSMz7eAIhAKziGIsbX7zTmRgx3i2rOsV2NJpbFBt3npGFSQUEwMa7Kv8DCAUQABoMNjM3NDIzMTgzODA1Igz31ChtTrmLP16idrwq3AMzyeKrsWv9GcQAvCDCGUIZyWD%2F7fRJNc4LHc7VMyEGq0N5P4wenq9jG%2B4a4AHo0xkHp7pCj0x3u3J8bEHl2Ja69FZk6gdEa0TTA2%2FbmN1IqlhdIfaLlF5t04z12RqUKXn%2FYDRbxLkHpeXGYPqZOErhyHCs5TFuVYi%2BnMKl%2FL3pngKZGd1L9LbkiVMzJdiG8xNrZum1OMnUoldMJfcqcoSanvYaxaMEbQdEXxnlRUv7gKfqwX2yqIqfp7%2BzX1JHX9gLFYT%2B1V28RD7B0%2Fq%2BNR22iYaAfI1fym1bmO3FJaUGjub9WYyJ3o9OeheHGoomVza21vTGvYPczp2VSOErTflfc%2F7LbiqNWK2XmY8NDGQ7xkSw0nlSefs5kqTvpTGDxcS6TNzvj3N5xm5I6PXhvomGhUbhlvrMqmqSmhWCqcDdF8cx5PB6LJECL1HZ%2BjYL1HPBp3iSkVM4nwThkdLy4QlGxiJogy85HMWcq1ngPbcmZPRmn8umfX1mjUQVP08hicy2cCZnb39WM5Zaki%2FghREYkYAE1CGdTJqILghJCA7feG7C%2B6U%2BDKhiIatQOC1RvCtrWNUAjuI2y7y1Y4ln52mGj9K81EDDzdJNG3O7dhBjplb6%2FviExBlsk%2B2NCjC9wuDKBjqkAeCPXUE9b6AQZr46jnajASGyt7ne3oS0dlo4Xd9aRLmE4eGU76U%2FYDfvMMrnu4L6Ro%2FcW7UmD6onz0JbvmaeYYofcpOrtFR1knWsp%2BFIOHktmWyhjpXItJKrSjOYaWW8Tw556Gft65XqTsUezD5sFNDGAHa9zTSLd%2BfJ0I7nAaebABJ65HduGXi6wni88Bi4Exm8Ndw4jsnFFhlR5LrnXDhCODyg&X-Amz-Signature=caf966e29715440d6004e463155c75ff3127d0ff30d6fa2d6c8f553c2783f114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SV5TEBZ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDwQEDnBjDw9BPb1kZj9EG6aSCtwOI%2FtCnawBjs9h5nOwIgXfSUOeGXyRe7vlDmlJ8PMSEnFrUxwahf9ED%2FmcyyAV4q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDLdvnaRIeEco2RaJ5yrcAx5MNbLG1f%2F4u1zkIb4%2BJqQi%2F0MjGhIXrWAb5NPCwpXPWGylSmjdVUMUllLNHXOjLAfqhFWvVkEcyMLRq5QIv3h5jZ7MMLLv2U7BB3yiZy9%2Bw9GqFinx5hmVrfBgKBLeTMFLFVAUMWRNogLIVjmUpDd0sRyQMT5XeND%2FcoB%2FlqH%2BXYuwtQ9rwYvkAZ3hCh2BXtbDcfU9l8lmcm6DP6GvxH8Gizq5%2B24WDVdhAcE3T%2FLHqLGsLFtIsUX3btq9OYJv%2BG6bt9oTkqOkjrV3N7r7agXfoGwXE%2FXLRejq8EYUhoMXX7gH9DZ9qcWbg8%2Bz3o5UeVcIo1TtKDvxMxUjntNP%2BHmeMSPnH%2FBkA4mbOYDJ54enhP%2F0HaSuI6g2fKIh55KTiPAmIOWkqCJ41uyo%2F74BmxPRrMdM87lvJlV8%2Fa1VFGFTJFvVzr%2BbY%2FheEPmnCPzly8TRP0QuOAZgLh7JDh0sAnH4YVmHv1x2zcwxunfes29u9rqPVSVwZXM1gCTKptOYUbRC0vRS3YNg9UlKQU%2BKyyq4NeQH4W9vwt8jTdem1m4eRDqliS6YcK1jYTsn13jthLYyI39BC%2BV5RIvN2Kf571bK6GB16Zhv9b64QjBNrQXPJhMIJHr099V6kiKdMIe44MoGOqUBnrqL%2F%2FtJsS2RFjs2PQRf%2FiiyvDowduSDsPp3kwTT%2BYYtYGjA2MHm6JfC7MHXJVnpP0bVh3RC51aH6cp9ugFvTN%2FSr9j7FrD1AlveA08dwbICV5YCh7hrwD8NJL7MfiP6uUSFKaNQ0TubkFV10bM%2FjScl18HxEM5Pz%2Fg8qYjQWKt5%2BB8wAQU2%2BM2xDNSbgvCgt7xYRTJVgIujFdJD7S3HexoiyHE8&X-Amz-Signature=5430b21eb4e98e84dc6459d94ee8d5c00c25e05ba2f47834cf0036d72e71605b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665P3SZZE3%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCJYgaqILdR0dwkKyM%2FSNiyiq%2Bx0aArguZAOynjMSQgzwIgE88rC2UcOP54hnhCrIDgtB5mKtKb2EyB5E9vyTAAMjUq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDHaqkNncW8pD4Yu8XCrcA%2BzA5Q9pHO2exoPFJDr3jYVSfqprk%2BIeiZPc2ZV8pZGCU%2FLGhUF%2FtkpQIaGQnGPlMXiYq65dilQxrFdD%2Bj8qgFXdxUUS7gJH%2BkCsOIVLiByaK%2BTjl9clLlD7Tf%2BBJibYMThr%2BwyKzfmVReMzFXld2JUGKWirDnyHaNZZf3oPL7kOdYEaTKT6H39JAh7sfhk7pic9NAAuchx06IhDrh4lYYNsTKco2jICx6dDi0V4QFNZQJFHys9GLZd8e0%2BnNYMBjM4Ovp%2Bt7VQ95dObXelyHuQ7fX%2B9CUvKQYUyT%2FXIYUX%2FPFjuftol%2BDJpIvkOe6FanY48JAG0SVVe4s7zP%2F9SLVn8CMiZAV9Hn8cGVHb1g4w2CQUZQ43OCyHfBrW960hNucPfpn3ozRsedjWbsyLUTL8BKsRJ0sg6UJ4%2FNI3VJ6H6VPOGxqAMIJwI8shItITbE%2F3713EiDBf2D7IanFGSwPVBOL2bNT1%2FCepzIrhrm8bQgLr7V98YgkK%2BBBhN1RdUbJ6x8ZDerMF3k1%2Fp%2BDmi5mDmrUlfBVOKGxqVjOsZbDzEuF4zpXaRHg6DfHSwLwjrjvojiqREwCxF3YtGY5c5mFRVTaZkPF8Eh2fmjqCQj36X9pczJO%2Fk9JUwXqyGMLK94MoGOqUB0Af4kh9%2FKoPIVzXAD7PyWZswbL4627FMnSKiKeRBaXPCnKYVTiXDTlYi%2Fotu%2BGKanC5X9U7h%2FDq4ZE4SakIf%2BVptWaHYOTRy9h%2Fq%2Fkp5CeMn2WiwZqQTJsNbaYDVsFOiWh3siexernbPaI%2FIUnVBEnxQew0%2BI7KELxIJWBiwjot%2FeeozErCcPytzAnhz%2B4TUReEzZQVG8x5ysa%2BVZobUFqp4%2Fyoy&X-Amz-Signature=be8ef58e5fdee1566153222a57d3f9e4561bb1fa5a2c953bf29d6912a8e5de99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMK3TAQ7%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCICPGxcRvIW6bKsTrmtGLB0uvtuRYn%2FOkh07PN9r5mg1YAiA4Jy7g4I%2FPA%2FLmaEcHkub0cQPUsc%2F0wm0SiVVEd3l%2BDir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMo5AX1OHUAbHNeVxAKtwD1%2BCTDjZaCGvdkVHlxIda%2BSa5WJXqOtQdP%2FfHzgGzGbvC0AZtTJwIXhIXv7afMqdv6pj4%2FoONX5YcK6RQsLm9cZMIZ2R%2BrPYEDlip9HScoUTD0yVDEqmMzVfvuWfmPPEpS%2FKuxJvg63CqLlriacVyAesjnLDq6SjfzvwLfP2CFz%2F0O9UHxqxijqR9A%2F9mjVDRSGth8c3O4INFPvSLxknXD9GtaeEPViwkGR3e%2Bd9TsV4PkRAhUAnpYz9L8Eq32e42aENUbRVEn03AWlNvVjPY3uVABpR2GPiXslAc7pzu5a%2FA7VoPDxZYBmo8N1rTXQcmNuMqxDdsz9ArF3oE4xjsP7MMQTJRnnROpC6DqPTL2fiKj8QXVImT3wloa6ym3TSW7aKz%2FNy8uYYInv%2BcyxXuHXGcAErQzu%2Bi6J6lhk%2F9vX1JLTUopRTtc8wEDgIFy8jQVjC9oyK3fGlPssf6yHTPsOV7U9Xilx8orztl2VQ%2BSUjgWrjyi6Srgxm68MI2JuWWhUGphLrydsK59HPmKU0rbjO7VQWUkYjSBvuQrH8F11eEIRt2tpDO0urpUUbE4t%2Fo92gWIEpgazHEkZ7e49xEnN0greWBxZ1Tkmk8vD%2B%2FFOUL9%2FDcm6L3XggktPcw27%2FgygY6pgFod29UTxmlXe5kuYrd5rPbR%2BlMj95xs9PNiWAJ0fWt1f1YcBunTtmHfAuNkcJlxmZ8zqUT6Zb6t%2BIc0fUiHOwoqHxd%2F9l%2FDXnHRqzlYrt6Jds0PL2uJxKZM%2BjuQqw5ijNbggvnKZRY2kD6QP5arFBzba%2ByAxk2sNGn6oBawzYQ1lS0HTiHVZwiK1llyr5Wl8NG4FrSldKdx0br60m1i9QLPFd5LSB8&X-Amz-Signature=4edab5bf2237132602d02a1fc9b6a2d6821a42a217bd6798859e63c7a11710b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMK3TAQ7%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCICPGxcRvIW6bKsTrmtGLB0uvtuRYn%2FOkh07PN9r5mg1YAiA4Jy7g4I%2FPA%2FLmaEcHkub0cQPUsc%2F0wm0SiVVEd3l%2BDir%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMo5AX1OHUAbHNeVxAKtwD1%2BCTDjZaCGvdkVHlxIda%2BSa5WJXqOtQdP%2FfHzgGzGbvC0AZtTJwIXhIXv7afMqdv6pj4%2FoONX5YcK6RQsLm9cZMIZ2R%2BrPYEDlip9HScoUTD0yVDEqmMzVfvuWfmPPEpS%2FKuxJvg63CqLlriacVyAesjnLDq6SjfzvwLfP2CFz%2F0O9UHxqxijqR9A%2F9mjVDRSGth8c3O4INFPvSLxknXD9GtaeEPViwkGR3e%2Bd9TsV4PkRAhUAnpYz9L8Eq32e42aENUbRVEn03AWlNvVjPY3uVABpR2GPiXslAc7pzu5a%2FA7VoPDxZYBmo8N1rTXQcmNuMqxDdsz9ArF3oE4xjsP7MMQTJRnnROpC6DqPTL2fiKj8QXVImT3wloa6ym3TSW7aKz%2FNy8uYYInv%2BcyxXuHXGcAErQzu%2Bi6J6lhk%2F9vX1JLTUopRTtc8wEDgIFy8jQVjC9oyK3fGlPssf6yHTPsOV7U9Xilx8orztl2VQ%2BSUjgWrjyi6Srgxm68MI2JuWWhUGphLrydsK59HPmKU0rbjO7VQWUkYjSBvuQrH8F11eEIRt2tpDO0urpUUbE4t%2Fo92gWIEpgazHEkZ7e49xEnN0greWBxZ1Tkmk8vD%2B%2FFOUL9%2FDcm6L3XggktPcw27%2FgygY6pgFod29UTxmlXe5kuYrd5rPbR%2BlMj95xs9PNiWAJ0fWt1f1YcBunTtmHfAuNkcJlxmZ8zqUT6Zb6t%2BIc0fUiHOwoqHxd%2F9l%2FDXnHRqzlYrt6Jds0PL2uJxKZM%2BjuQqw5ijNbggvnKZRY2kD6QP5arFBzba%2ByAxk2sNGn6oBawzYQ1lS0HTiHVZwiK1llyr5Wl8NG4FrSldKdx0br60m1i9QLPFd5LSB8&X-Amz-Signature=0eccb9856daf2302da6ae3b872012905dde0fd2f7ee4dd1a573e48443d33cf87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YM3MIPTG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIE5vjCvOoKQV0HCxtk2l2XFU70zyDdLaaHDKkQf1SKTqAiEAo%2BnH5wjWfQNfwWidkohpVlnpG5hbkNxUvSg5SD5djj8q%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDB1GONPtML2jJQr5myrcA98nPey1Lp%2BMskSC01yFzoxc%2FrbB3T4kHFLexZ%2BVUUl1dgXA%2F3cZOljCG0cURbW4A5dhxu9y3Xx9FOAeu4vZqbbCxNBPt8aubvWGJg1AV%2F4dLJJJx00YjxnDG6NbZhE%2BP4DUNMd%2FdoGXuBPq6dGi1u2N%2FyAbd8rHsDzjVL7EYVJhbYz0gPPgagrElG8d3Z1rBxs5KI5qlWtrpd%2Bppm8VmMgGqxke9yZ%2F4j4m2%2BMmzE3noYnV0rzSHevsQmL6%2FapzgfG9jaMdEMrPxNJvBOQmZqR9gRZ8p%2B3J42aD1q69gIMjDMDCmOt9VJEZKNuCiWlCbINdQFeoFDY7uySlU8%2Fy2WHbGjBC%2BCZI9RW6J1xfhmke23oqtBW4AynNsTvf02VR0sA8DyYnmSxboEJIOWOtQa%2BVE%2FrZfB%2Fp4tFHy1Ijq33%2BJjmnLgKPmLldcdnb13MzwwP76h8JMn2NMtZVn5vAx5UoOuJBV57VugoPSzFJGlhkl5pCLdL%2BlvICuyDEfxBYUkdJAcgYmNxpizcYPJltjLbbk6%2FQFH%2BxMW8rx%2BK4vH03qxzXRvBYy3TtUukmhUuhc%2FA0rYrF5qnsWLw4jbt3NpYYrfarAxuWRCGPNXBptH7aMQ5Y1W4A9jlMpPkvMNm34MoGOqUBgk0luPFczFz%2F4l3w%2BjUXW8S4o5nxiSR7tLaRzgp0oG5Kv%2FsE5G8flKVbVZ6AVM17vkEuVCGW6YbebtjrhXBH7w1fNMyKeO7BNLB3xM4T6hTYEvDefjQ35UpfjZvMdIfbGCf%2BsHaQFQGL9Tj%2BWI1B39MXDM3oyWpEjgMSiiBjkoegV1DZ4qT9VOHe1CT0xgYaFqCW3MMumy2MGtGaX9MBFRtygr5e&X-Amz-Signature=3b4f525cb42d0693f0a451260df59f151be15ecdf55e6cb87a4d02fed3951f5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662D5AIF72%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQD5%2FJfylXO31qNbpeWDpp07uZyOOD9Cg1s1bb8PxfwyVAIhALDsCNIH2j9AHWyn8K6wOTu9naERoVK6hWXyZU4o4X52Kv8DCAUQABoMNjM3NDIzMTgzODA1IgwSPWJ68GYSDQWG1xAq3ANppuTMzfzRNaZ3Yc%2BldLuQiUT7Jimb5T6tpAY2lgnK3wPqJuSMppSkaojTATLR82HOzEIuHuE0dZTjWvQjVuEGUNXcZLumA7ud62V2sREQPrmMdhJ7ONs809ubLBG1%2FawpXVMLTuiDJMDh9nhRUJMNmttWQv1Bui3bvO45tO%2Fqxtg1bOjVkfpO96CH8VZbhDteKq9kjkVjUQUPrenVRK%2BDzxCbHZyeVQ48r4VDN9UsyIGJCG8do5jBP3By26vxN4dyflUYgGrOVZi8VABjG25UBmGcrSdGawIDNefyXWQvLOQ00mfgKAVpSlZRk1%2BAQDiPBTc4652dPufWSWTxgrKX7Y3MPymbOJRa52HMWDTKdnychGHPUJQy%2BUV%2BsArB37tsPRI2MeZJ4VRXz0hL1PshvebSUIgrBG3d4ruGeOBDcd3FVyJcxK%2FjZKCe3%2FW5byqeCqqGdp4OwcPSUMD%2F6AJHOOqbrN4XdZVKVsIIh9FKEAmE6%2BQ6gXOVYWyV6zPGWtLvpeIFE70ygvCB7tL0V5Is6s7YliB5TIT2eqxipEc5cZ0uyXCentMLS%2BZyC1WlkL47Ozoq8qltM1Aql6PYxp%2FU3%2BPwwmQXYJ772HMZN0QIXXWhMaZFcYMaLiUL5DCgvuDKBjqkAbZZBjP19BReJh6bPxUt71JmWpqdDEaocBWh9%2F3jNFAElGJX%2F0ntmaA%2Fnr81tfSiLpbXB5Elo0sUq8j5pz7vuEhkrAEZEw5KhiRmf%2Fdpdm0IsyldUBvxgA9WLhDksxRhQlws78GBOreGk3c90MsKVubUHTBg4DOP8Pz0%2FQrQvi2rKTzixUHXT4F83hoH4EjaYujNutzgEKUjtFrmlHy3AQw2Wkaq&X-Amz-Signature=78e09c179080f8ab0a421f0b3d64c370785eab49b3aa029e9caa0d8629b8b1ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662D5AIF72%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQD5%2FJfylXO31qNbpeWDpp07uZyOOD9Cg1s1bb8PxfwyVAIhALDsCNIH2j9AHWyn8K6wOTu9naERoVK6hWXyZU4o4X52Kv8DCAUQABoMNjM3NDIzMTgzODA1IgwSPWJ68GYSDQWG1xAq3ANppuTMzfzRNaZ3Yc%2BldLuQiUT7Jimb5T6tpAY2lgnK3wPqJuSMppSkaojTATLR82HOzEIuHuE0dZTjWvQjVuEGUNXcZLumA7ud62V2sREQPrmMdhJ7ONs809ubLBG1%2FawpXVMLTuiDJMDh9nhRUJMNmttWQv1Bui3bvO45tO%2Fqxtg1bOjVkfpO96CH8VZbhDteKq9kjkVjUQUPrenVRK%2BDzxCbHZyeVQ48r4VDN9UsyIGJCG8do5jBP3By26vxN4dyflUYgGrOVZi8VABjG25UBmGcrSdGawIDNefyXWQvLOQ00mfgKAVpSlZRk1%2BAQDiPBTc4652dPufWSWTxgrKX7Y3MPymbOJRa52HMWDTKdnychGHPUJQy%2BUV%2BsArB37tsPRI2MeZJ4VRXz0hL1PshvebSUIgrBG3d4ruGeOBDcd3FVyJcxK%2FjZKCe3%2FW5byqeCqqGdp4OwcPSUMD%2F6AJHOOqbrN4XdZVKVsIIh9FKEAmE6%2BQ6gXOVYWyV6zPGWtLvpeIFE70ygvCB7tL0V5Is6s7YliB5TIT2eqxipEc5cZ0uyXCentMLS%2BZyC1WlkL47Ozoq8qltM1Aql6PYxp%2FU3%2BPwwmQXYJ772HMZN0QIXXWhMaZFcYMaLiUL5DCgvuDKBjqkAbZZBjP19BReJh6bPxUt71JmWpqdDEaocBWh9%2F3jNFAElGJX%2F0ntmaA%2Fnr81tfSiLpbXB5Elo0sUq8j5pz7vuEhkrAEZEw5KhiRmf%2Fdpdm0IsyldUBvxgA9WLhDksxRhQlws78GBOreGk3c90MsKVubUHTBg4DOP8Pz0%2FQrQvi2rKTzixUHXT4F83hoH4EjaYujNutzgEKUjtFrmlHy3AQw2Wkaq&X-Amz-Signature=78e09c179080f8ab0a421f0b3d64c370785eab49b3aa029e9caa0d8629b8b1ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4HTUQUG%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T004204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIHgGJfq1ttZJp3ZyN6uvZhzAyQC9%2BHwe6EFoyBrBL52qAiAjcu68gGSYrx5SU8J%2BD1wTlZJ96tneYfvUVl0iELPJwSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMt7UiqtnPwpWTr7QTKtwDG8O9Ej42U7ljA4%2Bt1sfU%2FS4ymJ9MXPzFApS2nj46DjwdHfN%2F0HvbesK%2FX1Qbmy1yM2%2FPTRS4yvShowJVrYBqEKvfdCC9ja4B32d75%2FKF%2Ft5Wm%2Bw6%2FFUSaMLKqhRy2JlB5EdFB46fv3DJXbWh8HkEBh9yIqKG%2FM7DgRXCDNYbevPR%2BeGgeUssW7Zw6qNwvRDsVx5idgtCf6ne6F%2FGWkejcb3Rp0KjK3d3mMsyhfQSUBgh6AAoCqH4U%2F62VgyRV5a5F%2BVyX2Dc2qGEsBOvm98qS%2BOUazP4Gjk6dm3n6lhtm3mJchHFg2ypKsQux06G4iD3OBVU0vYeBZ2SaJnIa3tcTrqkCuJZjVVPY1zJ7upMv%2BNByJsfuonctXRlB23uwhFL2Xe7T2iCHr93PqeB2zh3EbE12%2FTaqQlAFPda76C%2B6bYeC9EnpIuN2nqVnsH7Zs7gohFoShOWwbQUg3nRKwrmGfBB2RT0Vg7LitE6x%2FEJUzKqcznm5rS%2BkQDaCjalKwa2PqK68sMRDYfd5KJ4npDW7NdPS9Ib78M0C9pzl31Z9bIiYsxZVUo%2FynMDXresAdDR31UJeN1LhAfUQxEGyWDCzI7efMC%2FwqtbqiASeD8AlDxUXVVy2v5uELbkFA4w5MLgygY6pgHZ8SeNgNSIo8Gs%2BPNQ4%2BuGBsnBx2J9VXTeSEcvhxp1s7bza6OXIJj%2BfcBUpSHdD1Lpr72PfRGkCAy0Ft%2FvnDjRNuGjl2As1AvNP%2F90HOiN%2FqVu76SBhOp%2Bc3mR4MUw%2BphZIg7DaHO%2FCel%2BYEvOo2FEDZ1aj1T3bghqUZ%2F%2FBrYNbs7XouJFXluSOQCJS8fVXgkupH80Sr6Kn3YZ8CqV%2BVjyLW3friZU&X-Amz-Signature=8305f626ce91b2df7447ff0aff12f18097c6997baa049a94218cc0b43a2e4db3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

