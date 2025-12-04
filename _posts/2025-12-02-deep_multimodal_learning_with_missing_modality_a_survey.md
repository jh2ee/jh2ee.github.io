---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDX3A7YA%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T004142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQC4FoFLm70kZB4IrF%2FUPlzQ9iFVf%2FUkughf8cYJmTC%2B4AIhAM3zkT8AzwrhkH5uNHoqBtd8liKEDx%2B48V3Qt6EStq9DKv8DCDkQABoMNjM3NDIzMTgzODA1IgwEhS1%2BWZCqAWUVNvwq3APh%2B9uR8%2FGY%2F5UHe5NL%2FND%2B2SxUfmuhz2vstsY18CkYE6oorfuVNwiVRSWCXwaZAv%2FA%2F50nZhx1utkwpryQi1E1Xco5UUYYdt3NYv6uBTyC%2BN%2ByfjSkPXR7%2Bt38HQeW6bbniNuNCzaLe36jqmLrHg6V1NZWQF8cNbLyQHcOVVQEFwAW2g4158ZZOTjSawtRJO3KEWIbQllbac6Q6q7%2Fagx4BQvskd2vk5s254V7a99c7OtvpvOcD5BNyhOMP1fySsm6bkbOLpvGikwBdJc99gsjQt%2FyATN%2FwfTJM1VhDgF3KF91XmcYtBN77eTzAxXMszKfkSGZZyyaWzrFAEmpButLBx7WvMkDr9c3kasYrvs8ok4or%2FkR4Xmbr%2Ffu%2Bgx2vf10feMDkKqnwGNxbKF2k94V0rgcPMAm7vPY9zMsISN%2BoqdRP611Og1uRGCaKOuz4UGAv2%2BBhUHqrlUyplKWBw%2F1ifSfQsmdbs9Xc7HTZXX10SY2XSurjCV8oV5viau8tGCHcqhP6nWaBney6y9vrzMnYLbnPhOwaFc0UUDNkW8rrgvRCXBSuauqY7zX9ownT1e9yzUBf8kp%2Ba0wlN%2BzRNsTuNdWtT3L%2FX3bzVof5fYrilwZ5GpsZSdruliuADC7ocPJBjqkAfr9xy2aAwAOZraSuRs%2B3QhoB7rOZtZIQ60reSVkN6u3MZddMocx5hm%2FmEKQ94Qfd4dQ6WvN98ydm7mB%2BjGymCKKgeA6DmdHsj%2FOpR2ADS%2B43GjvSp4drXnFNb%2BGypW8rXlLWIdeNYZ2ZtZigSPaPlf%2F90m%2FRrxYy3mugb2GVSYL2gEL3Kgc89OgUF7BcSgUT8W0eDIgG%2FrxlI75S3rLeKeKE3nl&X-Amz-Signature=8d94b314d0a520d75215ed8a9d19d64d026321d880401b8e566e6459a11e788a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDX3A7YA%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T004142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQC4FoFLm70kZB4IrF%2FUPlzQ9iFVf%2FUkughf8cYJmTC%2B4AIhAM3zkT8AzwrhkH5uNHoqBtd8liKEDx%2B48V3Qt6EStq9DKv8DCDkQABoMNjM3NDIzMTgzODA1IgwEhS1%2BWZCqAWUVNvwq3APh%2B9uR8%2FGY%2F5UHe5NL%2FND%2B2SxUfmuhz2vstsY18CkYE6oorfuVNwiVRSWCXwaZAv%2FA%2F50nZhx1utkwpryQi1E1Xco5UUYYdt3NYv6uBTyC%2BN%2ByfjSkPXR7%2Bt38HQeW6bbniNuNCzaLe36jqmLrHg6V1NZWQF8cNbLyQHcOVVQEFwAW2g4158ZZOTjSawtRJO3KEWIbQllbac6Q6q7%2Fagx4BQvskd2vk5s254V7a99c7OtvpvOcD5BNyhOMP1fySsm6bkbOLpvGikwBdJc99gsjQt%2FyATN%2FwfTJM1VhDgF3KF91XmcYtBN77eTzAxXMszKfkSGZZyyaWzrFAEmpButLBx7WvMkDr9c3kasYrvs8ok4or%2FkR4Xmbr%2Ffu%2Bgx2vf10feMDkKqnwGNxbKF2k94V0rgcPMAm7vPY9zMsISN%2BoqdRP611Og1uRGCaKOuz4UGAv2%2BBhUHqrlUyplKWBw%2F1ifSfQsmdbs9Xc7HTZXX10SY2XSurjCV8oV5viau8tGCHcqhP6nWaBney6y9vrzMnYLbnPhOwaFc0UUDNkW8rrgvRCXBSuauqY7zX9ownT1e9yzUBf8kp%2Ba0wlN%2BzRNsTuNdWtT3L%2FX3bzVof5fYrilwZ5GpsZSdruliuADC7ocPJBjqkAfr9xy2aAwAOZraSuRs%2B3QhoB7rOZtZIQ60reSVkN6u3MZddMocx5hm%2FmEKQ94Qfd4dQ6WvN98ydm7mB%2BjGymCKKgeA6DmdHsj%2FOpR2ADS%2B43GjvSp4drXnFNb%2BGypW8rXlLWIdeNYZ2ZtZigSPaPlf%2F90m%2FRrxYy3mugb2GVSYL2gEL3Kgc89OgUF7BcSgUT8W0eDIgG%2FrxlI75S3rLeKeKE3nl&X-Amz-Signature=8d94b314d0a520d75215ed8a9d19d64d026321d880401b8e566e6459a11e788a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QG3E7UDD%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T004142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDa7FrymSW3A7o9cKbXD38KuQLBApNUDBlxB6Uxo6kb0AIgU3heSio8JIuqGbv2buPivXXqsPmMBs4L2rXFWhx%2FF9Aq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDNciYdWU5MN4gOdFfSrcA84RfVbZXmvL7iLBHq7P%2FA6DSVWCkVFKOIWfh5WVFBIsRQMkTVuLN5tcBbpPS7tA3ruaW4z6Rz0IF%2F0x9T%2BZp0qRJOxxZfqGkLLunz3VSbHV7l5iXRDnguLtqIbNtCsp3mC8oJzyAiNuyj%2BdNzP956%2FPaRFoibB4bTLJJy0p%2FjoSukYTHSC1zfHwXP8D9%2FpwHY1oQPXs%2FqwC%2FGdhQSaQvZq98FvqfbprkOUHHwUx%2F9ZdrTXCdCAmVe8GVSQmw%2BDQlXn1CQsb29U2HduDeIfNhj%2BdSkCxLXy58B7ADYPb%2FJMlyj3u7qhWpywNbYVRPdccriRI2TBu6TWr1W0wIJmwf%2BpmO7pvAOrMPSRpyWOddLylwFsUQCk%2BlxLB8X1CVbl7u2UjEokqbyWaYVSHKLMBClgf4JFQnhysBmncXmZzsVdjPkC5IQxfxzcZy6BjS7roq28qwqCZoAwGdbDu%2BEVv%2FmR6h4W%2BwnGvJh%2FJLWixFKonqtNeK0HrXNC1VMUda5zZ5n9xO76gv5PVrNjqzmv09UR2EM5335F1KumAkEpJarU%2FSK4evJtVXeFwELRZF2LlcV9UExpXmxK6bwyslKiPLyeXFGJ1cGmvqeo6oQFaLTbBj3JqqgMcOCUGVW9VMOuhw8kGOqUBi3uOpDzHAdg6%2FVEKmNzLOII%2BrZpvhZNNyZUtjjJ1UQBR%2BXFLkaM6MplcdfsQrr%2FAGBuxEZQ0jCA8f6uASDGc%2Bm47zA4wFIWOcAVYZgIZ%2FZyyFiMEWaH77ToBv8T1mdYth7i2Qci9NbAnIFsOheI3IyTQdZhInUhaQ0T7IZ6%2Fry%2F3fgUQ%2B5nE10IgNFC%2FOVcBDK6XbUk1qjF6FiKkDhmQi%2FnLDEG2&X-Amz-Signature=31c441c7ed7fa9866302673778e560a5724f155a0da72131884e4fc608febed0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QG3E7UDD%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T004142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJHMEUCIQDa7FrymSW3A7o9cKbXD38KuQLBApNUDBlxB6Uxo6kb0AIgU3heSio8JIuqGbv2buPivXXqsPmMBs4L2rXFWhx%2FF9Aq%2FwMIORAAGgw2Mzc0MjMxODM4MDUiDNciYdWU5MN4gOdFfSrcA84RfVbZXmvL7iLBHq7P%2FA6DSVWCkVFKOIWfh5WVFBIsRQMkTVuLN5tcBbpPS7tA3ruaW4z6Rz0IF%2F0x9T%2BZp0qRJOxxZfqGkLLunz3VSbHV7l5iXRDnguLtqIbNtCsp3mC8oJzyAiNuyj%2BdNzP956%2FPaRFoibB4bTLJJy0p%2FjoSukYTHSC1zfHwXP8D9%2FpwHY1oQPXs%2FqwC%2FGdhQSaQvZq98FvqfbprkOUHHwUx%2F9ZdrTXCdCAmVe8GVSQmw%2BDQlXn1CQsb29U2HduDeIfNhj%2BdSkCxLXy58B7ADYPb%2FJMlyj3u7qhWpywNbYVRPdccriRI2TBu6TWr1W0wIJmwf%2BpmO7pvAOrMPSRpyWOddLylwFsUQCk%2BlxLB8X1CVbl7u2UjEokqbyWaYVSHKLMBClgf4JFQnhysBmncXmZzsVdjPkC5IQxfxzcZy6BjS7roq28qwqCZoAwGdbDu%2BEVv%2FmR6h4W%2BwnGvJh%2FJLWixFKonqtNeK0HrXNC1VMUda5zZ5n9xO76gv5PVrNjqzmv09UR2EM5335F1KumAkEpJarU%2FSK4evJtVXeFwELRZF2LlcV9UExpXmxK6bwyslKiPLyeXFGJ1cGmvqeo6oQFaLTbBj3JqqgMcOCUGVW9VMOuhw8kGOqUBi3uOpDzHAdg6%2FVEKmNzLOII%2BrZpvhZNNyZUtjjJ1UQBR%2BXFLkaM6MplcdfsQrr%2FAGBuxEZQ0jCA8f6uASDGc%2Bm47zA4wFIWOcAVYZgIZ%2FZyyFiMEWaH77ToBv8T1mdYth7i2Qci9NbAnIFsOheI3IyTQdZhInUhaQ0T7IZ6%2Fry%2F3fgUQ%2B5nE10IgNFC%2FOVcBDK6XbUk1qjF6FiKkDhmQi%2FnLDEG2&X-Amz-Signature=31c441c7ed7fa9866302673778e560a5724f155a0da72131884e4fc608febed0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHXR2AU7%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T004142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJGMEQCH0KCI44fHOKVXA3Ez6U1f8Fm3A76eFrj9FK%2B0eOyU3UCIQCz01d7AWdraP8Epcwr0N8jC4ydNVqbZoM4vImIk%2Fn2nSr%2FAwg5EAAaDDYzNzQyMzE4MzgwNSIM0xHBHMMcteEmDP2kKtwDoRF3kTjTAMV5DZNyaS4Tl6SXjh5uCsK1lop8XP6LUl5Zns46o92F9jj1Mj0r31APC1m7T2t%2B5aMFHf7qc46oeAxjH0TbreCgNi%2FzQ8SppqNHkHNjhui4siZlKGZFYQCdxwgSD1TARLTgNjRKmB89Fka0MWwxBdJlU%2Ff0n6ZuszUIVnwjvHvKDseoav6PEkCcJIBuu8WXTsQE14fNOEvfCuu1AFmWwnBGtUP1UVROaBsPk6X4LhUTu5AQwFpER%2FQeEKlFA6qDL70j6XuFnKD%2FNDl7qdW%2BaWAP87Mtc3Tr%2Bmqqczvt8tUFo4riYn4tp6tMOqyPoZNJK%2F%2BSnrLhDlUFPv1dlGvZPymgmtMzqEgaEPv3Hx7jqbS4qXSWBo5TbIv47iviYbTY%2BwuBPDg12xTlA8gjMd%2BjBjM6%2F0kvs35rAzq2tGszexdyJNebLtAfJLsMJA8cyPrlPHR1mCuhNwOigGMaxVCOEedsnq3iwoHEuBoPH2lZQgtDOQXKvJk%2BYaOOTV8Nl9eMhe9Iz7yC434AZ28rn60XxxrtOFE22CF%2BMBz%2FXyU8lJNG6nP49c4jQqNLPYHOPfQvK67AsCKf2dULWz3ESNVpbd4HWNUnm%2Fb2QhGdhQbAXmI0UYyq6lUwyaHDyQY6pgErapQ7hHcO4hrevsdjLvuj2eJOhtLdp8LQpxSWLeApuOZjw%2FGGRPkhES1i61NqHytXIPbyKRsvZeg17xBBJcIWDEn8CjcvS8vSja%2BjHQlsIClbyd2r5ZOqVJktXzEw%2FNuO4PF1XOnvpc5NS%2FFnBsPBmbbImiC7ncExvnzJbQq62MvPfU6uEVGqDcGxb7sajgYENCYCAQYJIYLODKSxa48c23RX43Cn&X-Amz-Signature=2253670504c02dc2744712eb78bb376dcd1ee1e37c27a0f761ceb0bd04ba6bd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOISDMKN%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T004145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQDWSb65Kh32GE6tvtarDJfzcSuzpvUsy13ENvZpitUFygIhAKrVdjg4dIH5iXUZSK4WZ551SyY2pjDWC2xspz%2BYBWXTKv8DCDkQABoMNjM3NDIzMTgzODA1Igzy1zJKy1pyRd4eoFMq3ANCYoMPnEMYMIlBhei2WBmno1INqUvI2W2XyKLoX9j1EavNChX5osXhICrN%2F5itzCvvE1ZMb%2BvPDiCl5TULzSkdbw4h%2Bi%2BkJfDFCElwSlLso9Zu06RUfQM4q7v9vwo1PmaCU6trsIqgL4h0%2FVW2v3ZIyG0eq5AMygPcSrgdndg7fpnXv1ViXrvBrmdShPB6D9j%2FEJXYZL84gQjK65Nh2j3lbO5AlJv4BkfUR3IEXauOshwB9q7hOFlBJCv4Fab1ve%2FslL81nYblfpxnBmnOv%2B%2FeM0VvXh0t2y9T0ksS7WrO59%2B8%2BUxSiSw2sF5%2FYeucT80pTD%2BibXZAuxhQF8LTbltKtscFagictYqcgmKsmH4eRweJPCaxoeH4iucUCUjwCl0MFw%2FxPNKl9DQm6TeFVrVJbLzXP0ZGXUYj6dW8WRKbwryPc2fTt%2BuvzwLNCo8nqANPXxfwMR0nLLm1AzMWV%2FLdbWKVxglJpkAojz3%2F6pEKb%2B3at3K0ygjw4lvHtr9h1dkqTWSBA0yMspZFELFIZUMTN51w4hRrGVu6%2FAHbwhapY8hW3Q46fdPw08xCsDI2IbgODY%2BuwtTbTB%2FWG%2FRLYBZQGgWV5fVWlpDwiWmqa312Xcah9q%2BNSqxPyO2gTTD0oMPJBjqkAUEYa6IdHqqrxbjN8H3CSSFBbrkHB9JGP76JqYvZfPiTNxTVwYZUo5O3cdF4eJDp5Lh4imO2Baf7%2FyDbg1NopceGEEhTsHBz4%2FMVZLAx4m3oBBWkDQ1evB7E%2BlrAIOh9mIV959VXccpGutrxJoFMFhkCRywlDoL6zpRZ8vzMsRoO%2FDhUW9ZeTaprh9lWBogLXM2tsH5te4aTpiggLiBJh0UKUWx%2B&X-Amz-Signature=6bef72dbcbd5586f3ef43da4f9fc7fe45e7e9c8cd32ed439b2edebf861a02f45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOISDMKN%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T004145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHAaCXVzLXdlc3QtMiJIMEYCIQDWSb65Kh32GE6tvtarDJfzcSuzpvUsy13ENvZpitUFygIhAKrVdjg4dIH5iXUZSK4WZ551SyY2pjDWC2xspz%2BYBWXTKv8DCDkQABoMNjM3NDIzMTgzODA1Igzy1zJKy1pyRd4eoFMq3ANCYoMPnEMYMIlBhei2WBmno1INqUvI2W2XyKLoX9j1EavNChX5osXhICrN%2F5itzCvvE1ZMb%2BvPDiCl5TULzSkdbw4h%2Bi%2BkJfDFCElwSlLso9Zu06RUfQM4q7v9vwo1PmaCU6trsIqgL4h0%2FVW2v3ZIyG0eq5AMygPcSrgdndg7fpnXv1ViXrvBrmdShPB6D9j%2FEJXYZL84gQjK65Nh2j3lbO5AlJv4BkfUR3IEXauOshwB9q7hOFlBJCv4Fab1ve%2FslL81nYblfpxnBmnOv%2B%2FeM0VvXh0t2y9T0ksS7WrO59%2B8%2BUxSiSw2sF5%2FYeucT80pTD%2BibXZAuxhQF8LTbltKtscFagictYqcgmKsmH4eRweJPCaxoeH4iucUCUjwCl0MFw%2FxPNKl9DQm6TeFVrVJbLzXP0ZGXUYj6dW8WRKbwryPc2fTt%2BuvzwLNCo8nqANPXxfwMR0nLLm1AzMWV%2FLdbWKVxglJpkAojz3%2F6pEKb%2B3at3K0ygjw4lvHtr9h1dkqTWSBA0yMspZFELFIZUMTN51w4hRrGVu6%2FAHbwhapY8hW3Q46fdPw08xCsDI2IbgODY%2BuwtTbTB%2FWG%2FRLYBZQGgWV5fVWlpDwiWmqa312Xcah9q%2BNSqxPyO2gTTD0oMPJBjqkAUEYa6IdHqqrxbjN8H3CSSFBbrkHB9JGP76JqYvZfPiTNxTVwYZUo5O3cdF4eJDp5Lh4imO2Baf7%2FyDbg1NopceGEEhTsHBz4%2FMVZLAx4m3oBBWkDQ1evB7E%2BlrAIOh9mIV959VXccpGutrxJoFMFhkCRywlDoL6zpRZ8vzMsRoO%2FDhUW9ZeTaprh9lWBogLXM2tsH5te4aTpiggLiBJh0UKUWx%2B&X-Amz-Signature=6bef72dbcbd5586f3ef43da4f9fc7fe45e7e9c8cd32ed439b2edebf861a02f45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

