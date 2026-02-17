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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAUR77Y6%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEccMj8FlP8T3zxOOw0FTPH3MndTMnkFRGtz912o5W1%2BAiBmZZscNFn8l1q2jiTrrBlbVmpeWAt0ZcMOeLq1e6G3qyr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMTvsbvinKhshOfp%2FZKtwD5vUIpwFXKWcqh0sgbztDvwt6wxeGJbs0i6Z9cHxAkeVdP8kiZfJ4MF6GzSgjhn4JUhekVUq3234qSZ%2BN2ELV%2FSB5nWRNi2GVZhQpxq3NMGSRCQRInzydvdxygrkpwMn9%2FVYKORY4BIaEnNTusITARIHhUrhmemgKqKWzAGkVoc504QtPJyu44SQlwZ7TIQr5j95X6hI6XMwvfVlNzZnqthHPI7HbIZfm088TBzaT%2BaiUl0%2B3lRVBv6kFwtMZlHhgtNbSsRFFJWz50H48ukE4mOsKcsbIhgFLE8KVxHWjesgU09JwrjYU%2F59FDyy1ylkJa6eo4oti9qrasCYNcM1sKJXAPuprvIq%2BO1%2FcECeVu9oarALuBlryjJQCJQZm7D46x8yWqA8JxZskolWcWUTJcVrQHdD%2BUKkWudn5xE63q3usFJYnaQDdDnvWCINqVthMJFJgA6rVMObAbFYbCrw5LxyaT7QUnGS6fgZcDxihLMjVI6Od32RwT0vCRQuHyg3U0jSUYhX%2Bw6ueEPKu4EjfyE6dnSPqOWAIQCsS6rhXzhfkhG77ofgNnGY2ZJ1QqMEvksV9qYsU6NxcjZAjMjzDUggn%2FH0lLYgIzKSRgQhLrKrwSD%2FWCP8TVkIrf6AwmJvRzAY6pgF6UwgCs6%2Fukg4khQfp50BXT30WkpnuoGSliugTElWLag7QVXGhUcj3%2FlYVGynPGc7kZ7Jt%2BMuVANZK5rnWplmKqSFUEKjcgjhCYKZhkTPSsILypzyrlIt6ULNrYkRPTjJmRJHCsygA2NCsvJmy3p3GrrGuQEFGB4cJfQsQjSjlJlW%2B3BJjfmCn%2FFuLBTdiH%2FjXkuaefW4QkRy5%2Fc%2B4jWqmo2hYwh7A&X-Amz-Signature=061b13c9c673bd92a0e528b95a2ab4e1fb609b2c27b0b97a684887883382e64f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAUR77Y6%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEccMj8FlP8T3zxOOw0FTPH3MndTMnkFRGtz912o5W1%2BAiBmZZscNFn8l1q2jiTrrBlbVmpeWAt0ZcMOeLq1e6G3qyr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMTvsbvinKhshOfp%2FZKtwD5vUIpwFXKWcqh0sgbztDvwt6wxeGJbs0i6Z9cHxAkeVdP8kiZfJ4MF6GzSgjhn4JUhekVUq3234qSZ%2BN2ELV%2FSB5nWRNi2GVZhQpxq3NMGSRCQRInzydvdxygrkpwMn9%2FVYKORY4BIaEnNTusITARIHhUrhmemgKqKWzAGkVoc504QtPJyu44SQlwZ7TIQr5j95X6hI6XMwvfVlNzZnqthHPI7HbIZfm088TBzaT%2BaiUl0%2B3lRVBv6kFwtMZlHhgtNbSsRFFJWz50H48ukE4mOsKcsbIhgFLE8KVxHWjesgU09JwrjYU%2F59FDyy1ylkJa6eo4oti9qrasCYNcM1sKJXAPuprvIq%2BO1%2FcECeVu9oarALuBlryjJQCJQZm7D46x8yWqA8JxZskolWcWUTJcVrQHdD%2BUKkWudn5xE63q3usFJYnaQDdDnvWCINqVthMJFJgA6rVMObAbFYbCrw5LxyaT7QUnGS6fgZcDxihLMjVI6Od32RwT0vCRQuHyg3U0jSUYhX%2Bw6ueEPKu4EjfyE6dnSPqOWAIQCsS6rhXzhfkhG77ofgNnGY2ZJ1QqMEvksV9qYsU6NxcjZAjMjzDUggn%2FH0lLYgIzKSRgQhLrKrwSD%2FWCP8TVkIrf6AwmJvRzAY6pgF6UwgCs6%2Fukg4khQfp50BXT30WkpnuoGSliugTElWLag7QVXGhUcj3%2FlYVGynPGc7kZ7Jt%2BMuVANZK5rnWplmKqSFUEKjcgjhCYKZhkTPSsILypzyrlIt6ULNrYkRPTjJmRJHCsygA2NCsvJmy3p3GrrGuQEFGB4cJfQsQjSjlJlW%2B3BJjfmCn%2FFuLBTdiH%2FjXkuaefW4QkRy5%2Fc%2B4jWqmo2hYwh7A&X-Amz-Signature=061b13c9c673bd92a0e528b95a2ab4e1fb609b2c27b0b97a684887883382e64f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCOAACGY%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113004Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFlvuHCPcy8WKapSNYmVy0hy07uAB5hdgyNADrBP%2BUWeAiEAyVR5xvHWs1jgKEk4ObiCbziEMOVArqf6Vo5LGvv5Vo4q%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDGn6WVsYVeC24wiDMircA99fqbq1UlnYY8OtIBajNrWEIzwr8QpX4V25R3bXO%2FlVE%2BrrjeGcwEduSrUnVinsvfurKbuIcQGWGip1ZsGhBN%2BWz6WDceJSgxpeAL3S6xCJSJClMjbAf53LzPV99vnFqalLmFyGBpJjyYdNricB%2F5qajUCZKLYKAOS%2FmkvlBDcEcMFbcNLeZzdAJwy1UCh%2FysdIyibdQU%2B7P%2FSFLEvq9XmwO6X6I%2Bv1ml4jFp708XDVcsv4Q7iytclVsFWowcu7D79u1467pGjyOk53jdRvKOj9baojMzOQYbv9nPhZZgxWRrOv8LVTgxE0AHZQxRhzFRBK9CBGI8PrRL7UOSKpqySbfwLHGAmCALtBGXzlmZR%2BYLLXbD6NkdIsasHPhBWIOCRXG8sPE4yteabx0Kartfd9kDZQ7SB7cpb2oHWFfgRTDvZHDS0c702nUC5H7i%2F%2FlG32SR5fAClmIYrRPPuIy4CwkmodT5i8FiZ5ZgOJKEeov4MwfvY1VkMyPqSCCM359QEhXhsrT7txgqWZ5KXE7c08Wxwl2eCr5t2akZ324rG3AtqvlQvUnjfN%2BO0giKW8DZiWopa0yotD1TkEBi%2B9qH7cAfV%2BI3yJ3IE9U6qi3TtbUtKI2wUg3tBkcbcRMOyb0cwGOqUBxHEkQq99bkzWUp8hOP8kmzjh%2Fks8xPTvodprKB3HTEQHoEP1kt43hw%2BMrRdbdLtZzKQ%2FSwtb34s6lBYmXrklejRk6PFNE0Xbg%2FNPNeKibMUNrWFlwxBwQcza53nB3Fuvele1J0Q2qe1Cy%2FwUV6xuowqQm5jgs4O1FGxuc0AFIYbKb%2FDUMUsBqc3Tg%2Bp4w3Sye47%2Bg%2FFxt4pclSX8g%2Fi4gHAZ8PiV&X-Amz-Signature=0c4e53412183e0dbf4c5c804c0a14d778bf13f4df8c345c501a71e9bdb3811fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIHS5VHI%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDE42GAVY%2B7CeRZHuJ47fwRzwP4wbeBEx2mupF7Hx%2F%2FsgIgPCZGsnkm4CjLP3j5OYamMdwH88X%2BZetguNZDXJ7f18Uq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDAUeOYNOU%2FYLIOkLqSrcAxPSmrIPraiC5T58ti2y%2BBvPvXfSI3PILRuy8wCo1d%2BqE24sBDCmTXdm6xddcxEHnXaA5PVbaODhun62AWdVr4tBzEYkhJbpiPmOGkLrs%2FdFMevbgE2fA09zZlOlb0fj5pjJuzSmw6OfbsvjLYHk9O01wcXzHJ%2B1nvZQsZ1h%2BIMaYZgNTWJNUzXVSNlREtcoTI3VMNIbT794%2B92d2NPZDgxRc5EPmYnMRZUsHgTHuhG%2FwvKA5QiCLAKvSNTUfp8LnszK%2BxzmldYWRmaiog80MIrH79Ueu8sicmyDK1Al9Sp8dtMiGOJgxwcOBbFKD29T%2FGkeBiToi7ePFbZ2nh0RG4R8oG7W6B8uuTqRZxHB2UeWDhIYOnlJVm4XKbRfcgap%2FYA1YeByLhfgLVErX8opL1z8gjvmDXF9S0Aca2AQYjSEllCFpMS5RBmKBWKI1djBGILcjSCdIse9kaVx1dpKhwRcII8IZvpbe8QDLTlsteQOFlb2ADO8XjeqkdGuRqPLB3ZBYxKnBuCrQMxCn43YkJmKAvyuvczqYYibUBujkA3hhfW5si1fLfeSv4lPjr2fjdJE1rc%2Fwmmd9P%2FnUpp77unBgV6d8AsjbE%2BszqcZtZkL3uEEoTOAjakIyYkyMMCb0cwGOqUB35KB7ElpfmwO%2FGtj8S4Ho1uJR0bRRJvBmIAZMcNmjNe2nI04yvZ4Mor2UbH8cISg14tWNyXkGj4tan5WDh0voTDW34fOG3dJPw0XNnOwQCaRfvoPxf6H7CUfq%2BgxYWKGyyussgoJE2KrHK1YMHNU0rwCQHnOiotszovtwoFcogJJetK1gEo5RCg4lGYvUCJazTlNmaczARL5qEFc1OyGvbCLiiO3&X-Amz-Signature=1a2267385f27469738da872512cbb7a5716a90fa5b1dfb0811979613d24b19c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIHS5VHI%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDE42GAVY%2B7CeRZHuJ47fwRzwP4wbeBEx2mupF7Hx%2F%2FsgIgPCZGsnkm4CjLP3j5OYamMdwH88X%2BZetguNZDXJ7f18Uq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDAUeOYNOU%2FYLIOkLqSrcAxPSmrIPraiC5T58ti2y%2BBvPvXfSI3PILRuy8wCo1d%2BqE24sBDCmTXdm6xddcxEHnXaA5PVbaODhun62AWdVr4tBzEYkhJbpiPmOGkLrs%2FdFMevbgE2fA09zZlOlb0fj5pjJuzSmw6OfbsvjLYHk9O01wcXzHJ%2B1nvZQsZ1h%2BIMaYZgNTWJNUzXVSNlREtcoTI3VMNIbT794%2B92d2NPZDgxRc5EPmYnMRZUsHgTHuhG%2FwvKA5QiCLAKvSNTUfp8LnszK%2BxzmldYWRmaiog80MIrH79Ueu8sicmyDK1Al9Sp8dtMiGOJgxwcOBbFKD29T%2FGkeBiToi7ePFbZ2nh0RG4R8oG7W6B8uuTqRZxHB2UeWDhIYOnlJVm4XKbRfcgap%2FYA1YeByLhfgLVErX8opL1z8gjvmDXF9S0Aca2AQYjSEllCFpMS5RBmKBWKI1djBGILcjSCdIse9kaVx1dpKhwRcII8IZvpbe8QDLTlsteQOFlb2ADO8XjeqkdGuRqPLB3ZBYxKnBuCrQMxCn43YkJmKAvyuvczqYYibUBujkA3hhfW5si1fLfeSv4lPjr2fjdJE1rc%2Fwmmd9P%2FnUpp77unBgV6d8AsjbE%2BszqcZtZkL3uEEoTOAjakIyYkyMMCb0cwGOqUB35KB7ElpfmwO%2FGtj8S4Ho1uJR0bRRJvBmIAZMcNmjNe2nI04yvZ4Mor2UbH8cISg14tWNyXkGj4tan5WDh0voTDW34fOG3dJPw0XNnOwQCaRfvoPxf6H7CUfq%2BgxYWKGyyussgoJE2KrHK1YMHNU0rwCQHnOiotszovtwoFcogJJetK1gEo5RCg4lGYvUCJazTlNmaczARL5qEFc1OyGvbCLiiO3&X-Amz-Signature=09a432eab43ffe86a8afee0b0df493dc4a58d335e20b79349fa22677a5094ca6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KH535HD%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHIP9m1%2BvTR5vgNY9jgFvsHxpMUXUV3DJJhvLWjI4ySAIgPi3Wup5LTt4JJhGL4a1xA2psOjyO8xkdEbsKBXOrmBAq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDFXMWa0vfvMzircggCrcA%2F2LnQCJAAi8sNyzOXFoIPS%2B3a77TpA4pg%2F1qDYtcP9HkfHjeKQNWfpLNGPgq%2FRr65JNKn0G8g9Q6qdRs%2Fk8fX3763dTOOZ7ZElr1eAc023lyAoqGFHjEcYksxAovZ%2B34Eijmgeu68VF5CxPEsQXHwe0ZETzIJ2mPcUdVRmiYGykhwz0qAjaSvfLfh1QtA4YandXeox8T5yZDBegLk0nsyJJ4QjVWE6O8oUdnjBzseWSQrV16YVBmcQofIVHbXJ48gqf5YbvS%2BFvuhiqz1l%2BkbWKUKzVESiAvMzzsIf5xqVWAJysnM5EaIPaO3dk7Ed%2BwRSfeZrtoHzz3UUl7pOMf3dRygXhtVIjDOVfDMDpQwgsHdcoLNHHNcIBQgjlIxtvX6JMFchDiPuvoVF0q%2FOhN8uyMXi0uBqV6mwQiecT9AFft9Pm%2BSnUkUlfeM1TgANqy3Ak0DuADmkWYFTyO2isKeJaQYGHk%2FgqkabQIHxHXWZEb0Dr2iHZHHdtC0UM71sVUXmK8IStl7pJcde2Qv%2BxQSwFsgY3%2BlJ8JQmgX7cCm%2BqtPGIVz6tep1dWJSzOf2zcuMOMWQlAq%2BAYAyqmT7wmXax0FzS7EAXLoM3jlSJDdoqMuMQNNqUeZ%2BaYjcCIMKWa0cwGOqUB3OBASPVB1BsqQpz8CTQaWwvFJrLw6aGa8mpZWpyWVS8xz0R9GaiE%2Fso%2BRRLnukpKKlOwa%2BHDR%2B2p%2FiktbT7CS73PjjEZ1yHo2EYA1VzpOL2xGXcRwnVWgPUFsuKFAFHYDm7ZkQP1EZVIapBEBEzSGR4sNFrsttIi2ZkE9s6EAPbRPtTxu%2Fxi7HJAFn%2BNNvidyUOPKab47bqWu8vXVgcdURjkC0c3&X-Amz-Signature=6e3b75b0e332c51ca7d09dd5cea87f38eac61d047e32448f5f44c7ad5e4e7fed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WR4ZN2P%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC7cFITlz6VMqmY7lRH%2Fi4Z%2BekSEp7UEN1Xb6VBOtRAfAIhAJwepbQuEBo7hYfR6PC7jbp5bDFcVxZJS3m8S2FsPl1PKv8DCEwQABoMNjM3NDIzMTgzODA1IgzMdXoZ817BSn2Xdpkq3AMLa5pC%2B%2F4Jb1LEZgLAVAmesdfLlLbSqd7Ni92X27yWXkK7KjRwZIyh6Z7jcU%2FdtP8i1q1w%2FvEDzwniZPE7WUPPNbNqmrU6R8b2XVajq4ri6T3jMkocxYDaM%2BLVIHA1Op%2BgAx1PCxJEYevg4TCuiJOo0DH9V5iRgEsbfBUg7d8aFGglXRZ2ZeBLA75r%2F8Y8GHrkY%2FuKk42y1zX4YefZbkomxk29QqndwXDX0a6fn0YJgunP7JLYWUp1dqq4PoZoVOnat25nqjg%2F63Roxbg8Hj7Jr9AqHVpRJXY3IWOoC55fyT1YzL395Y6XGg4idNFiq21UzarWS6HdjO0%2B%2FwESqeJi5OUrUXgy5JKoiH9P9SCniANNulf6NkzGo0xTE4WAcTDOIzd4%2F4Eu0gr2IpBpcCTM56zJbYNjp%2B3JrUN%2FGSnai9nojVOvofdvPvIYHYciZTkYkawAmdfygVRnlJ1eMGAWoxGk60QkMp092NkByDxdT%2FvTmzsUN%2BUds869C9TTEhUYD5Q3yWSwESw9a7qr1DWKw2YRYSBBBMaoZgSTTI3W6NHqaQQLm%2B6WrslyoIFv2GHwz8lok%2B1ckOoeLXB92%2FU5C4Ynebm87O7RejuyRHGlubUS2xZQ%2FNy3W4CwlzD4mdHMBjqkAXfhDH6roM1heLaghPcj4Zc3ks503%2FmQfPe9j6vZhjtUKvj6YCECFSaiPL%2BVJNIr8gLystn1gc9Wk6VEDGP%2F1xJvXM6zdGYBouW14LsPwQ%2Ft%2F6fcmsrNAUzD%2BbsxEvNdXLGQyZ2BN5%2Fl%2B9Ie1uyzn2Y%2Fp%2BTN1gOV8tEfOn40T1rNcYgFNuIDt8LgQo111MhVEu2gn%2F%2FymAnh9iTbRsgbNcDft0uM&X-Amz-Signature=fd818e163f4307fdd4066a29f0802d153afea765e1db099ffa06be8dc26d517c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7Q2OCRS%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHNGvEJTAVGzb%2BZ36XPBkQFxDobNmqNiU27CoGXytW7nAiEAqbw1JzbOsVW9YVRUIxhiraNMcSQ7HZS95WPWwFfQZDEq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDCQUmsmiY9ylODHNNircA3tU3ZpGIZ7dpyIlx2AiWHzVx2r4xhYPRQZrAuCFns4XSCudWY2hsWNB15IKZcya7X4cwF2bHvZNaXxMQsfEhcwhrzqgAkyRa5BkoQIVJ4pv3fXNYCBuPDKVVOPkNMAbcFPoG4t52QwbUNVeRVwzD7EEQe%2FaCAt339Khy9b3rUWlFsbeQF5F3OGkj2oxuPLFAa5YFKdt5WOZOg%2B%2FQ5Xsqe4K%2F%2F20xQkYt2j%2F8fmCCq5UPFxJMX7lMTYWNW%2F9wXpu8m%2FL6423sbxDdw4qe1UzjuFXu7mQcTJhjcZyzDYaZeW9NsB1ncaw0n2A0AzqylodDkq1yDg0LvxydO98FLEoJ5GXNEG1%2Bgw7rPSzJpZCrfrxfPsRZtZgY%2FxvW%2FsCv%2BJVMbn%2FqX2dL6wLZAMDv0%2BZ9rijkzqbi4jLtvKkhCQVx7ncwJw8nwkWymCMmJSxdTyas39tJ3Avm23H%2Ffv2rT7fb5npe7r2xrUDthkVnIcW%2F%2F50sDHKKO9wU2jq7IUwwlNxbGCt1tLdIzXTX9BvTmD96elEmf7s8U7Eqw7WDkC1l9pqCItW0uFlK0%2B%2FYr37baiqXrqv3JO17cAWB0lZAGfEVCdiOO4MeLnUd%2FtJfkMpQCet7dr%2Bd8zDwMLN1KgbMKia0cwGOqUBX8z5arnoFfWy%2FquD5UO2gKpKs7wac4iisTiSVCC0ocVJW1jaXa8CgrlM%2BTJ7ABXwYAtb34s40vkKUFrF9t261NdPk16%2BKOP9GbCSR1AnDKaA4S6TsyppVTRfSXFGQMFN3PVabREQL0qWqawOPC8HG2fiZM5msDU12Q7uVL9a0vd7CTSyl5znrPTAKlVU80vMTu%2BkX5WMWt7JEMEkvUhLtatpOv03&X-Amz-Signature=62f864f0c5ff9226a280b3ded9a5e9557b89b36745ee73a401d7e62ba94bc30b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBCTA5U7%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113009Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAzAOwtYuNEczENqT2BLVoF9AiQU0QvElViPEWvsoP7NAiEAlw504oWJd3SyH7fGxabxE4QuKJjYBDFL2YR5J5%2Byh4cq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDH1cQMJbalCW2Nle3CrcA5DpVKcDWg5%2FgF0kB091Pj0Luh86OKMGTPLlKG3iBPVaqw16iyWgT26QZKk2ThS4xFM759PJxAjcw%2B21HCUirDFoBp6sGZX%2BW5IAuR%2FDLjWleedWZeH60ICOAJ7eqxeLEwds1ryfsSRf7FoLxEse0oQ75a%2Fc%2BTGdXJf3%2BNgBPMh4dnfmv1qgrtMi17kuCTB%2FiLC7DAWuDGbx7spDtJ0GU34aBzvNnJv85clpQOT1hIU%2BIdzI6ojpb9wSG1yjFijkO%2B%2BUiPIS1jfkPwPSjZPCHnvrzBYQEMdqoVh7Rqg2OAZsZHiHNTgM12ND0Sw2iCIjA2j93ivRKjRd1xNKHSsaj99GT1uQmDVgJaw%2FV0jS907xJBFfMkYeJzrofTFvWvEUcnbPti68XlYUKGuQ3Rx9Nzj3dIK5JiCmuWFYC%2BhDKzp2SzgepIjzj0cTlpQ4RBNpmseJWJqmapL44tsX2uu7E7ABP09vqJ%2Fq0EK04NfGvhDfZFcO9sqx0OsOscRgoPLeRJoxw%2Brja5pWQhbt59X0Vr589ZI09tWpgxtq%2B%2F%2FXVb%2Fhr3xwRv0zXVktsFndwf%2BdZZsuuwuHYkefgynaEkuYgwc6SLXef4XL%2B56YHUxcXlRR0Xz9y5ZBIMolH0xuMPyZ0cwGOqUBI2UuujBZzSh9EN88QAV7rI2hz7RGkGSaKcuaSWoxmfOWbw1MA8a8lTPWNgHeiD8kKdtKRvAROSmENxAnTyFrvFVOLRXG2a4FrPTYvn3wHG9wEWGpinr351x%2Fjn76AJ%2FeHbTO2XnJYLryUXyXjiqDcllLG0erQ%2F9l0BoLyesn9qTLh3g%2B63CYitBVLUo7R87lG0pxzUz5eS8E0xCjrUfHxgq%2FnQqI&X-Amz-Signature=f4913d65787b74a08bae20fad616e81f0d2a938c72407d1f62bf7ab039c55b4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBCTA5U7%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113009Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAzAOwtYuNEczENqT2BLVoF9AiQU0QvElViPEWvsoP7NAiEAlw504oWJd3SyH7fGxabxE4QuKJjYBDFL2YR5J5%2Byh4cq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDH1cQMJbalCW2Nle3CrcA5DpVKcDWg5%2FgF0kB091Pj0Luh86OKMGTPLlKG3iBPVaqw16iyWgT26QZKk2ThS4xFM759PJxAjcw%2B21HCUirDFoBp6sGZX%2BW5IAuR%2FDLjWleedWZeH60ICOAJ7eqxeLEwds1ryfsSRf7FoLxEse0oQ75a%2Fc%2BTGdXJf3%2BNgBPMh4dnfmv1qgrtMi17kuCTB%2FiLC7DAWuDGbx7spDtJ0GU34aBzvNnJv85clpQOT1hIU%2BIdzI6ojpb9wSG1yjFijkO%2B%2BUiPIS1jfkPwPSjZPCHnvrzBYQEMdqoVh7Rqg2OAZsZHiHNTgM12ND0Sw2iCIjA2j93ivRKjRd1xNKHSsaj99GT1uQmDVgJaw%2FV0jS907xJBFfMkYeJzrofTFvWvEUcnbPti68XlYUKGuQ3Rx9Nzj3dIK5JiCmuWFYC%2BhDKzp2SzgepIjzj0cTlpQ4RBNpmseJWJqmapL44tsX2uu7E7ABP09vqJ%2Fq0EK04NfGvhDfZFcO9sqx0OsOscRgoPLeRJoxw%2Brja5pWQhbt59X0Vr589ZI09tWpgxtq%2B%2F%2FXVb%2Fhr3xwRv0zXVktsFndwf%2BdZZsuuwuHYkefgynaEkuYgwc6SLXef4XL%2B56YHUxcXlRR0Xz9y5ZBIMolH0xuMPyZ0cwGOqUBI2UuujBZzSh9EN88QAV7rI2hz7RGkGSaKcuaSWoxmfOWbw1MA8a8lTPWNgHeiD8kKdtKRvAROSmENxAnTyFrvFVOLRXG2a4FrPTYvn3wHG9wEWGpinr351x%2Fjn76AJ%2FeHbTO2XnJYLryUXyXjiqDcllLG0erQ%2F9l0BoLyesn9qTLh3g%2B63CYitBVLUo7R87lG0pxzUz5eS8E0xCjrUfHxgq%2FnQqI&X-Amz-Signature=5a72de76e20679b11c5c5d8148d16d77d578366ef9dc189281b9254ee0f944a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFEQ4XXZ%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDKWgB34FQwfi%2BqOg%2BQj4l6dInV%2BbLuiLO4Txo%2FX3M7gAiBrEoqNWudCluaBkMpz3794lAJqrlHhm16gzmR6Tjvzjyr%2FAwhMEAAaDDYzNzQyMzE4MzgwNSIMG1bHV80hmJH0%2FIxzKtwDacTnr7APIAc5mef20Qp8YRxlUxbTz%2FA965sUXkwWNVVa0%2FpzFddDDFHQNKn2RJToRV7x2tv3E%2BMs6BtoyE%2FDA%2FU9ViU7BHgy6GjwVlOa7bg%2FEz8Hn8ZDLGMAAiu0mOVjZc0rM%2BjB3OhwA0M16dIiPmvQxzxNTkp40qZhNlU4DfCJ4%2FlePKpVEerLLa7tkNzjyYrpss90ecTve0btPRiYgZ3lS1Q5btPpDjG7au1vkABkMVMP6C%2FMdFVBvEpXI82WHQV%2Fj1VeDl4TycL31WVR%2F6Tou3KEsnHuZgaH%2BRj7fCxOazEf071KXBNeRmRmKMLh03lwBYOHU%2ByaD6Jd6UHwL6vhnuw6x35jb76%2B7eTT5C%2BaVF8XEOJAh0M84RffP02y%2BefJx5ldi7uLOrCiy9u1xKA9QNxAajKzOhBllVKq551R5xaVkcxVv4HC%2BwD8eS%2B%2FJwQQqIoi156vd2gj5%2B5C82AbZRnIQPMIEr0q%2FaZ61b93rWPrfCuSPyZcyFIuPUTqHlq3h0RjxhmJWO8bmmkSSmrUFFWZT%2Bq%2BfIylZ3CYNLuSIND21waJdLWtK1IxEwVsXamLKqcujDKwBcQ1mGx3JxaDKTEUvhCj7ZAo1kFhQTrw8eln2SVHsVcWEnQwyZrRzAY6pgEX8%2F6MYU%2BwNSTVExUTBWI%2BiUt8sfReoQmLB4HDj%2BePOMDoKccEz0GHDiFqTpRL47l34HRHhFD7oln8VNHjVxbwCKwnNOEeh%2Buf0SWg6oshHCOr4B4Rh49fqvkI7e1hPHjshaAYt6i8ia8ZIkT5qUuRhCJgVFJvN8kFXeuKJ%2B1D8lMLku8mzaSUl%2F56%2BsmG0kY0MoljC7%2BIqUkLdq8R3e8GuRDAEPsU&X-Amz-Signature=18598f7c6701e0662cc866ed95fe3f151cfeb0c4c0d1bceb3ac8ee3bdaf86d00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFU2QIS5%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCQ%2FVoBJjv6aI69ioKosSnwe8yerl%2B12TAyCmnKb2t0SAIgHMMV7XJDMqbP35csCRDRJd7oEiG5Tz9F%2FPcH7aFlfnAq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDIfkGTNgj3K7n%2Fvk9CrcAypfQxg3LTlif8nzQ5iwiAZnHh3eHBeJCTNZa28xCEhk6rt7WXrbc9%2FbuZswze5a2NtE7FghI2Ad3szx29qRSWgmIOlXf0wNlwTYsxVUzB0xeDcd2hgXs8vdr3i2okscoYoHIkfzsWKBlnjOgEPL1s%2FjBm1SU00njFAvwLOZ4lkJDCCMibykBpJcsV%2FHXmRM7V%2BvGcc%2BZO4MrQ9XJxXnVqFlas4NGPF4seMFrAu6mB1MjEv5B74nIMoR9Bu5uvpfAWVOj35qNRz3mgH7UMTgWiK%2B%2BVJthYH%2FDeo3ZWa5u6OOgEyDUMPhro8BJob8QMCI45dIh7TL0kzTg1x4q0mYGGHSvmfB5Mgkp6aVonUOPzjq%2FUb0KSWwslatMMHyBC82fRN51q6mxAUE8HODYfe5dL1GLZk2nuOc2jDDrtUAw%2BS00Z%2F0gwOW%2FU%2FidofYEQHs9Kb0XPKIOwURt8ZCGH1baqXR20klj9tqLNS7OfIhNkM2iTcvDzF2JIhONs6mC5kgNJ5s9mgPaPjWxhaVKlHkCetl9y7Nfs1%2FwkHNFCv3gn5na7L0aHo8x11g5AHbeJvcbFupvbBx8ksyIh6dlkTULatmZ0x6JcAT%2BkulY96RTyhJGoG71D%2FnefBF6uABMP6Z0cwGOqUB0yu5Y0qydXGLOw0mQL5ya4f4m%2F3TAthDsBWsaITlFoe9fL95XcIQrfPKZWyuxR%2FKHhrCDv80HTwuLqycmMFQaFpFbC11WcTZPyE%2Fd3h%2FxSX9xY6mif4t2DRZUP1ZXU2%2BktPx%2B915L6xHqeyoR03snM8TrCxu49S5p1Dj0lhHqQ3eDhskqx9YLT1uBH33GDIhwJJ45ku5nQ1FvClP%2B7iuE5NSCwqz&X-Amz-Signature=b25390c4216717bc7f42c75da6a4d2f16a590115274003934a8417fc50d19b43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFU2QIS5%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCQ%2FVoBJjv6aI69ioKosSnwe8yerl%2B12TAyCmnKb2t0SAIgHMMV7XJDMqbP35csCRDRJd7oEiG5Tz9F%2FPcH7aFlfnAq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDIfkGTNgj3K7n%2Fvk9CrcAypfQxg3LTlif8nzQ5iwiAZnHh3eHBeJCTNZa28xCEhk6rt7WXrbc9%2FbuZswze5a2NtE7FghI2Ad3szx29qRSWgmIOlXf0wNlwTYsxVUzB0xeDcd2hgXs8vdr3i2okscoYoHIkfzsWKBlnjOgEPL1s%2FjBm1SU00njFAvwLOZ4lkJDCCMibykBpJcsV%2FHXmRM7V%2BvGcc%2BZO4MrQ9XJxXnVqFlas4NGPF4seMFrAu6mB1MjEv5B74nIMoR9Bu5uvpfAWVOj35qNRz3mgH7UMTgWiK%2B%2BVJthYH%2FDeo3ZWa5u6OOgEyDUMPhro8BJob8QMCI45dIh7TL0kzTg1x4q0mYGGHSvmfB5Mgkp6aVonUOPzjq%2FUb0KSWwslatMMHyBC82fRN51q6mxAUE8HODYfe5dL1GLZk2nuOc2jDDrtUAw%2BS00Z%2F0gwOW%2FU%2FidofYEQHs9Kb0XPKIOwURt8ZCGH1baqXR20klj9tqLNS7OfIhNkM2iTcvDzF2JIhONs6mC5kgNJ5s9mgPaPjWxhaVKlHkCetl9y7Nfs1%2FwkHNFCv3gn5na7L0aHo8x11g5AHbeJvcbFupvbBx8ksyIh6dlkTULatmZ0x6JcAT%2BkulY96RTyhJGoG71D%2FnefBF6uABMP6Z0cwGOqUB0yu5Y0qydXGLOw0mQL5ya4f4m%2F3TAthDsBWsaITlFoe9fL95XcIQrfPKZWyuxR%2FKHhrCDv80HTwuLqycmMFQaFpFbC11WcTZPyE%2Fd3h%2FxSX9xY6mif4t2DRZUP1ZXU2%2BktPx%2B915L6xHqeyoR03snM8TrCxu49S5p1Dj0lhHqQ3eDhskqx9YLT1uBH33GDIhwJJ45ku5nQ1FvClP%2B7iuE5NSCwqz&X-Amz-Signature=b25390c4216717bc7f42c75da6a4d2f16a590115274003934a8417fc50d19b43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666AWPQINC%2F20260217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260217T113011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAuG55dUzey77fx5bwxK8HdAh7ncTpwnDI41wFkstqjtAiEA%2FKBVvvDIlgu%2BIZhLY%2BoCRrmtP9%2BOD0RFTgVSoghaDbQq%2FwMITBAAGgw2Mzc0MjMxODM4MDUiDP0Dlg7RVzJ0fUc0fyrcA%2BlPIw8rjxDfPtCR9CQEoagZKgWJK7hQW5ADAfY4Dlhvw4S%2BP5UPpCl0G2WNGAAxQ5wR62ckL3uA3vlDpT%2Bi%2FyXiGT7tc7i28XB%2BQJbX30dGhClIwudQxawzTgi4ku8bKIJ1VmQXw6rgA37fw1LgU6T%2FXTrn66OaE14J%2B8eddCaqp3hfi0Qk8d83aAiUYueSRhuqKB%2FQ0%2FS25gN574itGaIIRCSlwf2UhxnHyT%2BRFKIoXJGWTqgpy1jq%2B9N6%2FMA702fb8uisGGQptTo%2B%2BHYCPKzE4URf22L9zvnWlwqHi6MfC3x6Ws54%2Brdsnz7F0Xqu0Uu8DcCNZy85gxlL4y%2BaUe%2F3CU1JvRHZIJV%2FV%2FprNziXtvgMrzVFvRe7%2F1%2F%2FTLp96AZUEF2pkI%2B4%2F1tUtvP%2BfF13t3G4AseJJUywF15EdULWa%2FM71uTPx4Qf6vhknEDlI9gmMPZupwBP6%2FXqBclhcZVRgcJnesew8oy9phL6uTzeCTRMdYcFNsTwbFYtj1WDBdUWEq3wV1a4c3M7WjGc6ukUxTiq0aMy38y7BFPFB441W8CQy5x56JN2tTFNVmwGvu%2BCidWZ5PY5Jcw6d7yUyHnIXYfBPfCkr2iNKQ74Wlw8F3GvOXr6SnNDXxovMJyb0cwGOqUBf7fWjklqRTTVvMJJksvULmBcGY4A010KqjsQre5iYdE0L6ablTfYoJLFeTNhzLnQnwe9u5agv7s0eh%2FzpTUxrfv9uqkRHa8zERwB%2Bp4bhe694VmK0q5bVwOeU0oj2VcW8g6%2Bkqzlw4qq5qehyDu%2BO77%2BROamwO4oKHeQk1%2Bapju4MrtMzeYd1wdQhOOWEg5qiBO3wDTXSz8XembMXRYLvolMqJLy&X-Amz-Signature=32ca5a5878a40c403a0cca533b068054320551ef7b65382ccf777b4983ca35fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

